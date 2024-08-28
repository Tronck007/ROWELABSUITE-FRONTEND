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
        label="Listado de Equipo"
        :items="equipmentItems" 
        item-title="combined_field"
        item-value="equipment_name"
        prepend-inner-icon="tabler-report"
        persistent-hint
        return-object
        search
        single-line
        placeholder="Listado de Equipo"
        clearable
      />
      <AppAutocomplete
        v-model="typeEndSelect"
        label="Tipo de Finalización"
        :items="typeEnd"  
        persistent-hint
        search
        single-line
        placeholder="Tipo de Finalización"
        clearable
      />
      <AppCombobox
        v-model="locationSelect"
        label="Ubicación"
        :items="location" 
        persistent-hint
        return-object
        search
        single-line
        placeholder="Ubicación"
        clearable
      />
      <AppAutocomplete
        v-model="modeUseSelect"
        label="Modo de Uso"
        :items="modeUse" 
        persistent-hint
        return-object
        search
        single-line
        placeholder="Modo de Uso"
        clearable
      /> 
    </VCol>
    <!-- Botón para enviar la reservación -->
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
</template>

<script setup>
import { useEquipmentStore } from '@/stores/apps/control-labs-traceability/boardEquipment'

const  equipmentStore = useEquipmentStore()


const equipment = ref(null)
const equipmentItems = ref([])
const typeEndSelect = ref(null)
const typeEnd = ref(["manual", "automática"])
const modeUseSelect = ref(null)
const modeUse= ref(["único-usuario", "multiples-usuarios"])
const locationSelect = ref(null)
const location= ref(["FQ", "MB"])




const fetchData = async () => {
  try {
    await equipmentStore.fetchCatalogAllEquipment()
    equipmentItems.value = equipmentStore.combined
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}


const handleSend = () => {
  console.log(equipment)
  console.log(typeEndSelect)
  console.log(locationSelect)
  console.log(modeUseSelect)
}

onMounted(() => {
  fetchData()
})

// Watch para verificar cuando se selecciona un equipo
watch(equipment, async newEquipment => {
  if (newEquipment) {
    try {
      await equipmentStore.fetchAllEquipmentStatus()

      const existingEquipment = equipmentStore.originalData.find(
        item => item.equipment_name === newEquipment.equipment_name,
      )

      if (existingEquipment) {
        notify('addition', 'duplicate') // Notificación de equipo duplicado
        equipment.value = null
      } else {
        notify('findInfo', 'ok') // Notificación de equipo no encontrado
      }
    } catch (error) {
      notify('findInfo', 'fail') // Notificación de error en la verificación
    }
  }
})
</script>
