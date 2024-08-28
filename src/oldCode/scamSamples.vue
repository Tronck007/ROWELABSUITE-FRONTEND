<!-- eslint-disable camelcase -->
<script setup>
import {
useCatalogStore,
useProcessStore,
useTestStore,
} from "@/stores/app/control_lab_traceability";
import ExpandedRow from "../components/table.vue";

const props = defineProps({
  seccion: {
    type: String,
    default: "Form",
  },
  typeButton: {
    type: String,
    default: "trash",
  },
  headers: {
    type: Array,
  },
  data: {
    type: Object,
    default: [],
  },
  tabs: {
    type: Number,
    default: 0,
  },
})

const processStore = useProcessStore()
const catalogStore = useCatalogStore()
const testStore = useTestStore()

const catalogTest = computed(() => {
  const element = reactive([])

  element.value = catalogStore.catalog_test
  
  return element.value
})

const catalog_equipment = computed(() => {
  const element = reactive([])

  element.value = catalogStore.catalog_equipment
  
  return element.value
})

const area = ref("dialog")

const fieldsConfig = [
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

const date = ref([])
const time = ref([])
const hora = ref([])
const minutos = ref([])

watch(
  () => props.tabs,
  async newVal => {
    if (newVal === 1 || newVal === 2 || newVal === 3) {
      const { quality_order_number, quality_test_group_id, samples } =
        props.data

      await catalogStore.getCatalogTestById(quality_test_group_id)
      items.value = samples.map(item => {
        return {
          // Usa el valor de item si está disponible; de lo contrario, usa el valor de props.data.
          quality_order_number:
            item.quality_order_number ?? quality_order_number,
          quality_test_group_id:
            item.quality_test_group_id ?? quality_test_group_id,
          sampling_id: item.sampling_id,
        }
      })

      // Continúa con la lógica para actualizar items.value aquí
    }
  },
)

const seccion = computed(() => {
  if (props.tabs === 0) {
    return 0
  }
  if (props.tabs === 1) {
    return 1
  }
  if (props.tabs === 2) {
    return 2
  }
  if (props.tabs === 3) {
    return 3
  }
})

const samples = ref()
const equipment = ref()

const items = ref([])
const editIcon = ref(true)

/**
 * Función que se ejecuta al presionar la tecla Enter en el campo de muestras.
 * @param {string} samples - Las muestras ingresadas.
 * @returns {Promise<void>} - Promesa que no devuelve ningún valor.
 */
const pressEnterSample = async samples => {
  await processStore.fetchSamplesById(samples)

  // Función auxiliar para verificar si todos los elementos tienen el mismo quality_test_group_id
  const allHaveSameQualityTestId = (newSamples, existingSample) => {
    // Si existingSample no está definido, asumimos true ya que no hay con qué comparar
    if (!existingSample) return true
    
    return newSamples.every(
      sample =>
        sample.quality_test_group_id === existingSample.quality_test_group_id,
    )
  }

  // Determina si processStore.samples es un objeto individual o un arreglo
  const newSamples = Array.isArray(processStore.samples)
    ? processStore.samples
    : [processStore.samples]

  // Verifica si newSamples es válido y no está vacío
  if (newSamples.length > 0) {
    // Obtiene el primer sample de data.value para comparación
    const existingSample = items.value.length > 0 ? data.value[0] : undefined

    if (allHaveSameQualityTestId(newSamples, existingSample)) {
      // Si newSamples está vacío o todos coinciden en quality_test_group_id, añade los samples a data.value
      items.value.push(...newSamples)
    } else {
      // Si hay discrepancia, muestra un mensaje
      console.log(
        "Los nuevos samples no coinciden en quality_test_group_id con los existentes y no se agregaron",
      )
    }
  } else {
    // Si newSamples no es válido o está vacío, maneja este caso adecuadamente
    console.log("No se encontraron samples válidos para agregar.")
  }

  clearSamples()
}

const clearSamples = () => {
  samples.value = ""
}

const handleDelete = item => {
  console.log("Delete", item)
}

const handleSendTest = async () => {
  const input = {
    process_generated_id: props.data.process_generated_id,
    samples: samples.value,
    equipment: equipment.value,
    hora: hora.value,
    minutos: minutos.value,
  }

  testStore.createTestprocess(input)
}

const handleSend = async () => {
  if (props.data.length !== 0) {
    console.log("Agregar")

    const id = props.data.process_generated_id

    await processStore.aggregateSamplesProcess(id, items.value)
  } else {
    console.log("Crear")
    await processStore.createNewProcess(data.value)
  }

  items.value = []
}
</script>

<template>
  <VRow
    v-if="seccion === 0"
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
        clearable
        @keyup.enter="pressEnterSample(samples)"
      />
    </VCol>
  </VRow>
  <VRow
    v-if="seccion === 5"
    align="center"
    justify="center"
    dense
  >
    <VCol
      cols="12"
      md="12"
    >
      <AppSelect
        v-model="samples"
        label="Catalogo de pruebas"
        multiple
        :items="catalogTest"
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
  </VRow>

  <VRow
    v-if="seccion === 1"
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
        :items="catalog_equipment"
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
        v-model="samples"
        label="Catalogo de pruebas"
        multiple
        :items="catalogTest"
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

    <!--
      <VCol cols="12" md="12">
      <div class="d-flex justify-end mt-4 mb-6">
      <VBtn type="submit">
      <VIcon start icon="tabler-send" />
      ENVIAR
      </VBtn>
      </div>
      </VCol> 
    -->
  </VRow>

  <VRow
    v-if="seccion === 2"
    align="center"
    justify="center"
    dense
  >
    <VCol
      cols="12"
      md="12"
    >
      <AppSelect
        v-model="equipment"
        label="Catalogo de Equipos Reservar"
        :items="catalog_equipment"
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
    <VCol cols="4">
      <AppDateTimePicker
        v-model="date"
        v-model:return-value="date"
        :nudge-right="40"
        auto-apply
        persistent
        label="Fecha"
        placeholder="Seleccionar Fecha"
      />
    </VCol>
    <VCol cols="4">
      <AppCombobox
        v-model="time"
        label="Tiempo"
        type="time"
        placeholder="00:00"
        auto-apply
        persistent
      />
    </VCol>
    <VCol cols="2">
      <AppTextField
        v-model="hora"
        label="Hora"
        type="number"
        placeholder="00"
        single-line
      />
    </VCol>
    <VCol cols="2">
      <AppTextField
        v-model="minutos"
        label="Minutos"
        type="number"
        placeholder="00"
        single-line
      />
    </VCol>

    <VCol
      cols="12"
      md="12"
    >
      <div class="d-flex justify-end mt-4 mb-6">
        <VBtn type="submit">
          <VIcon
            start
            icon="tabler-calendar"
          />
          RESERVAR
        </VBtn>
      </div>
    </VCol>
  </VRow>

  <VRow v-if="seccion === 1 || seccion === 0">
    <VCol
      cols="12"
      md="12"
    >
      <ExpandedRow
        :items="items"
        :colspan="fieldsConfig.length"
        :fields-config="fieldsConfig"
        :area="area"
        @eliminar-process="handleDelete"
      />
    </VCol>
    <VCol
      cols="12"
      md="12"
    >
      <div class="d-flex justify-end mt-4 mb-6">
        <VBtn
          v-if="seccion === 1"
          type="submit"
          :disabled="data.length === 0"
          @click="handleSendTest"
        >
          <VIcon
            start
            icon="tabler-send"
          />
          ENVIAR MUESTRAS
        </VBtn>
        <VBtn
          v-else
          type="submit"
          :disabled="data.length === 0"
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
</template>
