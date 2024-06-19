<!-- eslint-disable semi -->
<!-- eslint-disable vue/attribute-hyphenation -->
<!-- eslint-disable import/no-unresolved -->
<script setup>
import { useBatchStore, useCatalogStore, useDialogStore, useProcessStore } from '@/stores/apps/control-labs-traceability';
import Dialog from "@/views/apps/components/Dialog.vue";
import Notifications from "@/views/apps/components/Notifications.vue";
import TableView from '@/views/apps/control-labs-traceability/TableViews.vue';
import { ref, onMounted, reactive, computed } from 'vue';
import { mostrarAlertaConfirmacion } from '@/utils/sweetalert-utils';
import { useRouter } from 'vue-router';
import BackButton from "@/views/apps/ui/BackButton.vue";

// Inicialización de los stores de procesos y catálogos
const batchHistoryStore = useBatchStore();
const catalogStore = useCatalogStore();
const dialogStore = useDialogStore();
const processStore = useProcessStore();
const router = useRouter();

const isLoadingAnimation = ref(false);
const isDialogVisible = ref(false);
const dialogMode = ref('add');

const closeDialog = () => {
  isDialogVisible.value = false;
};

// Función para abrir el diálogo y configurar según la acción seleccionada
const openDialog = () => {
  dialogStore.openDialogWithActionId([1])
  isDialogVisible.value = true
  dialogStore.openBySection = 'samples'
}

const fetchData = async () => {
  isLoadingAnimation.value = true;
  try {
    await Promise.all([
      catalogStore.getCatalogAllEquipment(),
      batchHistoryStore.fetchAllBatchData(),
    ]);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isLoadingAnimation.value = false;
  }
};

const findTest = async id => {
  await catalogStore.getCatalogTestById(id)
}

// Define tus funciones de manejo aquí
const handleEdit = item => {
  findTest(item.quality_test_group_id)
  dialogStore.currentProcess = item
  dialogStore.openDialogWithActionId([1, 2, 3])
  isDialogVisible.value = true
}

const handleAddSample = () => {
  openDialog('add');
};

const handleReserveEquipment = () => {
  openDialog('reserve');
};

const handleDelete = (item) => {
  mostrarAlertaConfirmacion('¿Estás seguro?', '¡No podrás revertir esto!', () => {
    processStore.deleteProcess(item.id); 
  }, 'eliminar');
};

const handleView = (item) => {
  console.log('View:', item);
  batchHistoryStore.currentProcess = item;
  router.push({ name: 'lot-printing'});
};

const handleCheck = (item) => {
  console.log('Check:', item);
};

const handleGoto = (item) => {
  router.push({ name: 'samplesProcess', params: { id: item.process_code } });
};

const handleFinishProcess = (item) => {
  mostrarAlertaConfirmacion('¿Estás seguro de finalizar el proceso?', '¡Muy Bien 😎👍!', () => {
    processStore.endProcess(item.id);
  }, 'completar');
};

// Configuración de headers
const tableConfig  = reactive({
  headers: {
    main: computed(() => batchHistoryStore.headers),
    sub: computed(() => batchHistoryStore.subHeaders),
  },
  filterCards: {
    searchInput: true,
    filterStatus: false,
  },
  filterSubtables: 'equipments',
  expandedRows: true, 
  buttonConfigs: {
    main: {
      showFinishButton: false,
      showEdit: false,
      showDelete: false,
      showCheck: false,
      showView: true,
      showGoto: false,   
    },
    sub: {
      showEdit: false,
      showDelete: false,
      showCheck: false,
      showGoto: false,

    },
  },  
  goToPage: 'samplesProcess',
  isLoading: computed(() => batchHistoryStore.isLoading),
  data: computed(() => batchHistoryStore.transformedData),
})

onMounted(fetchData);
</script>

<template>
  <Notifications />
  <VCardText class="py-4 gap-4">
    <BackButton />
  </VCardText>
  <div class="section-container">
    <div :class="{ 'loading-title-animate': isLoadingAnimation }" class="section-title">
      HISTORICO DE LOTES
    </div>
  </div>
  <TableView
    :table-config="tableConfig"
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
