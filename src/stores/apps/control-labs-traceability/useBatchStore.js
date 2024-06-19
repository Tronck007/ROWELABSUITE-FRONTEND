/* eslint-disable camelcase */
/* eslint-disable arrow-parens */
/* eslint-disable semi */
import { defineStore } from "pinia";
import { formatIsoDateTimeToReadable } from "@/utils/dateUtils";
import { catalogService } from "@/services/apps/control-labs-traceability/CatalogService";

const userData = useCookie("userData").value;

export const useBatchStore = defineStore("batch", {
  state: () => ({
    isLoading: false,
    originalData: [],
    currentProcess: null,
    headers: [
      { title: "#LOTES", key: "item_batch_id" },
      { title: "ARTÍCULOS", key: "item_id" },
      { title: "DESCRIPCIÓN", key: "item_desc" },
      { title: "MÉTODO", key: "quality_test_group_id" },
      { title: "ACCIONES", key: "actions" },
    ],
    subHeaders: [
      { title: "EQUIPOS", key: "equipment_name" },
      { title: "DESCRIPCIÓN", key: "equipment_desc" },
      { title: "PRUEBA", key: "test_quality" },
      { title: "INICIO", key: "start_date" },
      { title: "FINAL", key: "end_date" },
      { title: "REAL", key: "real_date" },
      { title: "TÉCNICO", key: "user_code" },
    ],
  }),
  actions: {
    async fetchAllBatchData() {
      this.isLoading = true;
      try {
        const { meta, data } = await catalogService.getAllBatchHistory();

        this.originalData = data.map((item, index) => ({
          ...item,
          id: `${index}`,
        }));

        console.log("Data:", this.originalData);
      } catch (error) {
        console.log("Error fetching processes:", error);
      } finally {
        this.isLoading = false;
      }
    },

    calculateTimeDifference(start, end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const diffTime = Math.abs(endDate - startDate);
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      const diffMinutes = Math.floor((diffTime / (1000 * 60)) % 60);

      return `${diffHours} hora${diffHours !== 1 ? "s" : ""} ${diffMinutes} minutos`;
    },
  },
  getters: {
    batchHistoryformation: (state) => (batchData) => {
      const batchMap = new Map();

      batchData.forEach((data) => {
        if (!batchMap.has(data.item_batch_id)) {
          batchMap.set(data.item_batch_id, {
            id: data.id,
            item_batch_id: data.item_batch_id,
            item_id: data.item_id,
            item_desc: data.item_desc,
            quality_test_group_id: data.quality_test_group_id,
            state: data.state,
            equipments: [],
          });
        }

        const batch = batchMap.get(data.item_batch_id);

        const equipments = (data.equipments || []).map((equipment) => ({
          equipment_name: equipment.equipment_name,
          equipment_desc: equipment.equipment_desc,
          start_date: formatIsoDateTimeToReadable(
            equipment.program_start_equipment_process,
          ),
          end_date: formatIsoDateTimeToReadable(
            equipment.program_end_equipment_process,
          ),
          real_date: formatIsoDateTimeToReadable(
            equipment.real_end_equipment_process,
          ),
          user_code: equipment.createdBy.user_code,
          tests: (equipment.tests || []).map((test) => ({
            test_quality: test.test_quality,
          })),
        }));

        batch.equipments.push(...equipments);
      });

      return Array.from(batchMap.values());
    },

    transformedData(state) {
      return state.batchHistoryformation(state.originalData).map((batch) => {
        const transformedEquipments = [];
        const seenTests = new Set();

        batch.equipments.forEach((equipment) => {
          equipment.tests.forEach((test) => {
            const testKey = `${equipment.equipment_name}-${test.test_quality}`;
            if (!seenTests.has(testKey)) {
              transformedEquipments.push({
                equipment_name: equipment.equipment_name,
                equipment_desc: equipment.equipment_desc,
                test_quality: test.test_quality,
                start_date: equipment.start_date,
                end_date: equipment.end_date,
                real_date: equipment.real_date,
                user_code: equipment.user_code,
              });
              seenTests.add(testKey);
            }
          });
        });

        return {
          ...batch,
          equipments: transformedEquipments,
        };
      });
    },

    lote: (state) => state.jsonData.data[0]?.item_batch_id || "",
    dateNow: () => getDominicanRepublicDateOnly(),
    formattedData: (state) => {
      return state.jsonData.data.flatMap((item) =>
        item.equipments.flatMap((equipment) =>
          equipment.tests.map((test) => ({
            equipo: equipment.equipment_name,
            descripcion: equipment.equipment_desc,
            prueba: `${test.quality_test_id} -> ${test.quality_test_desc}`,
            inicio: formatIsoDateTimeToReadable(
              equipment.program_start_equipment_process,
            ),
            fin: formatIsoDateTimeToReadable(
              equipment.real_end_equipment_process,
            ),
            tiempo: state.calculateTimeDifference(
              equipment.program_start_equipment_process,
              equipment.real_end_equipment_process,
            ),
          })),
        ),
      );
    },
    groupedAndSortedData: (state) => {
      const equipmentMap = new Map();

      // Agrupar las pruebas por equipo y por horario
      for (const row of state.formattedData) {
        let equipment = equipmentMap.get(row.equipo);
        if (!equipment) {
          equipment = {
            equipo: row.equipo,
            descripcion: row.descripcion,
            horarios: [],
            tiempo: row.tiempo,
          };
          equipmentMap.set(row.equipo, equipment);
        }

        // Encuentra un horario existente o crea uno nuevo
        let horario = equipment.horarios.find(
          (h) => h.inicio === row.inicio && h.fin === row.fin,
        );
        if (!horario) {
          horario = {
            inicio: row.inicio,
            fin: row.fin,
            pruebas: new Set(), // Usar un conjunto para evitar duplicados
          };
          equipment.horarios.push(horario);
        }

        // Añadir prueba al conjunto, si no está ya presente
        horario.pruebas.add(row.prueba);
      }

      // Ordenar los horarios dentro de cada equipo
      equipmentMap.forEach((equipment) => {
        equipment.horarios.sort(
          (a, b) => new Date(a.inicio) - new Date(b.inicio),
        );
      });

      // Convertir el Map en un array y ordenar los equipos por la fecha del primer horario
      return Array.from(equipmentMap.values()).sort((a, b) => {
        return new Date(a.horarios[0].inicio) - new Date(b.horarios[0].inicio);
      });
    },
  },
});
