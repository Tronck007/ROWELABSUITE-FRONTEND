<!-- eslint-disable camelcase -->
<!-- eslint-disable vue/no-unused-vars -->
<!-- eslint-disable vue/no-lone-template -->
<!-- eslint-disable vue/prop-name-casing -->
<script setup>
import { mostrarAlertaConfirmacion, mostrarAlertaExito } from '@/utils/sweetalert-utils';
import { VDataTable } from "vuetify/labs/VDataTable";

import ActionButton from "../ui/ActionButton.vue";

const { items, colspan, subHeaders, buttonConfigs, loading } = defineProps({
  items: Object,
  colspan: Number,
  subHeaders: Array,
  buttonConfigs: Object, 
  loading: Boolean, 
})

console.log('SubTable items:', items)


const resolveStatusVariant = is_active => {
  if (is_active) {
    
    return { color: "success", text: "Activo" }
  } else if (is_active === 7) {
    return { color: "warning", text: "Inactiva" }
  }
}

const handleDelete = item => {
  mostrarAlertaConfirmacion('¿Estás seguro?', '¡No podrás revertir esto!', () => {
    console.log('Delete clicked for Samples:', item)
    mostrarAlertaExito('El elemento ha sido eliminado.')
  })
}
</script>

<template>
  <tr class="v-data-table__tr">
    <td :colspan="colspan">
      <VDataTable
        :loading="loading"
        :colspan="colspan"
        :headers="subHeaders"
        :items="items"
        class="rounded-lg elevation-1"
      >
        <template #item.is_active="{ item }">
          <VChip
            :color="resolveStatusVariant(item.is_active).color"
            size="small"
          >
            {{ resolveStatusVariant(item.is_active).text }}
          </VChip>
        </template>
        <template #item.actions="{ item }">
          <ActionButton
            :show-edit="buttonConfigs.showEdit"
            :show-delete="buttonConfigs.showDelete"
            :show-check="buttonConfigs.showCheck"
            :show-go-to-button="buttonConfigs.showGoto"
            @delete="handleDelete(item)" 
          /> 
        </template> 
  

        <template #bottom>
          <VCardText class="pt-2">
            <div class="d-flex flex-wrap justify-center justify-sm-space-between gap-y-2 mt-2" />
          </VCardText>
        </template>
      </VDataTable>
    </td>
  </tr>
</template>
