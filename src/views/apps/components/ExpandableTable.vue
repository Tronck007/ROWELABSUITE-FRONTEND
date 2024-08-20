<!-- eslint-disable -->
<script setup>
import { ref, computed } from 'vue'
import { VDataTable } from "vuetify/labs/VDataTable"
import ActionButton from "../ui/ActionButton.vue"

// Definición de las propiedades recibidas desde el componente padre
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  headers: {
    type: Array,
    required: true,
  },
  buttonConfigs: {
    type: Object,
    default: () => ({
      showEdit: true,
      showDelete: true,
      showCheck: false,
      showGoto: false,
    }),
  },
  loading: {
    type: Boolean,
    default: false,
  },
  itemsPerPage: {
    type: Number,
    default: 5,
  },
  expandConfig: {
    type: Function,
    default: (item) => ({
      name: item.productName,
      unit: item.unit,
      exp: item.expiration_date,
    }),
  },
  fieldsToDisplay: {
    type: Array,
    default: () => [
      { label: 'Nombre', key: 'name' },
      { label: 'Unidad de Medida', key: 'unit' },
      { label: 'Fecha expiración', key: 'exp' }
    ],
  },
})

// Computed property para generar las filas expandibles con datos adicionales
const expandedRows = computed(() =>
  props.items.map(item => ({
    ...item,
    expandData: props.expandConfig(item),
  }))
)

// Definición de eventos emitidos
const emit = defineEmits(['remove-item'])

// Manejo del evento de eliminación
const handleDelete = (itemToDelete) => {
  emit('remove-item', itemToDelete)
}
</script>

<template>
  <!-- Tabla de datos con filas expandibles -->
  <VDataTable
    :headers="props.headers"
    :items="expandedRows"
    :items-per-page="props.itemsPerPage"
    expand-on-click
    :loading="props.loading"
  >
    <!-- Fila expandida que muestra datos adicionales -->
    <template #expanded-row="slotProps">
      <tr class="v-data-table__tr">
        <td :colspan="props.headers.length">
          <div v-for="field in props.fieldsToDisplay" :key="field.key">
            <p class="my-1">{{ field.label }}: {{ slotProps.item.expandData[field.key] }}</p>
          </div>
        </td>
      </tr>
    </template>
    
    <!-- Botones de acción en cada fila de la tabla -->
    <template #item.actions="{ item }">
      <ActionButton
        :show-edit="props.buttonConfigs.showEdit"
        :show-delete="props.buttonConfigs.showDelete"
        :show-check="props.buttonConfigs.showCheck"
        :show-go-to-button="props.buttonConfigs.showGoto"
        @delete="handleDelete(item)" 
      />
    </template>
  </VDataTable>
</template>
