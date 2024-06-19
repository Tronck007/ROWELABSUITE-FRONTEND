<script setup>
import { defineEmits, defineProps, ref, watch } from 'vue'

const props = defineProps({
  estado: Array,
  modelValueSelectableStatus: Array,
  modelValueSearch: String,
  filterCards: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:modelValueSelectableStatus', 'update:modelValueSearch'])

const selectableStatus = ref([])
const search = ref('')

watch(() => props.modelValueSelectableStatus, newVal => {
  selectableStatus.value = newVal
})

watch(() => props.modelValueSearch, newVal => {
  search.value = newVal
})

watch(selectableStatus, newVal => {
  selectableStatus.value = newVal
  emit('update:modelValueSelectableStatus', newVal)
})

const onUpdateSearch = (event) => {
  const newValue = event.target.value
  emit('update:modelValueSearch', newValue)
}
</script>

<template>
  <VCard class="mb-4">
    <VCardText>
      <VRow>
        <VCol
          md="6"
        >
          <div v-if="props.filterCards.filterStatus">
            <AppSelect
              v-model="selectableStatus" 
              label="Estados"
              placeholder="Seleccionar Estado"
              chips
              multiple
              closable-chips
              :items="props.estado"
              clearable
              clear-icon="tabler-x"
            />
          </div>
        </VCol>
        <VCol
          md="6"
        >
          <div v-if="props.filterCards.searchInput">
            <AppTextField
              v-model="search"
              label="Buscar"
              density="compact" 
              placeholder="Buscar..."
              append-inner-icon="tabler-search"
              single-line
              hide-details
              dense
              outlined
              @input="onUpdateSearch"
            />
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
