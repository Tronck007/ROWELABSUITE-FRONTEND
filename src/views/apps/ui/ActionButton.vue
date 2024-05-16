<!-- eslint-disable vue/require-explicit-emits -->
<script setup>
import { useRouter } from 'vue-router';

const { showEdit, showDelete, showCheck, items, selectedItems, showGoToButton, showFinishButton, goToMenuConfig, gotoPage, disableDelete  } = defineProps({
  showEdit: Boolean,
  showDelete: Boolean,
  showCheck: Boolean,
  showGoToButton: Boolean,
  showFinishButton: {
    type: Boolean,
    default: false,
  },
  disableDelete: {
    type: Boolean,
    default: false,
  },
  goToPage: {
    type: String,
   
  },
  selectedItems: {
    type: Array,
    default: () => [],
  },
})

// Aquí defines los eventos que el componente puede emitir.
const emit = defineEmits(["edit", "delete", "check", "goTo", "finishProcess"])



const router = useRouter()

// Función para manejar el cambio de selección del checkbox
const onCheckChange = isChecked => {
  if (isChecked) {
    emit('update:selectedItems', [...selectedItems.value, item.value])
  } else {
    const filteredItems = selectedItems.value.filter(selectedItem => selectedItem.id !== item.value.id)

    emit('update:selectedItems', filteredItems)
  }
}

// Vigilar por cambios en selectedItems para actualizar el estado del checkbox
if (showCheck) {
  watch(selectedItems, () => {
    isSelected.value = selectedItems?.value.includes(item.value)
  })
}
const isSelected = ref(false)

// Método para manejar la navegación
const navigateToItem = item => {

  emit('goTo', item) // Opcional, si necesitas emitir este evento
}
</script>

<template>
  <div>
    <template v-if="showFinishButton">
      <IconBtn @click.stop="$emit('finishProcess',item)">
        <VIcon
          icon="tabler-check"
          style="color: #4CAF50"
        />
      </IconBtn>
    </template>
    <template v-if="showEdit">
      <IconBtn @click.stop="$emit('edit', item)">
        <VIcon
          icon="tabler-edit"
          style="color: #00abfb"
        />
      </IconBtn>
    </template>
    <template v-if="showCheck">
      <VCheckbox
        :input-value="isSelected"
        color="success"
        :value="item"
        @change="onCheckChange"
      />
    </template>

    <template v-if="showDelete">
      <IconBtn
        :disabled="disableDelete"
        @click.stop="$emit('delete', item)"
      >
        <VIcon
          icon="tabler-trash"
          
          style="color: #ff4d4f"
        />
      </IconBtn>
    </template>
    <template v-if="showGoToButton">
      <IconBtn @click.stop="navigateToItem(item)">
        <VIcon
          icon="tabler-arrow-right"
          style="color: #00abfb"
        />
      </IconBtn>
    </template>
  </div>
</template>
