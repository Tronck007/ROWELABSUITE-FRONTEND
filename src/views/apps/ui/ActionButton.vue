<!-- eslint-disable -->
<!-- ActionButton.vue -->
<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  showEdit: Boolean,
  showDelete: Boolean,
  showCheck: Boolean,
  showView: Boolean,
  showGoToButton: Boolean,
  showFinishButton: {
    type: Boolean,
    default: false,
  },
  showPrintButton: { // Nueva propiedad para el botón de imprimir
    type: Boolean,
    default: false,
  },
  disableDelete: {
    type: Boolean,
    default: false,
  },
  goToPage: String,
  item: {
    type: Object,
  },
  tooltips: {
    type: Object,
    default: () => ({
      finishProcess: 'Terminar Proceso',
      edit: 'Editar',
      check: 'Marcar',
      delete: 'Eliminar',
      goTo: 'Ir a Página',
      view: 'Visualizar PDF',
      print: 'Imprimir' // Tooltip para el botón de imprimir
    })
  }
});

const emit = defineEmits(['edit', 'delete', 'check', 'goto', 'finishProcess', 'view', 'print']); // Emitir evento 'print'

const handleEdit = () => emit('edit', props.item);
const handleDelete = () => emit('delete', props.item);
const handleCheck = () => emit('check', props.item);
const handleGoTo = () => emit('goto', props.item);
const handleFinishProcess = () => emit('finishProcess', props.item);
const handleView = () => emit('view', props.item);
const handlePrint = () => emit('print', props.item); // Manejar el clic en el botón de imprimir
</script>

<template>
  <div>
    <template v-if="showFinishButton">
      <VTooltip location="top" :props="props">
        <template #activator="{ props }">
          <IconBtn @click.stop="handleFinishProcess" v-bind="props">
            <VIcon
              icon="tabler-check"
              style="color: #4CAF50"
            />
          </IconBtn>
        </template>
        <span>{{ tooltips.finishProcess }}</span>
      </VTooltip>
    </template>
    <template v-if="showEdit">
      <VTooltip location="top" :props="props">
        <template #activator="{ props }">
          <IconBtn @click.stop="handleEdit" v-bind="props">
            <VIcon
              icon="tabler-edit"
              style="color: #00abfb"
            />
          </IconBtn>
        </template>
        <span>{{ tooltips.edit }}</span>
      </VTooltip>
    </template>
    <template v-if="showCheck">
      <VTooltip location="top" :props="props">
        <template #activator="{ props }">
          <VCheckbox
            :value="props.item"
            @change="handleCheck"
            v-bind="props"
          />
        </template>
        <span>{{ tooltips.check }}</span>
      </VTooltip>
    </template>
    <template v-if="showDelete">
      <VTooltip location="top" :props="props">
        <template #activator="{ props }">
          <IconBtn
            :disabled="disableDelete"
            @click.stop="handleDelete"
            v-bind="props"
          >
            <VIcon
              icon="tabler-trash"
              style="color: #ff4d4f"
            />
          </IconBtn>
        </template>
        <span>{{ tooltips.delete }}</span>
      </VTooltip>
    </template>
    <template v-if="showGoToButton">
      <VTooltip location="top" :props="props">
        <template #activator="{ props }">
          <IconBtn @click.stop="handleGoTo" v-bind="props">
            <VIcon
              icon="tabler-arrow-right"
              style="color: #00abfb"
            />
          </IconBtn>
        </template>
        <span>{{ tooltips.goTo }}</span>
      </VTooltip>
    </template>
    <VTooltip location="top" :props="props">
      <template v-if="showView" #activator="{ props }">
        <IconBtn @click.stop="handleView" v-bind="props">
          <VIcon
            icon="tabler-eye"
            style="color: #4CAF50"
            v-bind="props"
          />
        </IconBtn>     
      </template>
      <span>{{ tooltips.view }}</span>
    </VTooltip>

    <!-- Nuevo botón de imprimir -->
    <template v-if="showPrintButton">
      <VTooltip location="top" :props="props">
        <template #activator="{ props }">
          <IconBtn @click.stop="handlePrint" v-bind="props">
            <VIcon
              icon="tabler-printer"
              style="color: #00abfb"
            />
          </IconBtn>
        </template>
        <span>{{ tooltips.print }}</span>
      </VTooltip>
    </template>
  </div>
</template>

<style scoped>
.v-btn {
  margin: 0 4px;
}
</style>
