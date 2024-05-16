<!-- eslint-disable vue/no-mutating-props -->
<script setup>
import { VDataTable } from "vuetify/labs/VDataTable"

import ActionButton from "../ui/ActionButton.vue"

// Definición de props
const props = defineProps({
  items: Array,
  cleanTrigger: Boolean,
  colspan: Number,
  subHeaders: Array,
  buttonConfigs: Object, 
  loading: Boolean,
})

/*
// Uso de una ref para localItems para mantener una copia local que pueda ser limpiada.
const localItems = ref(...props.items)

// Observar cambios en los items para actualizar localItems.
// No necesitas { deep: true } aquí ya que estás observando el cambio de la referencia del array.
watch(() => props.items, newVal => {
  localItems.value = [...newVal]
}, { immediate: true })

// Observa el cambio en cleanTrigger para limpiar localItems.
watch(() => props.cleanTrigger, newVal => {
  if (newVal) {
    localItems.value = []
  }
})*/

const Headers = [
  {
    title: "ID MUESTRAS",
    key: "sampling_id",
  },
  {
    title: "Ped. Calidad",
    key: "quality_order_number",
  },
  {
    title: "METODO",
    key: "quality_test_group_id",
  },

  {
    title: "ACCIÓN",
    key: "actions",
  },
]

const editIcon = ref(true)

const resolveStatusVariant = entityLifecycleId => {
  if (entityLifecycleId === 8 || entityLifecycleId === 6) {
    editIcon.value = true
    
    return { color: "success", text: "Activa" }
  } else if (entityLifecycleId === 7) {
    return { color: "warning", text: "Inactiva" }
  }
}

const handleDelete = itemToDelete => {
  const index = props.items.findIndex(item => item.sampling_id === itemToDelete.sampling_id)
  if (index !== -1) {
    props.items.splice(index, 1)
  }
}
</script>

<template>
  <VDataTable
    :loading="loading"
    :colspan="colspan"
    :headers="Headers"
    :items="props.items"
    class="rounded-lg elevation-1"
  >
    <template #item.sampling_id="{ item }">
      <div class="d-flex flex-column ms-3">
        <span class="d-block font-weight-medium text-high-emphasis text-truncate">{{
          item.sampling_id
        }}</span>
      </div>
    </template>
    <template #item.program_start_equipment_process="{ item }">
      <div class="d-flex flex-column ms-3">
        <span class="d-block font-weight-medium text-high-emphasis text-truncate">{{
          formatIsoDateTimeToReadable(
            item.program_start_equipment_process,
          )
        }}</span>
      </div>
    </template>
    <template #item.program_end_equipment_process="{ item }">
      <div class="d-flex flex-column ms-3">
        <span class="d-block font-weight-medium text-high-emphasis text-truncate">{{
          formatIsoDateTimeToReadable(item.program_end_equipment_process)
        }}</span>
      </div>
    </template>
    <template #item.actions="{ item }">
      <ActionButton
        :show-edit="buttonConfigs.showEdit"
        :show-delete="buttonConfigs.showDelete"
        :show-check="buttonConfigs.showCheck"
        :show-go-to-button="buttonConfigs.showGoto"
        @delete="handleDelete(item)" 
      /> 
    </template> 
    <template #item.entity_lifecycle_id="{ item }">
      <VChip
        :color="resolveStatusVariant(item.entity_lifecycle_id).color"
        size="small"
      >
        {{ resolveStatusVariant(item.entity_lifecycle_id).text }}
      </VChip>
    </template>
  

    <template #bottom>
      <VCardText class="pt-2">
        <div class="d-flex flex-wrap justify-center justify-sm-space-between gap-y-2 mt-2" />
      </VCardText>
    </template>
  </VDataTable>
</template>
