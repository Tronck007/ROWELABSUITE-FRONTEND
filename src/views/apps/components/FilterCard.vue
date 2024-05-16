<script setup>
import { defineEmits, defineProps, ref, watch } from 'vue'

const props = defineProps({
  estado: Array,
  modelValueSelectableStatus: Array,
  modelValueSearch: String,
})

const emit = defineEmits(['update:modelValueSelectableStatus', 'update:modelValueSearch'])

// Inicializar refs vacíos
const selectableStatus = ref([])
const search = ref('')

// Observa cambios en las props para actualizar los estados locales si las props cambian externamente
watch(() => props.modelValueSelectableStatus, newVal => {
  selectableStatus.value = newVal
})

watch(() => props.modelValueSearch, newVal => {
  search.value = newVal
})


// Esto permite actualizar el estado en el componente padre basado en interacciones del usuario
watch(selectableStatus, newVal => {
  selectableStatus.value = newVal // Actualiza el estado local
  console.log('selectableStatus', selectableStatus.value) 
  emit('update:modelValueSelectableStatus', newVal) // Emite el cambio al padre
})

const onUpdateSearch = newVal => {
  // Accede al valor del evento de entrada
  const newValue = event.target.value

  // Ahora puedes usar newValue como necesites
  emit('update:modelValueSearch', newValue)
}
</script>

<template>
  <VCard class="mb-4">
    <VCardText>
      <VRow>
        <VCol
          cols="12"
          sm="6"
        >
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
        </VCol>
        <VCol
          cols="12"
          offset-md="3"
          md="3"
          class="mt-7"
        >
          <AppTextField
            v-model="search"
            density="compact" 
            placeholder="Buscar..."
            append-inner-icon="tabler-search"
            single-line
            hide-details
            dense
            outlined
            @input="onUpdateSearch"
          />
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
