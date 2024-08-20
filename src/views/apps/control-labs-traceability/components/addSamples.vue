<template>
  <!-- Sección de la fila y columna para el checkbox -->
  <VRow align="end" justify="end" dense>
    <VCol cols="6" md="6">
      <VCheckbox
        v-model="SameMethod"
        label="Mismo sistema Cromatográfico"
        @change="handleSameMethodChange"
      />
    </VCol>
  </VRow>

  <!-- Componente de alerta dinámica -->
  <DynamicAlert
    :show="showAlert"
    :title="alertTitle"
    :message="alertMessage"
    :type="alertType"
    @close="handleAlertClose"
    @accept="handleAlertAccept"
    @cancel="handleAlertCancel"
  />

  <!-- Campo de texto para la muestra con icono y eventos -->
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

  <!-- Tabla para mostrar los elementos y botón de enviar -->
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

<!-- eslint-disable -->
<script setup>
import { ref, computed } from 'vue'
import { useDialogStore, useProcessStore } from "@/stores/apps/control-labs-traceability"
import TableBasic from "../../components/TableBasic.vue"
import DynamicAlert from "../../components/DynamicAlert.vue"

// Instancia de las tiendas
const processStore = useProcessStore()
const dialogStore = useDialogStore()

// Variables reactivas y computadas
const SubHeaders = computed(() => processStore.SubHeaders)
const currentProcess = computed(() => dialogStore.currentProcess)
const samples = ref("")
const SameMethod = ref(false)
const items = ref([])
const colspan = ref(10)
const isButtonDisabled = computed(() => items.value.length === 0)
const showAlert = ref(false)
const alertMessage = ref("")
const alertTitle = ref("")
const alertType = ref("")
const checkboxName = "Mismo sistema Cromatográfico"

// Configuración de botones
const buttonConfigs = {
  showEdit: false,
  showDelete: true,
  showCheck: false,
  showGoto: false,
}

// Manejo del cambio en el checkbox
const handleSameMethodChange = () => {
  if (SameMethod.value) {
    alertTitle.value = "Mismo sistema Cromatográfico activado"
    alertMessage.value = 'Se permitirá la adición de muestras de diferentes grupos de prueba de calidad.'
    alertType.value = "Warning"
    showAlert.value = true
  } else {
    alertMessage.value = ''
    showAlert.value = false
  }
}

// Manejo de cierre de la alerta
const handleAlertClose = () => {
  showAlert.value = false
}

// Manejo de aceptación de la alerta
const handleAlertAccept = () => {
  showAlert.value = false
}

// Manejo de cancelación de la alerta
const handleAlertCancel = () => {
  SameMethod.value = false
  showAlert.value = false
}

// Ajuste del valor de la muestra
const adjustSampleValue = () => {
  if (!samples.value) {
    return
  }

  const prefix = "MUES-A"
  let value = samples.value

  // Agregar el prefijo si no está presente
  if (!value.startsWith(prefix)) {
    value = prefix + value
  }

  // Ajustar el valor de la muestra
  const inputPart = value.slice(prefix.length)
  const paddedPart = inputPart.padStart(15 - prefix.length, "0").slice(-10)
  samples.value = prefix + paddedPart
}

// Manejo del evento Enter en el campo de muestra
const pressEnterSample = async () => {
  adjustSampleValue()

  if (!samples.value) {
    return
  }

  await processStore.fetchSamplesById(samples.value)

  const newSamples = Array.isArray(processStore.samples) ? processStore.samples : [processStore.samples]
  if (newSamples.length === 0) {
    return
  }

  const existingSample = items.value.length > 0 ? items.value[0] : undefined

  if (SameMethod.value && !allHaveSameQualityTestId(newSamples, existingSample)) {
    // Lógica adicional si el checkbox "Mismo sistema Cromatográfico" está activado
  }

  if (!SameMethod.value && !allHaveSameQualityTestId(newSamples, existingSample)) {
    return
  }

  const uniqueSamples = newSamples.filter(isSampleUnique)
  if (uniqueSamples.length === 0) {
    return
  }

  items.value.push(...uniqueSamples)
  clearSamples()
}

// Verifica si todas las muestras tienen el mismo ID de grupo de prueba de calidad
const allHaveSameQualityTestId = (newSamples, existingSample) => {
  if (!existingSample) return true
  return newSamples.every(sample => sample.quality_test_group_id === existingSample.quality_test_group_id)
}

// Verifica si la muestra es única
const isSampleUnique = (sample) => !items.value.some(existingSample => existingSample.sampling_id === sample.sampling_id)

// Limpia el campo de muestras
const clearSamples = () => {
  samples.value = ""
}

// Crea un nuevo proceso
const createProcess = async () => {
  if (items.value.length === 0) {
    return
  }

  const qualityOrderNumber = SameMethod.value ? items.value.map(item => item.quality_order_number).join(',') : items.value[0].quality_order_number
  const qualityTestGroupId = SameMethod.value ? items.value.map(item => item.quality_test_group_id).join(',') : items.value[0].quality_test_group_id

  const processData = {
    processData: {
      quality_order_number: qualityOrderNumber,
      quality_test_group_id: qualityTestGroupId,
      same_system_chromatographic: SameMethod.value,
      checkbox_name: checkboxName
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

// Agrega las muestras al proceso
const aggregateSamples = async () => {
  if (items.value.length === 0) {
    return
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

// Manejo del evento de enviar
const handleSubmit = () => {
  if (dialogStore.openBySection === 'samples') {
    createProcess()
  } else if (dialogStore.openBySection === 'reservation') {
    // Manejo específico para la sección de reservación
  } else {
    aggregateSamples()
  }

  dialogStore.openBySection = null
}

// Manejo de cancelación de la notificación
const handleNotificationCancel = () => {
  SameMethod.value = false
  showAlert.value = false
}
</script>
