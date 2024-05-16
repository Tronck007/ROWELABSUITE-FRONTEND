<script setup>
import {
  useDialogStore,
  useTestAndEquipment,
} from "@/stores/apps/control-labs-traceability";
import Dialog from "@/views/apps/components/Dialog.vue";
import EquiposView from "@/views/apps/control-labs-traceability/TableViews.vue";
import { useRoute } from "vue-router";

// Inicialización de los stores de procesos y catálogos
const testAndEquipmentStore = useTestAndEquipment()
const dialogStore = useDialogStore()
const isLoadingAnimation = ref(false)

const isDialogVisible = ref(false)

const data = ref([])

const route = useRoute()

// Función para cerrar el diálogo
const closeDialog = () => {
  isDialogVisible.value = false
}

// Función para abrir el diálogo y configurar según la acción seleccionada
const openDialog = () => {
  dialogStore.openDialogWithActionId([1])
  isDialogVisible.value = true
}

// Configuración de headers
const tableConfig = reactive({
  headers: {
    main: computed(() => testAndEquipmentStore.headers),
    sub: computed(() => testAndEquipmentStore.subHeaders),
  },
  filterSubtables: "tests_in_process",
  expandedRows: false,
  buttonConfigs: {
    main: {
      showFinishButton: true,
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
  goToPage: "test-in-proncess",
  isLoading: computed(() => testAndEquipmentStore.isLoading),
  data: [], // Inicialmente vacío
})


// Configuración de headers
const tableConfigReservation = reactive({
  headers: {
    main: computed(() => testAndEquipmentStore.headersEnd),
    sub: computed(() => testAndEquipmentStore.subHeadersEnd),
  },
  filterSubtables: "tests_in_process",
  expandedRows: false,
  buttonConfigs: {
    main: {
      showEdit: true,
      showDelete: false,
      showCheck: false,
      showGoto: false,
     
    },
    sub: {
      showEdit: false,
      showDelete: false,
      showCheck: false,
      showGoto: false,
    },
  },
  goToPage: "test-in-proncess",
  isLoading: computed(() => testAndEquipmentStore.isLoading),
  data: [], // Inicialmente vacío
})


const id = route.params.id

console.log("id", id)

await testAndEquipmentStore.getTestProcessById(id)

onMounted(async () => {
  

  console.log("id", id)

  

  const dataActive = await testAndEquipmentStore.transformedDataActive
  const dataInactive = await testAndEquipmentStore.transformedDataInactive


  tableConfig.data = dataActive
  tableConfigReservation.data = dataInactive
})
</script>

<template>
  <div class="d-flex justify-end">
    <VBtn @click="openDialog">
      <VIcon
        start
        icon="tabler-transfer-out"
        size="large"
      />
      REGRESAR
    </VBtn>
  </div>
  <Dialog
    :is-dialog-visible="isDialogVisible"
    @update:isDialogVisible="closeDialog"
  />
  <div class="section-container">
    <div
      :class="{ 'loading-title-animate': isLoadingAnimation }"
      class="section-title"
    >
      EQUIPOS EN PROCESO
    </div>
  </div>
  
  <EquiposView :table-config="tableConfig" />

  <div class="section-container">
    <div
      :class="{ 'loading-title-animate': isLoadingAnimation }"
      class="section-title"
    >
      EQUIPOS FINALIZADOS
    </div>
  </div>
  
  <EquiposView :table-config="tableConfigReservation" />


  <div class="section-container">
    <div
      :class="{ 'loading-title-animate': isLoadingAnimation }"
      class="section-title"
    >
      EQUIPOS RESERVADOS
    </div>
  </div>
  
  <!-- <EquiposView :table-config="tableConfigReservation" /> -->
</template>

<style lang="scss" scope>
.section-container {
  display: flex;
  align-items: center;
  margin-block: 20px;
  margin-inline: 0;
}

.section-title {
  position: relative;
  font-weight: bold;
  padding-inline-end: 20px; /* Espaciado para el texto */
}

.section-title::before,
.section-title::after {
  position: absolute;
  background-image: linear-gradient(
    to right,
    transparent,
    rgba(25, 188, 237, 90.5%),
    transparent
  );
  block-size: 2px;
  content: "";
  inset-block-start: 50%;
}

.section-title::before {
  inline-size: calc(80vw - 100px); /* Ajusta según el tamaño del contenedor */
  inset-inline-end: 100%;
}

.section-title::after {
  inline-size: calc(80vw - 20px); /* Ajusta según el tamaño del contenedor */
  inset-inline-start: 100%;
}
</style>
