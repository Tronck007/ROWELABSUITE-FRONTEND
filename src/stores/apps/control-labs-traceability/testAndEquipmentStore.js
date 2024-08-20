/* eslint-disable */
import { equipmentService } from "@/services/apps/control-labs-traceability/EquipmentService";
import { getDominicanRepublicDateTime } from "@/utils/actualDate";
import { defineStore } from "pinia";
import { useProcessStore } from "./";

// Obtener los datos de usuario desde la cookie
const userData = useCookie("userData").value;
const processStore = useProcessStore();

// Función para convertir una cadena de fecha y hora a formato ISO
function convertDateTime(inputString) {
  const date = new Date(inputString);
  return date.toISOString();
}

// Función para formatear una cadena ISO a un formato legible
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

// Función para calcular el tiempo restante en minutos
const calculateRemainingTime = (endTime) => {
  const endDate = new Date(endTime);
  const now = getDominicanRepublicDateTime();
  const difference = endDate.getTime() - now.getTime();
  return Math.max(Math.floor(difference / 60000), 0);
};

// Definición de la tienda Pinia para manejar procesos y equipos
export const useTestAndEquipment = defineStore("testAndEquipment", {
  state: () => ({
    // Configuración de headers para diferentes vistas de la tabla
    headersEnd: [
      { title: "EQUIPO", key: "equipment_name" },
      { title: "DESCRIPCIÓN", key: "equipment_desc" },
      { title: "# PROCESO", key: "process_code" },
      { title: "PQ", key: "quality_order_number" },
      { title: "MÉTODO", key: "quality_test_group_id" },
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
      { title: "EQUIPO", key: "equipment_name" },
      { title: "DESCRIPCIÓN", key: "equipment_desc" },
      { title: "# PROCESO", key: "process_code" },
      { title: "PQ", key: "quality_order_number" },
      { title: "MÉTODO", key: "quality_test_group_id" },
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
    ReservationHeaders: [
      { title: "EQUIPO", key: "equipment_name" },
      { title: "DESCRIPCIÓN", key: "equipment_desc" },
      { title: "MÉTODO", key: "quality_test_group_id" },
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
  }),
  actions: {
    // Acción para crear un nuevo proceso de prueba
    async createTestProcess(processId, equipmentInfo) {
      const userData = useCookie("userData").value;

      const { test, hora, minutos, equipment, samples, comment } =
        equipmentInfo;

      const totalMinutos = hora * 60 + minutos;
      const start = getDominicanRepublicDateTime();
      const end = new Date(start.getTime() + totalMinutos * 60000);

      // Crear el objeto transformado para el proceso de prueba
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
              comment,
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

    // Acción para obtener un proceso de prueba por su ID
    async getTestProcessById(id) {
      this.isLoading = true;

      try {
        const process = await processStore.fetchProcessById(id);
        this.originalData = process;
      } catch (error) {
        console.error("Error fetching process by ID:", error);
      } finally {
        this.isLoading = false;
      }

      return this.originalData;
    },

    // Acción para finalizar un proceso
    async endProcess(item) {
      const processCode = item.process_code;

      try {
        const updatedData = {
          equipmentId: item.id_equipment,
          status: "completed",
          details: "Completed by user",
          userId: userData.user_id,
          userCode: userData.user_code,
          email: userData.email,
        };

        const response = await equipmentService.endEquipment(
          processCode,
          updatedData,
        );

        const { body } = response;
        const { meta } = body;

        if (meta.status === 200) {
          notify("update", "ok");
          await this.getTestProcessById(processCode);
        } else {
          notify("completion", "fail");
        }
      } catch (error) {
        console.error("Error ending process:", error);
      }
    },

    // Acción para eliminar un proceso
    async deleteProcess(item) {
      const processCode = item.process_code;

      try {
        const updatedData = {
          equipmentId: item.id_equipment,
          status: "inactive",
          details: "Inactive by user",
          userId: userData.user_id,
          userCode: userData.user_code,
          email: userData.email,
        };

        const response = await equipmentService.endEquipment(
          processCode,
          updatedData,
        );

        const { body } = response;
        const { meta } = body;

        if (meta.status === 200) {
          notify("deletion", "ok");
          await this.getTestProcessById(processCode);
        } else {
          notify("deletion", "fail");
        }
      } catch (error) {
        console.error("Error deleting process:", error);
      }
    },

    // Actualiza el tiempo restante en los procesos activos
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
  },

  getters: {
    // Transforma los datos del equipo en un formato adecuado para la vista de procesos activos
    processTransformation: (state) => (processEquipment) => {
      const equipmentDateIds = {};
      let idCounter = 0;

      if (!processEquipment || !Array.isArray(processEquipment.samples)) {
        return [];
      }

      const transformed = processEquipment.samples.reduce((acc, sample) => {
        sample.equipments.forEach((equipmentRef) => {
          const equipment = equipmentRef.equipment;

          if (equipmentRef.equipment_process.status !== "in_process") {
            return;
          }

          if (!equipment) {
            console.error("Equipment is null or undefined", equipmentRef);
            return;
          }

          const dateKey = `${equipment.equipment_name}-${new Date(equipmentRef.equipment_process.expected_start_time).toISOString().slice(0, 10)}`;
          if (!equipmentDateIds.hasOwnProperty(dateKey)) {
            equipmentDateIds[dateKey] = ++idCounter;
          }

          const key = `${equipment.equipment_name}-${dateKey}`;
          if (!acc[key]) {
            acc[key] = {
              id: equipmentDateIds[dateKey],
              id_equipment: equipmentRef.equipment_process.id_equipment,
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
              tests_in_process: [],
            };
          }

          equipmentRef.tests.forEach((test) => {
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
                status: test.is_active ? "active" : "inactive",
              });
            }
          });
        });

        return acc;
      }, {});

      return Object.values(transformed);
    },

    // Transforma los datos del equipo en un formato adecuado para la vista de procesos completados
    processTransformationCompleted: (state) => (processEquipment) => {
      const equipmentDateIds = {};
      let idCounter = 0;

      if (!processEquipment || !Array.isArray(processEquipment.samples)) {
        return [];
      }

      const transformed = processEquipment.samples.reduce((acc, sample) => {
        sample.equipments.forEach((equipmentRef) => {
          const equipment = equipmentRef.equipment;

          if (equipmentRef.equipment_process.status !== "completed") {
            return;
          }

          if (!equipment) {
            console.error("Equipment is null or undefined", equipmentRef);
            return;
          }

          const dateKey = `${equipment.equipment_name}-${new Date(equipmentRef.equipment_process.expected_start_time).toISOString().slice(0, 10)}`;
          if (!equipmentDateIds.hasOwnProperty(dateKey)) {
            equipmentDateIds[dateKey] = ++idCounter;
          }

          const key = `${equipment.equipment_name}-${dateKey}`;
          if (!acc[key]) {
            acc[key] = {
              id: equipmentDateIds[dateKey],
              id_equipment: equipmentRef.equipment_process.id_equipment,
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
              real_end_equipment_process: formatIsoDateTimeToReadable(
                equipmentRef.equipment_process.actual_end_time,
              ),
              tests_in_process: [],
            };
          }

          equipmentRef.tests.forEach((test) => {
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
    },

    // Transforma los datos del equipo en un formato adecuado para la vista de reservas activas
    processTransformationReservations: (state) => (processEquipment) => {
      const equipmentDateIds = {};
      let idCounter = 0;

      if (!processEquipment || !Array.isArray(processEquipment.reservation)) {
        return [];
      }

      const transformed = processEquipment.reservation.reduce(
        (acc, reservation) => {
          if (reservation.status === "completed") {
            return acc;
          }

          const equipment = reservation.equipment;

          if (!equipment) {
            console.error("Equipment is null or undefined", reservation);
            return acc;
          }

          const dateKey = `${equipment.equipment_name}-${new Date(reservation.expected_start_time).toISOString().slice(0, 10)}`;
          if (!equipmentDateIds.hasOwnProperty(dateKey)) {
            equipmentDateIds[dateKey] = ++idCounter;
          }

          const key = `${equipment.equipment_name}-${dateKey}`;
          if (!acc[key]) {
            acc[key] = {
              id: equipmentDateIds[dateKey],
              equipment_name: equipment.equipment_name,
              equipment_desc: equipment.equipment_desc,
              process_code: processEquipment.process_code,
              quality_test_group_id: processEquipment.quality_test_group_id,
              program_start_equipment_process: formatIsoDateTimeToReadable(
                reservation.expected_start_time,
              ),
              program_end_equipment_process: formatIsoDateTimeToReadable(
                reservation.expected_end_time,
              ),
              remaining_time:
                calculateRemainingTime(reservation.expected_end_time) +
                " minutos",
              status: reservation.status,
            };
          }

          return acc;
        },
        {},
      );

      return Object.values(transformed);
    },

    // Getter para obtener los datos transformados de los procesos activos
    transformedDataActive(state) {
      return this.processTransformation(state.originalData);
    },

    // Getter para obtener los datos transformados de los procesos completados
    transformedDataComplete(state) {
      return this.processTransformationCompleted(state.originalData);
    },

    // Getter para obtener los datos transformados de las reservas activas
    transformedDataReservations(state) {
      return this.processTransformationReservations(state.originalData);
    },

    // Configuración de la tabla para los procesos activos
    tableConfigProcess(state) {
      return {
        headers: {
          main: state.headers,
          sub: state.subHeaders,
        },
        filterSubtables: "tests_in_process",
        filterCards: {
          searchInput: true,
          filterStatus: false,
        },
        expandedRows: false,
        actionClicked: false,
        buttonConfigs: {
          main: {
            showFinishButton: true,
            showEdit: false,
            showDelete: true,
            showCheck: false,
            showGoto: false,
          },
          sub: {
            showEdit: false,
            showDelete: true,
            showCheck: false,
            showGoto: false,
          },
        },
        goToPage: "tests_in_process",
        isLoading: state.isLoading,
        data: state.transformedDataActive,
      };
    },

    // Configuración de la tabla para las reservas activas
    tableConfigReservation(state) {
      return {
        headers: {
          main: state.ReservationHeaders,
        },
        filterSubtables: "",
        filterCards: {
          searchInput: true,
          filterStatus: false,
        },
        actionClicked: true,
        expandedRows: false,
        buttonConfigs: {
          main: {
            showFinishButton: false,
            showEdit: true,
            showDelete: true,
            showCheck: false,
            showGoto: false,
          },
          sub: {
            showEdit: false,
            showDelete: true,
            showCheck: false,
            showGoto: false,
          },
        },
        goToPage: "",
        isLoading: state.isLoading,
        data: state.transformedDataReservations,
      };
    },

    // Configuración de la tabla para los procesos finalizados
    tableConfigEndProcess(state) {
      return {
        headers: {
          main: state.headersEnd,
          sub: state.subHeadersEnd,
        },
        filterSubtables: "tests_in_process",
        filterCards: {
          searchInput: true,
          filterStatus: false,
        },
        actionClicked: false,
        expandedRows: false,
        buttonConfigs: {
          main: {
            showEdit: true,
            showDelete: false,
            showCheck: false,
            showView: false,
            showGoto: false,
          },
          sub: {
            showEdit: false,
            showDelete: false,
            showCheck: false,
            showView: true,
            showGoto: false,
          },
        },
        goToPage: "test-in-proncess",
        isLoading: state.isLoading,
        data: state.transformedDataComplete,
      };
    },
  },
});
