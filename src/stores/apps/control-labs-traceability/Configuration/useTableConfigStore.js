import { defineStore } from "pinia";
import { computed } from "vue";

export const useTableConfigStore = defineStore("tableConfig", {
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
    isLoading: false,
  }),
  getters: {
    tableConfigProcess: (state) => ({
      headers: {
        main: computed(() => state.headers),
        sub: computed(() => state.subHeaders),
      },
      filterSubtables: "tests_in_process",
      expandedRows: false,
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
      goToPage: "test-in-proncess",
      isLoading: computed(() => state.isLoading),
      data: [], // data will be set dynamically
    }),
    tableConfigEndProcess: (state) => ({
      headers: {
        main: computed(() => state.headersEnd),
        sub: computed(() => state.subHeadersEnd),
      },
      filterSubtables: "tests_in_process",
      filterCards: {
        searchInput: true,
        filterStatus: false,
      },
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
      isLoading: computed(() => state.isLoading),
      data: [], // data will be set dynamically
    }),
    tableConfigReservation: (state) => ({
      headers: {
        main: computed(() => state.headersEnd),
        sub: computed(() => state.subHeadersEnd),
      },
      filterSubtables: "tests_in_process",
      filterCards: {
        searchInput: true,
        filterStatus: false,
      },
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
      isLoading: computed(() => state.isLoading),
      data: [], // data will be set dynamically
    }),
  },
});
