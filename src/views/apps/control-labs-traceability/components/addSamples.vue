<!-- eslint-disable sonarjs/no-identical-functions -->
<!-- eslint-disable camelcase -->
<!-- eslint-disable sonarjs/no-extra-arguments -->
<template>
  <VRow align="center" justify="center" dense>
    <VCol cols="12" md="12">
      <AppTextField
        v-model="samples"
        prepend-inner-icon="tabler-qrcode"
        placeholder="MUES"
        @keyup.enter="pressEnterSample"
        @blur="adjustSampleValue"
      />
    </VCol>
  </VRow>
  <VRow align="center" justify="center" dense>
    <VCol cols="12" md="12">
      <TableBasic
        :items="items"
        :colspan="colspan"
        :sub-headers="SubHeaders"
        :button-configs="buttonConfigs"
        :loading="false"
      />
    </VCol>
    <VCol cols="12" md="12">
      <div class="d-flex justify-end mt-4 mb-6">
        <VBtn type="submit" @click="handleSubmit" :disabled="isButtonDisabled">
          <VIcon start icon="tabler-send" />
          ENVIAR
        </VBtn>
      </div>
    </VCol>
  </VRow>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDialogStore, useProcessStore } from "@/stores/apps/control-labs-traceability"
import TableBasic from "../../components/TableBasic.vue"

// Instancia de los stores utilizados
const processStore = useProcessStore()
const dialogStore = useDialogStore()

// Referencias computadas y reactivas
const SubHeaders = computed(() => processStore.SubHeaders)
const currentProcess = computed(() => dialogStore.currentProcess)
const samples = ref("") // Almacenará la entrada de muestras
const items = ref([]) // Almacena las muestras procesadas
const colspan = ref(10) // Configuración de colspan para uso en la tabla
const isButtonDisabled = computed(() => items.value.length === 0)

// Configuración de los botones para la tabla
const buttonConfigs = {
  showEdit: false,
  showDelete: true,
  showCheck: false,
  showGoto: false,
}

// Función para ajustar el valor de muestras a 15 caracteres
const adjustSampleValue = () => {
  if (!samples.value) {
    return
  }

  const prefix = "MUES-A"
  let value = samples.value

  if (!value.startsWith(prefix)) {
    value = prefix + value
  }

  const inputPart = value.slice(prefix.length)
  const paddedPart = inputPart.padStart(15 - prefix.length, "0").slice(-10)
  samples.value = prefix + paddedPart
};

// Función para agregar muestras y evitar duplicados
const pressEnterSample = async () => {
  adjustSampleValue() // Asegurarse de que el valor esté ajustado antes de enviar

  if (!samples.value) {
    return // No hacer nada si el campo está en blanco
  }

  await processStore.fetchSamplesById(samples.value)

  const newSamples = Array.isArray(processStore.samples) ? processStore.samples : [processStore.samples]
  if (newSamples.length === 0) {
    notify('addition', 'empty')
    return;
  }

  const existingSample = items.value.length > 0 ? items.value[0] : undefined
  if (!allHaveSameQualityTestId(newSamples, existingSample)) {
    notify('addition', 'fail')
    return;
  }

  const uniqueSamples = newSamples.filter(isSampleUnique)
  if (uniqueSamples.length === 0) {
    notify('addition', 'duplicate')
    return;
  }

  items.value.push(...uniqueSamples)
  clearSamples()
};

// Verificar si todas las muestras tienen el mismo quality_test_group_id
const allHaveSameQualityTestId = (newSamples, existingSample) => {
  if (!existingSample) return true
  return newSamples.every(sample => sample.quality_test_group_id === existingSample.quality_test_group_id)
};

// Verificar si la muestra es única
const isSampleUnique = (sample) => !items.value.some(existingSample => existingSample.sampling_id === sample.sampling_id)

// Función para limpiar el input de muestras
const clearSamples = () => {
  samples.value = ""
};

// Función para crear nuevo proceso
const createProcess = async () => {
  if (items.value.length === 0) {
    notify('creation', 'empty')
    return;
  }

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

  try {
    await processStore.createNewProcess(processData)
    items.value = []
  } catch (error) {
    // Manejo de errores
  }
}

// Función para agregar muestras al proceso existente
const aggregateSamples = async () => {
  if (items.value.length === 0) {
    notify('creation', 'empty')
    return;
  }

  const processId = currentProcess.value.process_code
  const processData = {
    aggregate: items.value.map(sample => ({
      sampling_id: sample.sampling_id,
      item_id: sample.item_id,
      item_desc: sample.item_desc,
      item_batch_id: sample.item_batch_id,
    })),
  }

  try {
    await processStore.aggregateSamplesProcess(processId, processData.aggregate)
    items.value = []
  } catch (error) {
    // Manejo de errores
  }
}

// Función para manejar la acción de submit
const handleSubmit = () => {
  if (dialogStore.openBySection === 'samples') {
    createProcess()
  } else if (dialogStore.openBySection === 'reservation') {
    // Manejo específico para la sección de reservación
  } else {
    aggregateSamples()
  }

  dialogStore.openBySection = null
};
</script>
