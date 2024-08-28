<template>
  <div class="section-container">
    <div
      :class="{ 'loading-title-animate': isLoadingAnimation }"
      class="section-title"
    >
  LISTADOS DE EQUIPOS    
    </div>
  </div>
  <Notifications />
  <WidgetCard :widget-data="widgetData" />
  <Dialog
    :is-dialog-visible="isDialogVisible"
    @update:isDialogVisible="closeDialog"
  />
  <div class="d-flex justify-end mb-6">
    <VBtn @click="handleAddSample">
      <VIcon
        start
        icon="tabler-square-plus"
        size="large"
      />
      AGREGAR NUEVO EQUIPO
    </VBtn> 
  </div>
  <DataTable
    :table-config="tableConfig"
    :total-items="totalItems"
    :items-per-page="itemsPerPage"
    :page="page"
    :tooltips="tooltips"
    @edit="handleEdit"
    @delete="handleDelete"
    @view="handleView"
    @check="handleCheck"
    @goto="handleGoto"
    @finishProcess="handleFinishProcess"
    @update:page="handlePageUpdate" 
    @update:itemsPerPage="handleItemsPerPageUpdate"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useEquipmentStore, useCatalogStore, useDialogStore } from '@/stores/apps/control-labs-traceability'
import WidgetCard from "@/views/apps/ui/WidgetCard.vue"
import DataTable from "@/views/apps/components/DataTable.vue"
import Dialog from "@/views/apps/components/Dialog.vue"
import Notifications from "@/views/apps/components/Notifications.vue"

// Store
const equipmentStore = useEquipmentStore()
const catalogStore = useCatalogStore()
const dialogStore = useDialogStore()

// Reactividad para la tabla de datos
const isLoadingAnimation = ref(false)
const tableConfig= computed(() => equipmentStore.tableConfig)
const totalItems = ref(equipmentStore.totalDocuments)
const itemsPerPage = ref(equipmentStore.itemsPerPage)
const page = ref(equipmentStore.currentPage)
const isDialogVisible = ref(false)

// Función para abrir el diálogo y configurar según la acción seleccionada
const openDialog = () => {
  dialogStore.openDialogWithActionId([7])
  isDialogVisible.value = true
  dialogStore.openBySection = 'equipment'
}

const closeDialog = () => {
  isDialogVisible.value = false
}

const widgetData = ref([
  {
    title: 'Disponibles',
    value: computed(() => equipmentStore.free),
    icon: 'tabler-check',
    status: 'free',
  },
  {
    title: 'Procesos',
    value: computed(() => equipmentStore.in_process),
    icon: 'tabler-progress',
    status: 'in_process',
  },
  {
    title: 'Reservados',
    value: computed(() => equipmentStore.reserved),
    icon: 'tabler-calendar-event',
    status: 'reserved',
  },
  {
    title: 'No Disponibles',
    value: computed(() => equipmentStore.not_available),
    icon: 'tabler-circle-off',
    status: 'Inactive',
  },
])

// Mapa de textos de estado
const statusTextMap = {
  created: "Creado",
  in_process: "En Proceso",
  completed: "Completado",
  on_hold: "En Espera",
  inactive: "Inactivo",
  reserved: "Reservado",
  active: "Activo",
}


const tooltips = {
  finishProcess: 'Terminar Proceso',
  edit: 'Muestras - Equipos - Reservas',
  check: 'Marcar',
  delete: 'Eliminar Proceso',
  goTo: 'Ir a Equipos (En Proceso, Reservados y Finalizados)',
  view: 'Visualizar PDF',
}

// Función para cargar los datos desde el store
const fetchData = async () => {
  isLoadingAnimation.value = true
  try {
    await Promise.all([
      equipmentStore.fetchAllEquipment(page.value, itemsPerPage.value),
    ])
    totalItems.value = equipmentStore.totalDocuments // Actualizar totalItems después de la carga
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    isLoadingAnimation.value = false
  }
}

// Cargar datos al montar el componente
onMounted(() => {
  fetchData()
})

// Captura el cambio de página
const handlePageUpdate = newPage => {
  page.value = newPage
  fetchData()
}

// Captura el cambio de elementos por página
const handleItemsPerPageUpdate = newItemsPerPage => {
  itemsPerPage.value = newItemsPerPage
  fetchData()
}


// Función para manejar acciones
const handleAddSample = () => {
  openDialog('add')
}

const handleEdit = item => {
  console.log('Edit:', item)

  // findTest(item.quality_test_group_id)
  dialogStore.currentProcess = item
  dialogStore.openDialogWithActionId([6])
  isDialogVisible.value = true
}

const handleDelete = item => {
  console.log('Delete:', item)
}

const handleView = item => {
  console.log('View:', item)
}

const handleCheck = item => {
  console.log('Check:', item)
}

const handleGoto = item => {
  console.log('GoTo:', item)
}

const handleFinishProcess = item => {
  console.log('FinishProcess:', item)
}
</script>

<style lang="scss" scoped>
.section-container {
  display: flex;
  align-items: center;
  margin-block: 20px;
  margin-inline: 0;
}

.section-title {
  position: relative;
  font-weight: bold;
  padding-inline-end: 50px;
}

.section-title::before,
.section-title::after {
  position: absolute;
  background-image: linear-gradient(
    to right, transparent, rgba(25, 188, 237, 90.5%), transparent
  );
  block-size: 2px;
  content: "";
  inset-block-start: 50%;
}

.section-title::before {
  inline-size: calc(80vw - 100px);
  inset-inline-end: 100%;
}

.section-title::after {
  inline-size: calc(80vw - 20px);
  inset-inline-start: 100%;
}
</style>
