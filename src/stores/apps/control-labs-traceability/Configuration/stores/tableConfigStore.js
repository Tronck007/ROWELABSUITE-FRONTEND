
import { defineStore } from "pinia";

export const useTableConfigStore = defineStore("tableConfig", {
  state: () => ({
    headers: {
      main: [
        { title: "# PROCESO", key: "process_code" },
        { title: "PQ", key: "quality_order_number" },
        { title: "T.MUESTRAS", key: "quality_test_group_id" },
        { title: "FECHA", key: "createdAt" },
        { title: "ESTADO", key: "state" },
        { title: "ACCIONES", key: "actions" },
      ],
      sub: [
        { title: "MUESTRAS", key: "sampling_id" },
        { title: "ARTICULOS", key: "item_id" },
        { title: "LOTES", key: "item_batch_id" },
        { title: "ACCIONES", key: "actions" },
        { title: "ESTADO", key: "is_active" },
      ],
      reservation: [
        { title: "EQUIPO", key: "object_name" },
        { title: "DESCRIPCIÓN", key: "object_name" },
        { title: "INICIO", key: "program_start_equipment_process" },
        { title: "FINAL", key: "program_end_equipment_process" },
        { title: "T.RESTANTE", key: "quality_test_group_id" },
        { title: "ESTADO", key: "entity_lifecycle_id" },
        { title: "ACCIONES", key: "actions" },
      ],
      testAndEquipment: [
        { title: "OBJETO", key: "equipment_name" },
        { title: "DESCRIPCIÓN", key: "equipment_desc" },
        { title: "# PROCESO", key: "process_code" },
        { title: "PQ", key: "quality_order_number" },
        { title: "METODO", key: "quality_test_group_id" },
        { title: "ESTADO", key: "state" },
        { title: "ACCIONES", key: "actions" },
      ],
      subTestAndEquipment: [
        { title: "PRUEBAS", key: "quality_test_id" },
        { title: "DESCRIPCIÓN", key: "quality_test_desc" },
        { title: "INICIO", key: "program_start_equipment_process" },
        { title: "FINAL", key: "program_end_equipment_process" },
        { title: "T.RESTANTE", key: "remaining_time" },
        { title: "ESTADO", key: "status" },
        { title: "ACCIONES", key: "actions" },
      ],
    },
    tableButtons: {
      main: {
        showFinishButton: true,
        showEdit: true,
        showDelete: true,
        showCheck: false,
        showGoto: true,
      },
      sub: {
        showEdit: false,
        showDelete: true,
        showCheck: false,
        showGoto: false,
      },
    },
  }),
  getters: {
    getHeaders: (state) => (type) => {
      return state.headers[type] || [];
    },
    getTableButtons: (state) => (type) => {
      return state.tableButtons[type] || {};
    },
  },
});
