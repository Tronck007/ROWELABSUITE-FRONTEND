<!-- eslint-disable camelcase -->
<script setup>
import { useCatalogStore, useDialogStore, useReservationStore } from '@/stores/apps/control-labs-traceability';



const catalogStore = useCatalogStore()
const dialogStore = useDialogStore()
const reservationStore = useReservationStore()

const currentProcess = computed(() => dialogStore.currentProcess)

const equipment = ref(null)
const date = ref([])
const time = ref([])
const hora = ref([])
const minutos = ref([])


const handleSend = async () => {
  const processId = currentProcess.value.process_code
  
  const dataToSend = {
    equipment: equipment.value,
    date: date.value,
    time: time.value,
    hora: parseInt(hora.value) || 0, // Default a 0 si no es un número
    minutos: parseInt(minutos.value) || 0, // Default a 0 si no es un número
  }

  try {
    reservationStore.createReservation(processId, dataToSend)
    equipment.value = null
    date.value = null
    time.value = null
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
        <VBtn
          type="submit"
          @click="handleSend"
        >
          <VIcon
            start
            icon="tabler-calendar"
          />
          RESERVAR
        </VBtn>
      </div>
    </VCol>
  </VRow>
</template>
