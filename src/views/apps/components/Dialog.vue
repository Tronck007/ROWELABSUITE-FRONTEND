<!-- eslint-disable camelcase -->
<script setup>
import { useCatalogStore, useDialogStore } from "@/stores/apps/control-labs-traceability";

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(["update:isDialogVisible", "updatedData"])

const catalogStore = useCatalogStore()

const catalog_test =ref([])
const catalog_equipment = ref([])

watch(() => catalogStore.catalogTest, () => {
  catalog_test.value = catalogStore.catalogTest
})

watch(() => catalogStore.catalogEquipment, () => {
  catalog_equipment.value = catalogStore.catalogEquipment

})



const propsObject = {
  catalog_equipment: catalog_equipment.value,
  catalog_test: catalog_test.value,
}



const dialogStore = useDialogStore()

const dialogConfig = computed(() => dialogStore.dialogConfig)
const currentStep = ref(0)

const currentComponent = computed(() => {
  if (dialogConfig.value) {
    const step = dialogConfig.value.stepsConfig[currentStep.value]
    
    return step ? dialogConfig.value.componentMap[step.componentID] : null
  }
  
  return null
})

const dialogVisibleUpdate = val => {
  emit("update:isDialogVisible", val)
  currentStep.value = 0
}

watch(props, () => {
  if (!props.isDialogVisible) currentStep.value = 0
})


const filteredProps = computed(() => {
  if (!currentComponent.value) return {}

  const currentStepConfig = dialogMeta.stepsConfig.find(
    step => step.componentID === currentComponent.value,
  )
  
  if (!currentStepConfig || !currentStepConfig.propsRequired) return {}

  // Filtra propsObject basado en propsRequired para el componente actual
  return currentStepConfig.propsRequired.reduce((acc, propName) => {
    if (propsObject[propName] !== undefined) {
      acc[propName] = propsObject[propName]
    }
    
    return acc
  }, {})
})
</script>

<template>
  <VDialog
    :model-value="isDialogVisible"
    max-width="900px"
    persistent
    @update:model-value="dialogVisibleUpdate"
  >
    <DialogCloseBtn
      size="small"
      @click="emit('update:isDialogVisible', false)"
    />
    <VCard class="create-app-dialog">
      <VCardText class="pa-5 pa-sm-10">
        <div class="section-container2  align-center">
          <div class="section-title mb-2  ">
            CUADRO DE GESTIÓN
          </div>
        </div>
        <VRow>
          <VCol
            cols="12"
            sm="5"
            md="4"
            lg="3"
          >
            <AppStepper
              v-if="dialogConfig?.stepsConfig"
              v-model:current-step="currentStep"
              :items="dialogConfig?.menuItems"
              direction="vertical"
              icon-size="24"
              class="stepper-icon-step-bg"
            />
          </VCol>
          <VCol
            cols="12"
            sm="7"
            md="8"
            lg="9"
          >
            <!-- Aquí renderizas el componente actual basado en el paso del stepper -->
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

<style lang="scss" scoped>

</style>
