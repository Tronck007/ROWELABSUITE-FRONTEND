<!-- eslint-disable semi -->
<!-- eslint-disable vue/attribute-hyphenation -->
<!-- eslint-disable import/no-unresolved -->
<script setup>
import { useCatalogStore, useDialogStore, useProcessStore } from '@/stores/apps/control-labs-traceability';
import Dialog from "@/views/apps/components/Dialog.vue";
import Notifications from "@/views/apps/components/Notifications.vue";
import SamplesView from "@/views/apps/control-labs-traceability/TableViews.vue";


// Inicialización de los stores de procesos y catálogos
const processStore = useProcessStore()
const dialogStore  =useDialogStore() 
const catalogStore = useCatalogStore()

const isLoadingAnimation = ref(false)

const isDialogVisible = ref(false)

// Función para cerrar el diálogo
const closeDialog = () => {
  isDialogVisible.value = false
}


// Función para abrir el diálogo y configurar según la acción seleccionada
const openDialog = () => {
  dialogStore.openDialogWithActionId([1])
  isDialogVisible.value = true
  dialogStore.openBySection = 'samples'

  console.log('dialogStore.openBySection', dialogStore.openBySection)
}

// Configuración de headers
const tableConfig  = reactive({
  headers: {
    main: computed(() => processStore.headers),
    sub: computed(() => processStore.subHeaders),
  },
  filterSubtables: 'samples',
  expandedRows: true, 
  buttonConfigs: {
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
  goToPage: 'samplesProcess',
  isLoading: computed(() => processStore.isLoading),
  data: computed(() => processStore.transformedData),
})

onMounted(async() => {
  await catalogStore.getCatalogAllEquipment()
  await processStore.fetchAllProcesses()
  isLoadingAnimation.value = true
  setTimeout(() => isLoadingAnimation.value = false, 3000)
})
</script>

<template>
  <Notifications />
  <div class="d-flex justify-end">
    <VBtn @click="openDialog">
      <VIcon
        start
        icon="tabler-square-plus"
        size="large"
      />
      AGREGAR MUESTRAS
    </VBtn>
  </div>
  <Dialog
    :is-dialog-visible="isDialogVisible"
    @update:isDialogVisible="closeDialog"
  />
  <div class="section-container">
    <div
      :class="{'loading-title-animate': isLoadingAnimation}"
      class="section-title"
    >
      PROCESOS ABIERTOS
    </div>
  </div>
  <SamplesView :table-config="tableConfig" />
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
