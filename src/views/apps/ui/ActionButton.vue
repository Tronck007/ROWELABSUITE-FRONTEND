<!-- eslint-disable semi -->
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
  disableDelete: {
    type: Boolean,
    default: false,
  },
  goToPage: String,
  item: {
    type: Object,
    
  },
});

const emit = defineEmits(['edit', 'delete', 'check', 'goto', 'finishProcess', 'view']);

const handleEdit = () => emit('edit', props.item);
const handleDelete = () => emit('delete', props.item);
const handleCheck = () => emit('check', props.item);
const handleGoTo = () => emit('goto', props.item);
const handleFinishProcess = () => emit('finishProcess', props.item);
const handleView = () => emit('view', props.item);
</script>

<template>
  <div>
    <template v-if="showFinishButton">
      <IconBtn @click.stop="handleFinishProcess">
        <VIcon icon="tabler-check" style="color: #4CAF50" />
      </IconBtn>
    </template>
    <template v-if="showEdit">
      <IconBtn @click.stop="handleEdit">
        <VIcon icon="tabler-edit" style="color: #00abfb" />
      </IconBtn>
    </template>
    <template v-if="showCheck">
      <VCheckbox
        :value="props.item"
        @change="handleCheck"
      />
    </template>
    <template v-if="showDelete">
      <IconBtn :disabled="disableDelete" @click.stop="handleDelete">
        <VIcon icon="tabler-trash" style="color: #ff4d4f" />
      </IconBtn>
    </template>
    <template v-if="showGoToButton">
      <IconBtn @click.stop="handleGoTo">
        <VIcon icon="tabler-arrow-right" style="color: #00abfb" />
      </IconBtn>
    </template>
    <template v-if="showView">
      <IconBtn @click.stop="handleView">
        <VIcon icon="tabler-eye" style="color: #4CAF50" />
      </IconBtn>
    </template>
  </div>
</template>

<style scoped>
.v-btn {
  margin: 0 4px;
}
</style>
