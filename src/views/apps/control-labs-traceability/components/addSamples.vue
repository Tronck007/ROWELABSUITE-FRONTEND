<!-- eslint-disable sonarjs/no-identical-functions -->
<!-- eslint-disable camelcase -->
<!-- eslint-disable sonarjs/no-extra-arguments -->
<script setup>
import { useDialogStore, useProcessStore } from "@/stores/apps/control-labs-traceability";
import TableBasic from "../../components/TableBasic.vue";

// Instancia de los stores utilizados
const processStore = useProcessStore()
const dialogStore = useDialogStore()

// Referencias computadas y reactivas
const SubHeaders = computed(() => processStore.SubHeaders)
const currentProcess = computed(() => dialogStore.currentProcess)
const samples = ref() // Almacenará la entrada de muestras
const items = ref([]) // Almacena las muestras procesadas
const colspan = ref(10) // Configuración de colspan para uso en la tabla

// Configuración de los botones para la tabla
const buttonConfigs = {
  showEdit: false,
  showDelete: true,
  showCheck: false,
  showGoto: false,
}

//TODO: Ya esta funcionado correctamente
// Función para agregar muestras y evitar duplicados
const pressEnterSample = async samples => {

  await processStore.fetchSamplesById(samples)

  const allHaveSameQualityTestId = (newSamples, existingSample) => {
    if (!existingSample) return true
    
    return newSamples.every(sample => sample.quality_test_group_id === existingSample.quality_test_group_id)
  }

  const isSampleUnique = sample => !items.value.some(existingSample => existingSample.sampling_id === sample.sampling_id)



  const newSamples = Array.isArray(processStore.samples) ? processStore.samples : [processStore.samples]



  if (newSamples.length > 0) {
    const existingSample = items.value.length > 0 ? items.value[0] : undefined

    if (allHaveSameQualityTestId(newSamples, existingSample)) {

      const uniqueSamples = newSamples.filter(isSampleUnique)

      if (uniqueSamples.length > 0) {
        items.value.push(...uniqueSamples)
      } else {
        notify('addition', 'duplicate')
      }
    } else {
      notify('addition', 'fail') 
    }
  } else {
    notify('addition', 'empty')
  }

  clearSamples()
}

// Función para limpiar el input de muestras
const clearSamples = () => {
  samples.value = ""
}

// Función para crear nuevo proceso
const createProcess = async () => {
  if (items.value.length === 0) {
    // Notificar si no hay muestras para crear el proceso
    notify('creation', 'empty')
    
    return
  }
  
  // Preparar los datos para el nuevo proceso
  const processData = {
    processData: {
      quality_order_number: items.value[0].quality_order_number,
      quality_test_group_id: items.value[0].quality_test_group_id,
    },
    sampleProcessesData: items.value.map(sample => ({
      sampling_id: sample.sampling_id,
      item_id: sample.item_id,
      item_desc: sample.item_desc,
      item_batch_id: sample.item_batch_id,      
    })),
  }

  // Intentar crear el nuevo proceso
  try {    
    await processStore.createNewProcess(processData)
    items.value = [] // Limpiar las muestras después de crear el proceso
  } catch (error) {
    // Manejo de errores (podrías agregar notificaciones o logs aquí)
  }
}

// Función para agregar muestras al proceso existente
const aggregateSamples = async () => {
  if (items.value.length === 0) {
    // Notificar si no hay muestras para crear el proceso
    notify('creation', 'empty')
    
    return
  }


  const processId = currentProcess.value.process_code


  // Preparar los datos para el nuevo proceso
  const processData = {
    aggregate: items.value.map(sample => ({
      sampling_id: sample.sampling_id,
      item_id: sample.item_id,
      item_desc: sample.item_desc,
      item_batch_id: sample.item_batch_id,      
    })),
  }

  // Intentar crear el nuevo proceso
  try {    
    await processStore.aggregateSamplesProcess(processId, processData.aggregate)
    items.value = [] // Limpiar las muestras después de crear el proceso
  } catch (error) {
    // Manejo de errores (podrías agregar notificaciones o logs aquí)
  }
}

// Función para manejar la acción de submit
const handleSummit = () => {  
  if (dialogStore.openBySection === 'samples') {
    // Crear un nuevo proceso de muestra si se abre desde la sección de muestras
    createProcess()
  } else if (dialogStore.openBySection === 'reservation'){
    // Agregar muestras al proceso si se abre desde otra sección
    "Desde la reservacion de muestras"
   
  } else {
    aggregateSamples()
  }

  // Resetear el indicador de sección abierta en el dialogStore
  dialogStore.openBySection = null
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
      <AppTextField
        v-model="samples"
        prepend-inner-icon="tabler-qrcode"
        placeholder="MUES"
        @keyup.enter="pressEnterSample(samples)"
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
      <TableBasic
        :items="items"
        :colspan="colspan"
        :sub-headers="SubHeaders"
        :button-configs="buttonConfigs"
        :loading="false"
      />
    </VCol>
    <VCol
      cols="12"
      md="12"
    >
      <div class="d-flex justify-end mt-4 mb-6">
        <VBtn
          type="submit"
          @click="handleSummit"
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
</template>
