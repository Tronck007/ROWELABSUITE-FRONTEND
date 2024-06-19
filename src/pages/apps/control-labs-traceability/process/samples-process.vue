<!-- eslint-disable arrow-parens -->
<!-- eslint-disable semi -->
<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { useDialogStore, useTestAndEquipment, useReservationStore } from "@/stores/apps/control-labs-traceability";
import Dialog from "@/views/apps/components/Dialog.vue";
import Notifications from "@/views/apps/components/Notifications.vue";
import TableView from '@/views/apps/control-labs-traceability/TableViews.vue';
import BackButton from "@/views/apps/ui/BackButton.vue";
import { mostrarAlertaConfirmacion } from '@/utils/sweetalert-utils';

// Inicialización de los stores
const testAndEquipmentStore = useTestAndEquipment();
const reservationStore = useReservationStore();
const dialogStore = useDialogStore();
const router = useRouter();
const isLoadingAnimation = ref(false);
const isDialogVisible = ref(false);
const dialogMode = ref('add');

const route = useRoute();

const closeDialog = () => {
  isDialogVisible.value = false;
};

const openDialog = (mode, item = null) => {
  dialogMode.value = mode;
  dialogStore.openDialogWithActionId(mode === 'edit' ? [2]: [2]);
  if (mode === 'edit' && item) {
    dialogStore.currentProcess = item;
  }
  dialogStore.openBySection = 'reservation';
  isDialogVisible.value = true;
};

const fetchData = async () => {
  isLoadingAnimation.value = true;
  try {
    await testAndEquipmentStore.getTestProcessById(route.params.id);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isLoadingAnimation.value = false;
  }
};

const handleEdit = (item) => {
  openDialog('edit', item);
};

const handleDelete = (item) => {
  mostrarAlertaConfirmacion('¿Estás seguro?', '¡No podrás revertir esto!', () => {
    testAndEquipmentStore.deleteProcess(item);
  }, 'eliminar');
};

const handleDeleteReservation = (item) => {
  mostrarAlertaConfirmacion('¿Estás seguro?', '¡No podrás revertir esto!', () => {
    reservationStore.deleteReservation(item);
  }, 'eliminar');
};

const handleView = (item) => {
  console.log('View:', item);
};

const handleCheck = (item) => {
  console.log('Check:', item);
};

const handleGoto = (item) => {
  router.push({ name: 'samplesProcess', params: { id: item.process_code } });
};

const handleFinishProcess = (item) => {
  console.log('Finish:', item); 
  mostrarAlertaConfirmacion('¿Estás seguro de finalizar el proceso?', '¡Muy Bien 😎👍!', () => {
    testAndEquipmentStore.endProcess(item);
  }, 'completar');
};

const updateRemainingTimes = async () => {
  await fetchData();
};



onMounted( async() => {
  await fetchData();
  setInterval(updateRemainingTimes, 60000); // 60000 ms = 1 minuto
});
</script>

<template>
  <Notifications />
  <VCardText class="py-4 gap-4">
    <BackButton />
  </VCardText>
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
  <TableView
    :table-config="testAndEquipmentStore.tableConfigProcess"
    @edit="handleEdit"
    @delete="handleDelete"
    @view="handleView"
    @check="handleCheck"
    @goto="handleGoto"
    @finishProcess="handleFinishProcess"
  />

  <div class="section-container">
    <div
      :class="{ 'loading-title-animate': isLoadingAnimation }"
      class="section-title"
    >
      EQUIPOS RESERVADOS
    </div>
  </div>

  <TableView
    :table-config="testAndEquipmentStore.tableConfigReservation"
    @edit="handleEdit"
    @delete="handleDeleteReservation"
    @view="handleView"
    @check="handleCheck"
    @goto="handleGoto"
    @finishProcess="handleFinishProcess"
  />

  <div class="section-container">
    <div
      :class="{ 'loading-title-animate': isLoadingAnimation }"
      class="section-title"
    >
      EQUIPOS FINALIZADOS
    </div>
  </div>
  
  <TableView
    :table-config="testAndEquipmentStore.tableConfigEndProcess"
    @edit="handleEdit"
    @delete="handleDelete"
    @view="handleView"
    @check="handleCheck"
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
