<!-- eslint-disable camelcase -->
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
        item-value="qualityTestId"
        prepend-inner-icon="tabler-test-pipe"
        persistent-hint
        return-object
        search
        single-line
        placeholder="Seleccionar las Pruebas"
        clearable
      />
    </VCol>
    <VCol
      cols="12"
      md="12"
    >
      <AppSelect
        v-model="JustificationTest"
        label="Justificación de la Prueba"  
        :items="items"
        item-title="testDesc"
        item-value="qualityTestId"
        prepend-inner-icon="tabler-info-square-rounded"
        persistent-hint
        return-object
        search
        single-line
        clearable
      />
    </VCol>

    <VCol
      cols="12"
      md="12"
      v-if="isOtherSelected"
    >
      <AppTextarea
        v-model="comment"
        label="Comentario"
        placeholder="Placeholder Text"
        :rules="[commentRule]"
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
            :disabled="!isFormValid"
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
  </VRow>
</template>

<script setup>

import { useCatalogStore, useDialogStore, useTestAndEquipment } from '@/stores/apps/control-labs-traceability'
import { computed, ref, watch } from 'vue'
import { VDataTable } from "vuetify/labs/VDataTable"

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
const comment = ref("")

const JustificationTest = ref({ qualityTestId: 1, testDesc: "Análisis Inicial" })  // Inicializado como un array vacío

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

const items = [
  { qualityTestId: 1, testDesc: "Análisis Inicial" },
  { qualityTestId: 2, testDesc: "Evaluación de segundo criterio" },
  { qualityTestId: 3, testDesc: "Evaluación de tercer criterio" },
  { qualityTestId: 4, testDesc: "Error de Calibración del equipo" },
  { qualityTestId: 5, testDesc: "Error en el Procedimientos de muestreo" },
  { qualityTestId: 6, testDesc: "Error en las Condiciones operativas" },
  { qualityTestId: 7, testDesc: "Error en los Datos Cromatográficos" },
  { qualityTestId: 8, testDesc: "Errores de Método" },
  { qualityTestId: 9, testDesc: "Mantenimiento y limpieza" },
  { qualityTestId: 10, testDesc: "Errores de Entrada manual" },
  { qualityTestId: 11, testDesc: "Errores de Eventos no rutinarios" },  
  { qualityTestId: 0, testDesc: "Otros" }, 
]

const isOtherSelected = ref(false)

const commentRule = (value) => {
  if (isOtherSelected.value && !value) {
    return "El comentario es obligatorio cuando se selecciona 'Otros'."
  }
  return true
};

const isFormValid = computed(() => {
  return (
    equipment.value !== null &&
    test.value !== null &&
    (hora.value !== null || minutos.value !== null) &&
    (isOtherSelected.value ? comment.value.trim() !== "" : true)
  )
})


const handleSend = async () => {
  const processId = currentProcess.value.process_code
  const selectedSamples = dataTable.value.filter(item => samplesSelected.value.includes(item.id))

  const sampleIDs = selectedSamples.map(item => {
    return { sampling_id: item.sampling_id }
  })

  if (JustificationTest.value.qualityTestId !== 0) {
    comment.value = JustificationTest.value.testDesc;  // Asignar JustificationTest a comment si qualityTestId no es 0
  }

  const dataToSend = {
    equipment: equipment.value,
    test: test.value,
    hora: parseInt(hora.value) || 0,
    minutos: parseInt(minutos.value) || 0,
    samples: sampleIDs,
    comment: comment.value,
  }

  try {
    if (isOtherSelected.value && !comment.value) {
      notify('creation', 'empty');  // Mostrar notificación de error
      return; // Detener la ejecución si no se ha proporcionado el comentario
    }

    await testAndEquipmentStore.createTestProcess(processId, dataToSend)
    samplesSelected.value = []
    equipment.value = null
    test.value = null
    hora.value = null
    minutos.value = null
    comment.value = ""
    
  } catch (error) {
    console.log('Error:', error)
    // Manejo de errores (podrías agregar notificaciones o logs aquí)
  }
}

// Añadir un watch para depuración si es necesario
watch(JustificationTest, (newVal) => {
  console.log("JustificationTest cambiado:", newVal)
  if (newVal.qualityTestId === 0) {
    isOtherSelected.value = true
  } else {
    isOtherSelected.value = false
  }
})
</script>
