<!-- eslint-disable -->
<template>
  <div class="section-container section-process">
    <div
      :class="{ 'loading-title-animate': isLoadingAnimation }"
      class="section-title"
    > 
    PROCESOS ABIERTOS  
    </div>
  </div>
  <Notifications />
  <WidgetCard :widget-data="widgetData"  v-if="tableConfig.WidgetCard"/>
  <div class="d-flex justify-end mb-4">
    <VBtn @click="handleAddSample">
      <VIcon start icon="tabler-square-plus" size="large" />
      INICIAR NUEVO PROCESO
    </VBtn>
  </div>
  <Dialog :is-dialog-visible="isDialogVisible" @update:isDialogVisible="closeDialog" />
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
import { useProcessStore, useCatalogStore, useDialogStore } from '@/stores/apps/control-labs-traceability'
import WidgetCard from "@/views/apps/ui/WidgetCard.vue"
import DataTable from "@/views/apps/components/DataTable.vue"
import Dialog from "@/views/apps/components/Dialog.vue"
import Notifications from "@/views/apps/components/Notifications.vue"

// Inicialización de los stores de procesos, diálogos y catálogos
const processStore = useProcessStore()
const dialogStore = useDialogStore()
const catalogStore = useCatalogStore()
const router = useRouter()

// Reactividad para la tabla de datos
const isLoadingAnimation = ref(false)
const tableConfig= computed(() => processStore.tableConfig)
const totalItems = ref(processStore.totalDocuments)
const itemsPerPage = ref(processStore.itemsPerPage)
const page = ref(processStore.currentPage)
const isDialogVisible = ref(false)
const userData = useCookie("userData").value

// Función para abrir el diálogo y configurar según la acción seleccionada
const openDialog = () => {
  dialogStore.openDialogWithActionId([1])
  isDialogVisible.value = true
  dialogStore.openBySection = 'samples'
}

const closeDialog = () => {
  isDialogVisible.value = false
}

const widgetData = ref([])

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
      catalogStore.getCatalogAllEquipment(), 
      processStore.fetchAllProcesses(page.value, itemsPerPage.value),
    ])
    totalItems.value = processStore.totalDocuments // Actualizar totalItems después de la carga
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


const handleCheck = item => {
  console.log('Check:', item)
}

const handleView = item => {
  console.log('View:', item)
}

// Función para manejar acciones
const findTest = async id => {
  await catalogStore.getCatalogTestById(id)
}

// Función para manejar la edición de un proceso
const handleEdit = item => {
  findTest(item.quality_test_group_id)
  dialogStore.currentProcess = item
  dialogStore.openDialogWithActionId([2, 3, 4])
  isDialogVisible.value = true
}

// Función para iniciar un nuevo proceso
const handleAddSample = () => {
  openDialog('add')
}

// Función para manejar la eliminación de un proceso
const handleDelete = item => {
  if (userData.role === 'admin' || userData.role === 'Manager-Control-Labs') {
    mostrarAlertaConfirmacion('¿Estás seguro?', '¡No podrás revertir esto!', () => {
      processStore.deleteProcess(item.id)
    }, 'eliminar')
  } else {
    mostrarAlertaConfirmacion('No tienes permisos para eliminar este proceso', '¡Ups! 😅', () => {}, 'error')
  }
}

// Función para manejar la navegación a otro proceso
const handleGoto = item => {
  router.push({ name: 'samplesProcess', params: { id: item.process_code } })
}

// Computed para verificar si hay algún equipo en proceso o si el proceso está creado
const processStatusMessage = computed(() => {
  const processCreated = processStore.originalData.some(
    process => process.state === 'created', // Verifica si algún proceso está en estado 'created'
  )



  const equipmentInProcess = processStore.originalData.some(process =>
    process.samples.some(sample =>
      sample.equipments.some(equipment =>
        equipment.equipment_process?.status === 'in_process', // Verifica si algún equipo está en estado 'in_process'
      ),
    ),
  )

  if (processCreated) {
    return 'No se puede finalizar proceso en estado "Creados".' // Mensaje si el proceso está en estado 'created'
  } else if (equipmentInProcess) {
    return 'No puedes finalizar el proceso porque hay equipos en proceso.' // Mensaje si hay equipos en estado 'in_process'
  } else {
    return 'No hay procesos creados ni equipos en proceso.' // Mensaje si no hay procesos 'created' ni equipos 'in_process'
  }
})

// Computed para verificar si hay algún equipo en proceso o si el proceso está creado
const isEquipmentInProcessOrCreated = computed(() => {

  return processStore.originalData.some(process =>

    process.state === 'created' || // Verifica si el proceso está creado
    process.samples.some(sample =>
      sample.equipments.some(equipment =>
        equipment.equipment_process?.status === 'in_process', // Verifica si hay equipos en proceso
      ),
    ),
  )
})

// Función para manejar la finalización de un proceso, deshabilitada si hay equipos en proceso
const handleFinishProcess = item => {
  if (isEquipmentInProcessOrCreated.value) {
    mostrarAlertaConfirmacion(processStatusMessage.value, '¡Ups! 😅', () => {}, 'error')
  } else {
    mostrarAlertaConfirmacion('¿Estás seguro de finalizar el proceso?', '¡Muy Bien 😎👍!', () => {
      processStore.endProcess(item.id)
    }, 'completar')
  }
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
  padding-inline-end: 20px; /* Espaciado para el texto */
}

.section-title::before,
.section-title::after {
  position: absolute;
  block-size: 2px;
  content: "";
  inset-block-start: 50%;
}

.section-process .section-title::before,
.section-process .section-title::after {
  background-image: linear-gradient(
    to right,
    transparent,
    rgba(25, 188, 237, 90.5%),
    transparent
  );
}

.section-title::before {
  inline-size: calc(80vw - 100px); /* Ajusta según el tamaño del contenedor */
  inset-inline-end: 100%;
}

.section-title::after {
  inline-size: calc(80vw - 20px); /* Ajusta según el tamaño del contenedor */
  inset-inline-start: 100%;
}

.d-flex.justify-content-end {
  margin-bottom: 20px;
}
</style>
