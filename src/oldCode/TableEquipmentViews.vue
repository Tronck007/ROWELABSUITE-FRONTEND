<!-- eslint-disable vue/v-on-event-hyphenation -->
<!-- eslint-disable vue/v-on-event-hyphenation -->

<script setup>
import { computed, defineProps, ref } from "vue"
import { useRouter } from "vue-router"

import {
useDialogStore,
useTestAndEquipment,
} from "@/stores/apps/control-labs-traceability"
import { VDataTable } from "vuetify/labs/VDataTable"
import Dialog from "../components/Dialog.vue"
import HeaderCard from "../components/HeaderCard.vue"

const props = defineProps({
  tableConfig: {
    type: Object,
    required: true,
  },
})

const dialogStore = useDialogStore()
const testAndEquipmentStore = useTestAndEquipment()


const{ transformedDataActive, transformedDataInactive } = testAndEquipmentStore

console.log('transformedDataActive', transformedDataActive)
console.log('transformedDataInactive', transformedDataInactive)


const router = useRouter()

const selectableStatus = ref([])
const search = ref("")
const isDialogVisible = ref(false)

const expandedRows = ref([])
const actionClicked = ref(false)

const closeDialog = () => {
  isDialogVisible.value = false
}

// Define tus funciones de manejo aquí
const handleEdit = item => {
  console.log("Editing item:", item)
  dialogStore.openDialogWithActionId([1, 2, 3])
  isDialogVisible.value = true
}

const handleDelete = item => {
  console.log("Deleting item:", item)

  // Aquí iría tu lógica para eliminar un ítem
}

const handleEndProcess = item => {
  console.log("End Process item:", item)

  // mostrarAlertaConfirmacion('¿Estás seguro de finalizar el proceso?', '¡Muy Bien 😎👍!', () => {

  //   const id = item.id  
    
  //   processStore.endProcess(id)

  // })
}

const handleCheck = item => {
  console.log("Checking item:", item)

  // Aquí iría tu lógica para verificar un ítem
}

const handleGoTo = item => {
  if (props.tableConfig.expandedRows) {
    router.push({
      name: "samplesProcess",
      params: { id: item.process_generated_id },
    })
  }else {

  }
  console.log("Going to item:", item)
}

// Mapeo de estado a texto para la presentación en la interfaz
const statusTextMap = {
  1: "Creado",
  2: "En Proceso",
  3: "Revisado",
  4: "Completado",
  5: "En Espera",
  6: "Cancelado",
  7: "Rechazado",
  8: "Aprobado",
}

// Inversión del mapeo de estado a texto para facilitar la búsqueda por nombre de estado
const idTextMap = Object.entries(statusTextMap).reduce((acc, [key, value]) => {
  acc[value] = key

  return acc
}, {})

// Computada para filtrar datos basados en la búsqueda y el estado seleccionado
const filteredData = computed(() => {  

  console.log('props.tableConfig.data', props.tableConfig.data[0].tests_in_process)

  return props.tableConfig.data[0].tests_in_process
    
  
  
})

// Función para dar estados de color y texto basado en el ID de estado
const estadosDisponibles = computed(() => {
  const idsUnicos = new Set(
    props.tableConfig.data.map(item => item.entity_lifecycle_id),
  )

  // Si solo quieres los textos como un array de strings
  return Array.from(idsUnicos).map(
    id => statusTextMap[id] || "Estado Desconocido",
  )
})
</script>

<template>
  <Dialog
    :is-dialog-visible="isDialogVisible"
    @update:isDialogVisible="closeDialog"
  />
  <VCard class="mb-4">
    <HeaderCard :items="props.tableConfig.data" />
  </VCard>
  <VDataTable
    :headers="props.tableConfig.headers.main"
    :items="filteredData"
    :items-per-page="5"
    class="rounded-lg elevation-1"
  >
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
      
    <template #item.entity_lifecycle_id="{ item }">
      <VChip
        :color="resolveStatusVariant(item.entity_lifecycle_id).color"
        size="small"
      >
        {{ resolveStatusVariant(item.entity_lifecycle_id).text }}
      </VChip>
    </template>
    <!-- Actions -->
    <template #item.actions="{ item }">
      <div class="d-flex gap-1">
        <IconBtn @click="editItem(item)">
          <VIcon icon="tabler-edit" />
        </IconBtn>
        <IconBtn @click="deleteItem(item)">
          <VIcon icon="tabler-trash" />
        </IconBtn>
      </div>
    </template>
  </VDataTable>
</template>

