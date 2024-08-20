<!-- eslint-disable -->
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
        label="Tipo"
        :items="equipmentItems" 
        item-title="combined"
        item-value="object_id"
        prepend-inner-icon="tabler-report"
        persistent-hint
        return-object
        search
        single-line
        placeholder="Seleccionar las tipo"
        clearable
      />
    </VCol>
    <VCol
      cols="12"
      md="12"
    >
      <AppCombobox
        v-model="equipment"
        label="Evento"
        :items="equipmentItems" 
        item-title="combined"
        item-value="object_id"
        prepend-inner-icon="tabler-speakerphone"
        persistent-hint
        return-object
        search
        single-line
        placeholder="Seleccionar las evento"
        clearable
      />
    </VCol>
    <VCol
      cols="12"
      md="12"
    >
      <AppCombobox
        v-model="equipment"
        label="Automatizar fin corrida"
        :items="equipmentItems" 
        item-title="combined"
        item-value="object_id"
        prepend-inner-icon="tabler-settings-automation"
        persistent-hint
        return-object
        search
        single-line
        placeholder="Seleccionar fin corrida"
        clearable
      />
    </VCol>
    <VCol
      cols="12"
      md="12"
    >
      <AppCombobox
        v-model="equipment"
        label="Falla / Alarma"
        :items="equipmentItems" 
        item-title="combined"
        item-value="object_id"
        prepend-inner-icon="tabler-alert-circle"
        persistent-hint
        return-object
        search
        single-line
        placeholder="Seleccionar la falla"
        clearable
      />
    </VCol>
    <VCol cols="8">
      <AppDateTimePicker
        v-model="selectedDate" 
        v-model:return-value="returnValue"
        :nudge-right="40"
        auto-apply
        persistent
        label="Corrida programada (Fecha de Finalización Automática)"
        placeholder="Seleccionar Fecha"
      />
    </VCol>

    <VCol cols="2">
      <AppTextField
        v-model="hours" 
        label="Hora"
        type="number"
        placeholder="00"
        single-line
      />
    </VCol>
    <VCol cols="2">
      <AppTextField
        v-model="minutes" 
        label="Minutos"
        type="number"
        placeholder="00"
        single-line
      />
    </VCol>
    <VCol
  cols="12"
  md="12">
    <AppTextarea
    prepend-inner-icon="tabler-message-2"
    placeholder="Texto con los detalles relacionados al paro del equipo..."
  />
  </VCol>
  

    <VCol
      cols="12"
      md="12"
    >
      <div class="d-flex justify-end mt-4 mb-6">
        <VBtn
          type="submit"
          @click="reserveEquipment" 
        >
          <VIcon
            start
            icon="tabler-calendar-event"
          />
          Enviar
        </VBtn>
      </div>
    </VCol>
  </VRow>
</template>

<!-- eslint-disable -->
<script setup>
import { ref } from 'vue';

const equipment = ref(null);
const equipmentItems = ref([]); // Inicializa la lista de equipos
const selectedDate = ref(null);
const returnValue = ref(null);
const selectedTime = ref(null);
const hours = ref(null);
const minutes = ref(null);

function reserveEquipment() {
  // Implementa la lógica para reservar el equipo
}
</script>
