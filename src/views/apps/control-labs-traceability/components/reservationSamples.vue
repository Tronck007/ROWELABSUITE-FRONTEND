<!-- eslint-disable -->
<script setup>
import { useCatalogStore, useDialogStore, useReservationStore } from '@/stores/apps/control-labs-traceability'

// Instancias de las tiendas
const catalogStore = useCatalogStore()
const dialogStore = useDialogStore()
const reservationStore = useReservationStore()

// Variables reactivas y computadas
const currentProcess = computed(() => dialogStore.currentProcess)

const equipment = ref(null)    // Equipo seleccionado
const date = ref([])           // Fecha seleccionada
const time = ref([])           // Tiempo seleccionado
const hora = ref([])           // Hora seleccionada
const minutos = ref([])        // Minutos seleccionados

// Función para manejar el envío de la reservación
const handleSend = async () => {
  const processId = currentProcess.value.process_code
  
  const dataToSend = {
    equipment: equipment.value,
    date: date.value,
    time: time.value,
    hora: parseInt(hora.value) || 0,    // Convertir a número, por defecto 0 si no es válido
    minutos: parseInt(minutos.value) || 0, // Convertir a número, por defecto 0 si no es válido
  }

  try {
    // Enviar los datos al store de reservación
    await reservationStore.createReservation(processId, dataToSend)
    
    // Limpiar los campos después de enviar
    equipment.value = null
    date.value = null
    time.value = null
    hora.value = null
    minutos.value = null
    
  } catch (error) {
    console.log('Error:', error)
    // Manejo de errores (puedes agregar notificaciones o logs aquí)
  }
}
</script>

<template>
  <VRow align="center" justify="center" dense>
    <!-- Combobox para seleccionar el equipo -->
    <VCol cols="12" md="12">
      <AppCombobox
        v-model="equipment"
        label="Catálogo de Equipos"
        :items="catalogStore.catalogEquipment"
        item-title="combined"
        item-value="object_id"
        prepend-inner-icon="tabler-tools"
        persistent-hint
        return-object
        search
        single-line
        placeholder="Seleccionar los Equipos"
        clearable
      />
    </VCol>

    <!-- Selector de fecha -->
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

    <!-- Selector de tiempo -->
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

    <!-- Campo de texto para la hora -->
    <VCol cols="2">
      <AppTextField
        v-model="hora"
        label="Hora"
        type="number"
        placeholder="00"
        single-line
      />
    </VCol>

    <!-- Campo de texto para los minutos -->
    <VCol cols="2">
      <AppTextField
        v-model="minutos"
        label="Minutos"
        type="number"
        placeholder="00"
        single-line
      />
    </VCol>

    <!-- Botón para enviar la reservación -->
    <VCol cols="12" md="12">
      <div class="d-flex justify-end mt-4 mb-6">
        <VBtn type="submit" @click="handleSend">
          <VIcon start icon="tabler-calendar" />
          RESERVAR
        </VBtn>
      </div>
    </VCol>
  </VRow>
</template>

