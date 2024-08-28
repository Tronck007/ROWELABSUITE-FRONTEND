<!-- eslint-disable -->
<template>
  <!-- Componente de notificaciones -->
  <Notifications />

  <!-- Botón de retroceso -->
  <VCardText class="py-4 gap-4">
    <BackButton />
  </VCardText>

  <!-- Componente de diálogo -->
  <Dialog
    :is-dialog-visible="isDialogVisible"
    @update:isDialogVisible="closeDialog"
  />
  
  <!-- Sección de Equipos en Proceso -->
  <div class="section-container section-process">
    <div
      :class="{ 'loading-title-animate': isLoadingAnimation }"
      class="section-title"
    >
      EQUIPOS EN PROCESO
    </div>
  </div>
  
  <!-- Tabla de equipos en proceso -->
  <DataTable
    :table-config="testAndEquipmentStore.tableConfigProcess"
    :tooltips="tooltips"
    @edit="handleEdit"
    @delete="handleDelete"
    @goto="handleGoto"
    @finishProcess="handleFinishProcess"
  />

    <!-- Sección de Equipos Reservados -->
  <div class="section-container section-consumables">
    <div
      :class="{ 'loading-title-animate': isLoadingAnimation }"
      class="section-title"
    >
      ESTANDAR,REACTIVO E IMPUREZA CONSUMIDOS
    </div>
  </div>   
  <!-- Tabla de equipos reservados -->
  <DataTable
    :table-config="testAndEquipmentStore.tableConfigReservation"
    :tooltips="tooltips"
    @edit="handleEdit"
    @delete="handleDeleteReservation"
    @goto="handleGoto"
    @finishProcess="handleFinishProcess"
  />


  <!-- Sección de Equipos Reservados -->
  <div class="section-container section-reserved">
    <div
      :class="{ 'loading-title-animate': isLoadingAnimation }"
      class="section-title"
    >
      EQUIPOS RESERVADOS
    </div>
  </div>

  <!-- Tabla de equipos reservados -->
  <DataTable
    :table-config="testAndEquipmentStore.tableConfigReservation"
    :tooltips="tooltips"
    @edit="handleEdit"
    @delete="handleDeleteReservation"
    @goto="handleGoto"
    @finishProcess="handleFinishProcess"
  />

  <!-- Sección de Equipos Finalizados -->
  <div class="section-container section-finished">
    <div
      :class="{ 'loading-title-animate': isLoadingAnimation }"
      class="section-title"
    >
      EQUIPOS FINALIZADOS
    </div>
  </div>
  
  <!-- Tabla de equipos finalizados -->
  <DataTable
    :table-config="testAndEquipmentStore.tableConfigEndProcess"
    :tooltips="tooltips"
    @edit="handleEdit"
    @delete="handleDelete"
    @goto="handleGoto"
    @finishProcess="handleFinishProcess"
  />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from "vue-router"
import { useDialogStore, useTestAndEquipment, useReservationStore } from "@/stores/apps/control-labs-traceability"
import Dialog from "@/views/apps/components/Dialog.vue"
import Notifications from "@/views/apps/components/Notifications.vue"
import DataTable from '@/views/apps/components/DataTable.vue' // Importa el DataTable
import BackButton from "@/views/apps/ui/BackButton.vue"
import { mostrarAlertaConfirmacion } from '@/utils/sweetalert-utils'

// Inicialización de los stores
const testAndEquipmentStore = useTestAndEquipment()
const reservationStore = useReservationStore()
const dialogStore = useDialogStore()
const router = useRouter()
const route = useRoute()

// Variables reactivas para el manejo del estado
const isLoadingAnimation = ref(false)
const isDialogVisible = ref(false)
const dialogMode = ref('add')

// Función para cerrar el diálogo
const closeDialog = () => {
  isDialogVisible.value = false
}

// Función para abrir el diálogo en modo de edición o adición
const openDialog = (mode, item = null) => {
  dialogMode.value = mode
  dialogStore.openDialogWithActionId([2, 3, 4])
  if (mode === 'edit' && item) {
    dialogStore.currentProcess = item
  }
  dialogStore.openBySection = 'reservation'
  isDialogVisible.value = true
}

// Función para manejar la edición de un elemento
const handleEdit = item => {
  openDialog('edit', item)
}

// Función para obtener los datos iniciales
const fetchData = async () => {
  isLoadingAnimation.value = true
  try {
    await testAndEquipmentStore.getTestProcessById(route.params.id)
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    isLoadingAnimation.value = false
  }
}

// Función para manejar la eliminación de un proceso
const handleDelete = item => {
  mostrarAlertaConfirmacion('¿Estás seguro?', '¡No podrás revertir esto!', () => {
    testAndEquipmentStore.deleteProcess(item)
  }, 'eliminar')
}

// Función para manejar la eliminación de una reserva
const handleDeleteReservation = item => {
  mostrarAlertaConfirmacion('¿Estás seguro?', '¡No podrás revertir esto!', () => {
    reservationStore.deleteReservation(item)
  }, 'eliminar')
}

// Función para navegar a otro proceso
const handleGoto = item => {
  router.push({ name: 'samplesProcess', params: { id: item.process_code } })
}

// Función para finalizar un proceso
const handleFinishProcess = item => {
  console.log('Finish:', item) 
  mostrarAlertaConfirmacion('¿Estás seguro de finalizar el proceso?', '¡Muy Bien 😎👍!', () => {
    testAndEquipmentStore.endProcess(item)
  }, 'completar')
}

// Función para actualizar los tiempos restantes
const updateRemainingTimes = async () => {
  await fetchData()
}

// Al montar el componente, se obtienen los datos y se establece un intervalo para actualizar los tiempos restantes cada minuto
onMounted(async () => {
  await fetchData()
  setInterval(updateRemainingTimes, 60000) // 60000 ms = 1 minuto
})

// Tooltips para los botones de acción
const tooltips = {
  finishProcess: 'Finalizar Equipo',
  edit: 'Muestras - Equipos - Reservas',
  check: 'Marcar',
  delete: 'Eliminar Equipo',
  goTo: 'Ir a Equipos (En Proceso, Reservados y Finalizados)',
  view: 'Visualizar PDF',
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

.section-reserved .section-title::before,
.section-reserved .section-title::after {
  background-image: linear-gradient(
    to right,
    transparent,
    rgba(255, 165, 0, 90.5%),
    transparent
  );
}

.section-consumables .section-title::before,
.section-consumables .section-title::after {
  background-image: linear-gradient(
    to right,
    transparent,
    rgba(153, 102, 255, 0.905), /* Púrpura claro y vibrante */
    transparent
  );
}

.section-finished .section-title::before,
.section-finished .section-title::after {
  background-image: linear-gradient(
    to right,
    transparent,
    rgba(34, 139, 34, 90.5%),
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
