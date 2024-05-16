<!-- eslint-disable camelcase -->
<!-- eslint-disable vue/v-on-event-hyphenation -->
<!-- eslint-disable vue/v-on-event-hyphenation -->

<script setup>
import { mostrarAlertaConfirmacion } from '@/utils/sweetalert-utils'
import { computed, defineProps, ref } from "vue"
import { useRouter } from "vue-router"

import {
useCatalogStore,
useDialogStore,
useProcessStore,
useTestAndEquipment,
} from "@/stores/apps/control-labs-traceability"
import { VDataTable } from "vuetify/labs/VDataTable"
import Dialog from "../components/Dialog.vue"
import FilterCard from "../components/FilterCard.vue"
import SubTable from "../components/SubTable.vue"
import ActionButton from "../ui/ActionButton.vue"

const props = defineProps({
  tableConfig: {
    type: Object,
    required: true,
  },
})

const filterSubtables = props.tableConfig.filterSubtables



const dialogStore = useDialogStore()
const catalogStore = useCatalogStore()
const processStore = useProcessStore()
const testAndEquipmentStore = useTestAndEquipment()

const router = useRouter()

const selectableStatus = ref([])
const search = ref("")
const isDialogVisible = ref(false)

const expandedRows = ref([])
const actionClicked = ref(false)

const closeDialog = () => {
  isDialogVisible.value = false
}

const toggleRowExpansion = item => {
  const itemId = item.id // Asumiendo que cada ítem tiene un campo 'id'
  const index = expandedRows.value.indexOf(itemId)
  if (index > -1) {
    expandedRows.value.splice(index, 1)
  } else {
    expandedRows.value.push(itemId)
  }
}

const findTest = async id => {
  await catalogStore.getCatalogTestById(id)
}

// Define tus funciones de manejo aquí
const handleEdit = item => {
  findTest(item.quality_test_group_id)
  dialogStore.currentProcess = item
  dialogStore.openDialogWithActionId([1, 2, 3])
  isDialogVisible.value = true
}

const handleDelete = item => {  
  mostrarAlertaConfirmacion('¿Estás seguro?', '¡No podrás revertir esto!', () => {

    const id = item.id  
        
    processStore.deleteProcess(id)

  })
}

const handleCheck = item => {
  console.log("Checking item:", item)
}

const handleEndProcess = item => {
  console.log("End Process item:", item)

  if(item.equipment_name) {

    const { process_code, _id }= item

    mostrarAlertaConfirmacion('¿Estás seguro de finalizar el proceso?', '¡Muy Bien 😎👍!', () => {
      
      testAndEquipmentStore.endProcess(process_code, _id)

    })
  } else {
    mostrarAlertaConfirmacion('¿Estás seguro de finalizar el proceso?', '¡Muy Bien 😎👍!', () => {

      const id = item.id  
    
      processStore.endProcess(id)

    })
  }

 
}

const handleGoTo = item => {
  if (props.tableConfig.expandedRows) {
    router.push({
      name: "samplesProcess",
      params: { id: item.process_code },
    })
  }else {

  }
  console.log("Going to item:", item)
}

// Mapeo de estado a texto para la presentación en la interfaz
const statusTextMap = {
  "Created": "Creado",
  "In Process": "En Proceso",
  "Revisado": "Revisado",
  "Completed": "Completado",
  "On Hold": "En Espera",
  "Inactive": "Inactivo",
  "Rechazado": "Rechazado",
  "Aprobado": "Aprobado",
  "Activa": "Activa",
}

const filteredData = computed(() => {
  // Accede al valor interno de selectableStatus usando .value
  if (selectableStatus.value.length === 0) {
    return props.tableConfig.data
  } else {
    // Supongamos que statusTextMap mapea de 'Completado' a 'Completed'
    const selectedStates = selectableStatus.value.map(status => {
      // Mapea cada estado seleccionado a su valor correspondiente en inglés si es necesario
      return Object.keys(statusTextMap).find(key => statusTextMap[key] === status)
    }).filter(status => status) // Asegura que solo se incluyan valores válidos

    return props.tableConfig.data.filter(item => selectedStates.includes(item.state))
  }
})


// Función para dar estados de color y texto basado en el nombre del estado
const estadosDisponibles = computed(() => {
  const uniqueStates = new Set(props.tableConfig.data.map(item => item.state))
  
  return Array.from(uniqueStates).map(state => statusTextMap[state] || "Estado Desconocido")
})
</script>

<template>
  <FilterCard
    v-if="props.tableConfig.expandedRows"
    v-model:modelValueSelectableStatus="selectableStatus"
    v-model:modelValueSearch="search"
    :estado="estadosDisponibles"
    class="mb-4"
  />

  <VDataTable
    v-model:expanded="expandedRows"
    :expand-on-click="!actionClicked"
    :headers="props.tableConfig.headers.main"
   
    :items="filteredData"
    :search="search"
    :loading="props.tableConfig.isLoading"
    loading-text="Cargando..."
    
    class="rounded-lg elevation-1 mb-4 "
    @item-clicked="toggleRowExpansion"
  >
    <template #expanded-row="{ item }">
      <SubTable
        :items="item[filterSubtables]"
        :colspan="props.tableConfig.headers.main.length"
        :sub-headers="props.tableConfig.headers.sub"
        :button-configs="props.tableConfig.buttonConfigs.sub"
        :loading="props.tableConfig.isLoading"
      />
    </template>

    <template #item.state="{ item }">
      <VChip
        :color="resolveStatusVariant(item.state).color"
        size="small"
      >
        {{ resolveStatusVariant(item.state).text }}
      </VChip>
    </template>
    <template #item.actions="{ item }">
      <ActionButton
        :show-edit="props.tableConfig.buttonConfigs.main.showEdit"
        :show-delete="props.tableConfig.buttonConfigs.main.showDelete"
        :show-check="props.tableConfig.buttonConfigs.main.showCheck"
        :show-go-to-button="props.tableConfig.buttonConfigs.main.showGoto"
        :show-finish-button="props.tableConfig.buttonConfigs.main.showFinishButton"
        :go-to-page="props.tableConfig.goToPage"
        :disable-delete="expandedRows.includes(item.id)"
        @edit="handleEdit(item)"
        @delete="handleDelete(item)"
        @check="handleCheck(item)"
        @goTo="handleGoTo(item)"
        @finishProcess="handleEndProcess(item)"  
      />
    </template>
  </VDataTable>
  <Dialog
    :is-dialog-visible="isDialogVisible"
    @update:isDialogVisible="closeDialog"
  />
</template>

