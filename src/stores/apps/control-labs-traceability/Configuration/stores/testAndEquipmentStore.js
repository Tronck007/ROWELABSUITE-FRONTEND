/* eslint-disable semi */
/* eslint-disable arrow-parens */
/* eslint-disable camelcase */
import { equipmentService } from "@/services/apps/control-labs-traceability/EquipmentService";
import { getDominicanRepublicDateTime } from "@/utils/actualDate";
import { defineStore } from "pinia";
import { useProcessStore } from "./";
import { computed } from "vue";

const userData = useCookie("userData").value;
const processStore = useProcessStore();

function convertDateTime(inputString) {
  const date = new Date(inputString);
  return date.toISOString();
}

function formatIsoDateTimeToReadable(dateTimeString) {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return new Date(dateTimeString).toLocaleString("es-ES", options);
}

const calculateRemainingTime = (endTime) => {
  const endDate = new Date(endTime);
  const now = getDominicanRepublicDateTime(); // Asegúrate de obtener la fecha actual en cada llamada
  const difference = endDate.getTime() - now.getTime();
  return Math.max(Math.floor(difference / 60000), 0); // Convertir a minutos y evitar valores negativos
};

const user_code = userData.user_id; // Usamos el user_id del usuario

export const useTestAndEquipment = defineStore("testAndEquipment", {
  state: () => ({
    headersEnd: [
      { title: "OBJETO", key: "equipment_name" },
      { title: "DESCRIPCIÓN", key: "equipment_desc" },
      { title: "# PROCESO", key: "process_code" },
      { title: "PQ", key: "quality_order_number" },
      { title: "METODO", key: "quality_test_group_id" },
      { title: "ESTADO", key: "state" },
    ],
    subHeadersEnd: [
      { title: "PRUEBAS", key: "quality_test_id" },
      { title: "DESCRIPCIÓN", key: "quality_test_desc" },
      { title: "INICIO", key: "program_start_equipment_process" },
      { title: "FINAL", key: "program_end_equipment_process" },
      { title: "REAL", key: "real_end_equipment_process" },
    ],

    headers: [
      { title: "OBJETO", key: "equipment_name" },
      { title: "DESCRIPCIÓN", key: "equipment_desc" },
      { title: "# PROCESO", key: "process_code" },
      { title: "PQ", key: "quality_order_number" },
      { title: "METODO", key: "quality_test_group_id" },
      { title: "ESTADO", key: "state" },
      { title: "ACCIONES", key: "actions" },
    ],
    subHeaders: [
      { title: "PRUEBAS", key: "quality_test_id" },
      { title: "DESCRIPCIÓN", key: "quality_test_desc" },
      { title: "INICIO", key: "program_start_equipment_process" },
      { title: "FINAL", key: "program_end_equipment_process" },
      { title: "T.RESTANTE", key: "remaining_time" },
      { title: "ESTADO", key: "status" },
      { title: "ACCIONES", key: "actions" },
    ],
    ExpandedRowFields: "process_generated_id",
    process_test: [],
    currentProcess: [],
    originalData: {},
    dataTransformed: {},
    isLoading: false,
  }),
  getters: {
    headers: (state) => state.headers,
    subHeaders: (state) => state.subHeaders,
    headersEnd: (state) => state.headersEnd,
    subHeadersEnd: (state) => state.subHeadersEnd,
    transformedDataActive: (state) => {
      return state.processTransformation(state.originalData);
    },
    transformedDataInactive: (state) => {
      return state.processInactiveEquipmentTransformation(state.originalData);
    },
    transformedDataReservation: (state) => {
      return state
        .processTransformation(state.originalData)
        .filter((process) => process.state === "reserved");
    },
    processTransformation: (state) => (processEquipment) => {
      const equipmentDateIds = {};
      let idCounter = 0; // Contador global para asignar IDs únicos
      if (!processEquipment || !Array.isArray(processEquipment.samples)) {
        return [];
      }

      const transformed = processEquipment.samples.reduce((acc, sample) => {
        sample.equipments.forEach((equipmentRef) => {
          const equipment = equipmentRef.equipment; // Acceder al equipo poblado

          if (equipmentRef.equipment_process.status !== "in_process") {
            return; // Omitimos los equipos que no están en proceso
          }

          if (!equipment) {
            console.error("Equipment is null or undefined", equipmentRef);
            return;
          }

          const dateKey = `${equipment.equipment_name}-${new Date(equipmentRef.equipment_process.expected_start_time).toISOString().slice(0, 10)}`;
          if (!equipmentDateIds.hasOwnProperty(dateKey)) {
            equipmentDateIds[dateKey] = ++idCounter; // Asignamos un ID incremental único si es la primera vez que vemos esta combinación de equipo y fecha
          }

          equipmentRef.tests.forEach((test) => {
            const key = `${equipment.equipment_name}-${dateKey}`; // Usamos el ID del equipo como clave para agrupar los tests
            if (!acc[key]) {
              acc[key] = {
                id: equipmentDateIds[dateKey], // Usamos el ID generado para esta combinación de equipo y fecha
                _id: equipment._id,
                equipment_name: equipment.equipment_name,
                equipment_desc: equipment.equipment_desc,
                process_code: processEquipment.process_code,
                quality_order_number: processEquipment.quality_order_number,
                quality_test_group_id: processEquipment.quality_test_group_id,
                state: equipmentRef.equipment_process.status,
                program_start_equipment_process: formatIsoDateTimeToReadable(
                  equipmentRef.equipment_process.expected_start_time,
                ),
                program_end_equipment_process: formatIsoDateTimeToReadable(
                  equipmentRef.equipment_process.expected_end_time,
                ),
                tests_in_process: [], // Iniciamos la lista de tests para este equipo
              };
            }

            const existingTest = acc[key].tests_in_process.find(
              (t) => t.quality_test_id === test.quality_test_id,
            );

            if (!existingTest) {
              acc[key].tests_in_process.push({
                quality_test_id: test.quality_test_id,
                quality_test_desc: test.quality_test_desc,
                program_start_equipment_process: formatIsoDateTimeToReadable(
                  equipmentRef.equipment_process.expected_start_time,
                ),
                program_end_equipment_process: formatIsoDateTimeToReadable(
                  equipmentRef.equipment_process.expected_end_time,
                ),
                remaining_time:
                  calculateRemainingTime(
                    equipmentRef.equipment_process.expected_end_time,
                  ) + " minutos",
                status: test.is_active ? "active" : "inactive", // Aquí podemos agregar más información de cada test si es necesario
              });
            }
          });
        });

        return acc;
      }, {});

      return Object.values(transformed);
    },

    processInactiveEquipmentTransformation: (state) => {
      const equipmentDateIds = {}; // Diccionario para llevar el seguimiento de los IDs por equipo y fecha
      let idCounter = 0; // Contador global para asignar IDs únicos

      return (processEquipment) => {
        if (!processEquipment || !Array.isArray(processEquipment.samples)) {
          return [];
        }

        const transformed = processEquipment.samples.reduce((acc, sample) => {
          sample.equipments.forEach((equipmentRef) => {
            const equipment = equipmentRef.equipment; // Acceder al equipo poblado

            if (equipmentRef.equipment_process.status !== "completed") {
              return; // Omitimos equipos que no están completados para este getter
            }

            if (!equipment) {
              console.error("Equipment is null or undefined", equipmentRef);
              return;
            }

            const dateKey = `${equipment.equipment_name}-${new Date(equipmentRef.equipment_process.expected_start_time).toISOString().slice(0, 10)}`;
            if (!equipmentDateIds.hasOwnProperty(dateKey)) {
              equipmentDateIds[dateKey] = ++idCounter; // Asignamos un ID incremental único si es la primera vez que vemos esta combinación de equipo y fecha
            }

            equipmentRef.tests.forEach((test) => {
              const key = `${equipment.equipment_name}-${dateKey}`;

              if (!acc[key]) {
                acc[key] = {
                  id: equipmentDateIds[dateKey], // Usamos el ID generado para esta combinación de equipo y fecha
                  process_code: processEquipment.process_code,
                  quality_order_number: processEquipment.quality_order_number,
                  quality_test_group_id: processEquipment.quality_test_group_id,
                  equipment_name: equipment.equipment_name,
                  equipment_desc: equipment.equipment_desc,
                  status: equipmentRef.equipment_process.status,
                  tests_in_process: [],
                };
              }

              const existingTest = acc[key].tests_in_process.find(
                (t) => t.quality_test_id === test.quality_test_id,
              );

              if (!existingTest) {
                acc[key].tests_in_process.push({
                  quality_test_id: test.quality_test_id,
                  quality_test_desc: test.quality_test_desc,
                  program_start_equipment_process: formatIsoDateTimeToReadable(
                    equipmentRef.equipment_process.expected_start_time,
                  ),
                  program_end_equipment_process: formatIsoDateTimeToReadable(
                    equipmentRef.equipment_process.expected_end_time,
                  ),
                  real_end_equipment_process: formatIsoDateTimeToReadable(
                    equipmentRef.equipment_process.actual_end_time,
                  ),
                  status: test.is_active ? "active" : "inactive",
                });
              }
            });
          });

          return acc;
        }, {});

        return Object.values(transformed);
      };
    },
  },
  actions: {
    async createTestProcess(processId, equipmentInfo) {
      const userData = useCookie("userData").value; // Asegúrate de obtener el valor actual del cookie aquí
      const { test, hora, minutos, equipment, samples } = equipmentInfo;

      const totalMinutos = hora * 60 + minutos;
      const start = getDominicanRepublicDateTime(); // Usamos la fecha obtenida de getDominicanRepublicDateTime
      const end = new Date(start.getTime() + totalMinutos * 60000);

      // Crear el objeto transformado
      const transformedData = {
        processCode: processId,
        samples: samples.map((sample) => ({
          samplingId: sample.sampling_id,
          equipmentData: {
            equipment_id: equipment._id,
            auto_finish: true,
            equipment_process: {
              status: "in_process",
              process_details: "In process",
              expected_start_time: convertDateTime(start),
              expected_end_time: convertDateTime(end),
            },
            tests: test.map((t) => ({
              quality_test_id: t.quality_test_id,
              quality_test_desc: t.test_desc,
            })),
            createdBy: {
              userId: userData.user_id,
              userCode: userData.user_code,
              email: userData.email,
              timestamp: convertDateTime(start),
            },
            updatedBy: {
              userId: userData.user_id,
              userCode: userData.user_code,
              email: userData.email,
              timestamp: convertDateTime(start),
            },
          },
        })),
        userId: userData.user_id,
        userCode: userData.user_code,
        email: userData.email,
      };

      console.log("Transformed data:", transformedData);

      try {
        const { body } = await equipmentService.createEquipmentProcess({
          ...transformedData,
        });

        const { meta } = body;

        if (meta.status === 201) {
          notify("creation", "ok");
        } else {
          notify("creation", "fail");
        }
      } catch (error) {
        console.error("Error creating new process:", error);
      } finally {
        this.isLoading = false;
      }
    },

    async getTestProcessById(id) {
      this.isLoading = true;

      const process = await processStore.fetchProcessById(id);

      this.originalData = process;
      this.isLoading = false;

      return process;
    },

    async endProcess(id) {
      try {
        const updatedData = {
          status: "completed",
          details: "Completed by user", // Updated field name to 'details'
          userId: userData.user_id,
          userCode: userData.user_code,
          email: userData.email,
        };

        const response = await equipmentService.endEquipment(id, updatedData);
        const { body } = response;
        const { meta } = body;

        if (meta.status === 200) {
          notify("completion", "ok");
          await this.getTestProcessById(id);
        } else {
          notify("completion", "fail");
        }
      } catch (error) {
        console.error("Error ending process:", error);
      }
    },

    async deleteProcess(item) {
      try {
        const updatedData = {
          status: "inactive",
          details: "Inactive by user", // Updated field name to 'details'
          userId: userData.user_id,
          userCode: userData.user_code,
          email: userData.email,
        };

        const response = await equipmentService.endEquipment(
          item.process_code,
          updatedData,
        );
        const { body } = response;
        const { meta } = body;

        if (meta.status === 200) {
          notify("completion", "ok");
          await this.getTestProcessById(item.process_code);
        } else {
          notify("completion", "fail");
        }
      } catch (error) {
        console.error("Error ending process:", error);
      }
    },

    updateRemainingTimes() {
      const dataActive = this.transformedDataActive;

      dataActive.forEach((process) => {
        process.tests_in_process.forEach((test) => {
          test.remaining_time =
            calculateRemainingTime(
              new Date(test.program_end_equipment_process),
            ) + " minutos";
        });
      });
    },

    async fetchData(id) {
      this.isLoading = true;
      try {
        await this.getTestProcessById(id);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        this.isLoading = false;
      }
    },

    openDialog(mode, item = null) {
      if (mode === "edit" && item) {
        this.currentProcess = item;
      }
    },
  },
});
