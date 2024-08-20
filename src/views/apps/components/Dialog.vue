<!-- eslint-disable -->
<script setup>
import { ref, computed, watch } from 'vue';
import { useCatalogStore, useDialogStore } from "@/stores/apps/control-labs-traceability";

// Definición de las propiedades recibidas desde el componente padre
const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    default: false,
  },
});

// Definición de eventos emitidos
const emit = defineEmits(["update:isDialogVisible", "updatedData"]);

// Instancia de las tiendas
const catalogStore = useCatalogStore();
const dialogStore = useDialogStore();

// Variables reactivas para almacenar catálogos
const catalog_test = ref([]);
const catalog_equipment = ref([]);

// Observadores para actualizar los catálogos cuando cambian en el store
watch(() => catalogStore.catalogTest, () => {
  catalog_test.value = catalogStore.catalogTest;
});

watch(() => catalogStore.catalogEquipment, () => {
  catalog_equipment.value = catalogStore.catalogEquipment;
});

// Objeto que contiene las propiedades que se pasan a los componentes
const propsObject = {
  catalog_equipment: catalog_equipment.value,
  catalog_test: catalog_test.value,
};

// Configuración del diálogo y pasos del componente
const dialogConfig = computed(() => dialogStore.dialogConfig);
const currentStep = ref(0);

// Computed para determinar el componente actual basado en el paso del stepper
const currentComponent = computed(() => {
  if (dialogConfig.value) {
    const step = dialogConfig.value.stepsConfig[currentStep.value];
    return step ? dialogConfig.value.componentMap[step.componentID] : null;
  }
  return null;
});

// Función para actualizar la visibilidad del diálogo y reiniciar el paso actual
const dialogVisibleUpdate = (val) => {
  emit("update:isDialogVisible", val);
  currentStep.value = 0;
};

// Observador para reiniciar el paso cuando se oculta el diálogo
watch(props, () => {
  if (!props.isDialogVisible) currentStep.value = 0;
});

// Computed para filtrar las propiedades necesarias para el componente actual
const filteredProps = computed(() => {
  if (!currentComponent.value) return {};

  const currentStepConfig = dialogConfig.value.stepsConfig.find(
    step => step.componentID === currentComponent.value,
  );

  if (!currentStepConfig || !currentStepConfig.propsRequired) return {};

  // Filtra propsObject basado en propsRequired para el componente actual
  return currentStepConfig.propsRequired.reduce((acc, propName) => {
    if (propsObject[propName] !== undefined) {
      acc[propName] = propsObject[propName];
    }
    return acc;
  }, {});
});
</script>

<template>
  <VDialog
    :model-value="isDialogVisible"
    max-width="800px"
    persistent
    @update:model-value="dialogVisibleUpdate"
  >
    <!-- Botón para cerrar el diálogo -->
    <DialogCloseBtn
      size="small"
      @click="emit('update:isDialogVisible', false)"
    />
    <VCard class="create-app-dialog">
      <VCardText class="pa-5 pa-sm-10">
        <div class="section-container2 align-center">
          <div class="section-title mb-2">
            CUADRO DE GESTIÓN
          </div>
        </div>
        <VRow>
          <!-- Stepper para navegar entre los pasos del diálogo -->
          <VCol cols="12" sm="5" md="4" lg="3">
            <AppStepper
              v-if="dialogConfig?.stepsConfig"
              v-model:current-step="currentStep"
              :items="dialogConfig?.menuItems"
              direction="vertical"
              icon-size="24"
              class="stepper-icon-step-bg"
            />
          </VCol>
          <!-- Renderizado dinámico del componente actual basado en el paso -->
          <VCol cols="12" sm="7" md="8" lg="9">
            <component
              :is="currentComponent"
              v-if="currentComponent"
              v-bind="filteredProps"
            />
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </VDialog>
</template>

