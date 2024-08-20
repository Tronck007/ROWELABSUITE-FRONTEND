<!-- eslint-disable -->
<!-- samples.vue -->
<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCatalogStore, useDialogStore, useProcessStore } from '@/stores/apps/control-labs-traceability';
import Dialog from "@/views/apps/components/Dialog.vue";
import Notifications from "@/views/apps/components/Notifications.vue";
import TableView from '@/views/apps/control-labs-traceability/TableViews.vue';
import { mostrarAlertaConfirmacion } from '@/utils/sweetalert-utils';

// Inicialización de los stores de procesos, diálogos y catálogos
const processStore = useProcessStore();
const dialogStore = useDialogStore();
const catalogStore = useCatalogStore();
const router = useRouter();

// Variables reactivas para manejar el estado del componente
const isLoadingAnimation = ref(false);
const isDialogVisible = ref(false);
const dialogMode = ref('add');
const filterStatus = ref(["Creado", "En Proceso"]);
const userData = useCookie("userData").value;

// Función para cerrar el diálogo
const closeDialog = () => {
  isDialogVisible.value = false;
};

// Función para abrir el diálogo y configurar según la acción seleccionada
const openDialog = () => {
  dialogStore.openDialogWithActionId([1]);
  isDialogVisible.value = true;
  dialogStore.openBySection = 'samples';
};

// Función para obtener datos iniciales
const fetchData = async () => {
  isLoadingAnimation.value = true;
  try {
    await Promise.all([
      catalogStore.getCatalogAllEquipment(),
      processStore.loadInitialData(),
    ]);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isLoadingAnimation.value = false;
  }
};

// Función para encontrar una prueba por su ID
const findTest = async id => {
  await catalogStore.getCatalogTestById(id);
};

// Función para manejar la edición de un proceso
const handleEdit = item => {
  findTest(item.quality_test_group_id);
  dialogStore.currentProcess = item;
  dialogStore.openDialogWithActionId([2, 3, 4]);
  isDialogVisible.value = true;
};

// Función para iniciar un nuevo proceso
const handleAddSample = () => {
  openDialog('add');
};

// Función para manejar la eliminación de un proceso
const handleDelete = (item) => {
  if (userData.role === 'admin' || userData.role === 'Manager-Control-Labs') {
    mostrarAlertaConfirmacion('¿Estás seguro?', '¡No podrás revertir esto!', () => {
      processStore.deleteProcess(item.id);
    }, 'eliminar');
  } else {
    mostrarAlertaConfirmacion('No tienes permisos para eliminar este proceso', '¡Ups! 😅', () => {}, 'error');
  }
};

// Función para manejar la navegación a otro proceso
const handleGoto = (item) => {
  router.push({ name: 'samplesProcess', params: { id: item.process_code } });
};

// Computed para verificar si hay algún equipo en proceso
const isEquipmentInProcess = computed(() => {
  return processStore.originalData.some(process =>
    process.samples.some(sample =>
      sample.equipments.some(equipment =>
        equipment.equipment_process?.status === 'in_process'
      )
    )
  );
});

// Función para manejar la finalización de un proceso, deshabilitada si hay equipos en proceso
const handleFinishProcess = (item) => {
  if (isEquipmentInProcess.value) {
    mostrarAlertaConfirmacion('No puedes finalizar el proceso porque hay equipos en proceso', '¡Ups! 😅', () => {}, 'error');
  } else {
    mostrarAlertaConfirmacion('¿Estás seguro de finalizar el proceso?', '¡Muy Bien 😎👍!', () => {
      processStore.endProcess(item.id);
    }, 'completar');
  }
};

// Llamada a fetchData al montar el componente
onMounted(fetchData);

// Tooltips para los botones de acción
const tooltips = {
  finishProcess: 'Terminar Proceso',
  edit: 'Muestras - Equipos - Reservas',
  check: 'Marcar',
  delete: 'Eliminar Proceso',
  goTo: 'Ir a Equipos (En Proceso, Reservados y Finalizados)',
  view: 'Visualizar PDF',
};
</script>

<template>
  <Notifications />
  <div class="d-flex justify-end">
    <VBtn @click="handleAddSample">
      <VIcon start icon="tabler-square-plus" size="large" />
      INICIAR NUEVO PROCESO
    </VBtn>
  </div>
  <Dialog :is-dialog-visible="isDialogVisible" @update:isDialogVisible="closeDialog" />
  <div class="section-container">
    <div :class="{ 'loading-title-animate': isLoadingAnimation }" class="section-title">
      PROCESOS ABIERTOS
    </div>
  </div>
  <TableView
    :table-config="processStore.tableConfig"
    :tooltips="tooltips"
    :filter-status="filterStatus"
    @edit="handleEdit"
    @delete="handleDelete"    
    @goto="handleGoto"
    @finishProcess="handleFinishProcess"
  />
</template>

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
  padding-inline-end: 20px;
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
