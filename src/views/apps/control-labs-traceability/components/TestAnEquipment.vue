<!-- eslint-disable vue/valid-attribute-name -->
<!-- eslint-disable camelcase -->
<script setup>
import { useCatalogStore, useDialogStore, useTestAndEquipment } from '@/stores/apps/control-labs-traceability';
import { computed, ref } from 'vue';
import { VDataTable } from "vuetify/labs/VDataTable";

const catalogStore = useCatalogStore()
const dialogStore = useDialogStore()
const testAndEquipmentStore = useTestAndEquipment()

const currentProcess = computed(() => dialogStore.currentProcess)
const test = ref(null)
const equipment = ref(null)
const hora = ref(null)
const minutos = ref(null)
const samples = ref(currentProcess.value.samples)
const samplesSelected = ref([])

const dataTable = computed(() => {
  let index = 0
  
  return samples.value.map(item => {
    return {
      id: ++index,
      sampling_id: item.sampling_id,
      item_id: item.item_id,
      item_batch_id: item.item_batch_id,
    }
  })
})

const headers = [
  { title: 'MUESTRAS', key: 'sampling_id' },
  { title: 'ARTÍCULOS', key: 'item_id' },
  { title: 'LOTES', key: 'item_batch_id' },
]

const handleSend = async () => {
  const processId = currentProcess.value.process_code
  const selectedSamples = dataTable.value.filter(item => samplesSelected.value.includes(item.id))

  // Crear un array de objetos, cada uno con un 'sampling_id'
  const sampleIDs = selectedSamples.map(item => {
    return { sampling_id: item.sampling_id }
  })


  const dataToSend = {
    equipment: equipment.value,
    test: test.value,
    hora: parseInt(hora.value) || 0, // Default a 0 si no es un número
    minutos: parseInt(minutos.value) || 0, // Default a 0 si no es un número
    samples: sampleIDs,
  }

  try {
    await testAndEquipmentStore.createTestProcess(processId, dataToSend)
    samplesSelected.value = []
    equipment.value = null
    test.value = null
    hora.value = null
    minutos.value = null
    
  } catch (error) {
    console.log('Error:', error)

    // Manejo de errores (podrías agregar notificaciones o logs aquí)
  }
}
</script>

<template>
  <VRow
    align="center"
    justify="center"
    dense
  >
    <VCol
      cols="12"
      md="12"
    >
      <AppCombobox
        v-model="equipment"
        label="Catalogo de Equipos"
        :items="catalogStore.catalogEquipment"
        item-title="combined"
        item-value="object_id"
        prepend-inner-icon="tabler-tools"
        persistent-hint
        return-object
        search
        single-line
        placeholder="Seleccionar las Equipos"
        clearable
      />
    </VCol>
    <VCol
      cols="12"
      md="12"
    >
      <AppSelect
        v-model="test"
        label="Catalogo de pruebas"
        multiple
        :items="catalogStore.catalogTest"
        item-title="test_desc"
        item-value="quality_test_id"
        prepend-inner-icon="tabler-test-pipe"
        persistent-hint
        return-object
        search
        single-line
        placeholder="Seleccionar las Pruebas"
        clearable
      />
    </VCol>

    <VCol cols="6">
      <AppTextField
        v-model="hora"
        label="Hora"
        type="number"
        placeholder="00"
        single-line
      />
    </VCol>
    <VCol cols="6">
      <AppTextField
        v-model="minutos"
        label="Minutos"
        type="number"
        placeholder="00"
        single-line
      />
    </VCol>    
  </VRow>
  <VRow
    align="center"
    justify="center"
    dense
  >
    <VCol
      cols="12"
      md="12"
    >
      <VDataTable
        v-model="samplesSelected"
        :headers="headers"
        :items="dataTable"
        :items-per-page="5"
        show-select
      >
        <!-- full name -->
        
        <template #item:="{ item }">
          <div class="d-flex align-center">
            <div class="d-flex flex-column ms-3">
              <span class="d-block font-weight-medium title-high-emphasis title-truncate">{{ item.sampling_id }}</span>
            </div>
          </div>
        </template>     
      </VDataTable>
    </VCol>
  </VRow>
  <VRow>
    <VRow>
      <VCol
        cols="12"
        md="12"
      >
        <div class="d-flex justify-end mt-4 mb-6">        
          <VBtn
     
            type="submit"
        
            @click="handleSend"
          >
            <VIcon
              start
              icon="tabler-send"
            />
            ENVIAR
          </VBtn>
        </div>
      </VCol>
    </VRow>
  </vrow>
</template>
