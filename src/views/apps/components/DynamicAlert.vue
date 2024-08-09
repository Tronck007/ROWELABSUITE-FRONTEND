
<template>
  <VDialog
    :model-value="internalShow"
    max-width="500px"
    persistent
    @update:model-value="close"
  >
    <VCard>
      <VCardTitle class="headline">
        <span>{{ icon }}</span>
        {{ title }}
      </VCardTitle>
      <VCardText class="message-text">
        {{ message }}
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn :color="buttonColor" variant="outlined" @click="accept">Aceptar</VBtn>
        <VBtn color="error" variant="outlined" @click="cancel">Cancelar</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<!-- eslint-disable indent -->
<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: Boolean,
  title: String,
  message: String,
  
  type: {
    type: String,
    default: 'warning', // Puede ser 'info', 'success', 'warning', 'error'
  },

})

const emit = defineEmits(['close', 'accept', 'cancel'])

const internalShow = ref(props.show)

watch(() => props.show, (newVal) => {
  internalShow.value = newVal
})

const icon = ref('⚠️') // Emoji por defecto para 'warning'
const buttonColor = ref('primary')

const setAlertStyle = () => {
  switch (props.type) {
    case 'success':
      icon.value = '✅' // Emoji para 'success'
      buttonColor.value = 'success'
      break
    case 'warning':
      icon.value = '⚠️' // Emoji para 'warning'
      buttonColor.value = 'warning'
      break
    case 'error':
      icon.value = '❌' // Emoji para 'error'
      buttonColor.value = 'error'
      break
    case 'info':
      icon.value = 'ℹ️' // Emoji para 'info'
      buttonColor.value = 'info'
      break
    default:
      icon.value = '⚠️' // Emoji por defecto
      buttonColor.value = 'primary'
  }
}

watch(() => props.type, setAlertStyle, { immediate: true })

const close = () => {
  internalShow.value = false
  emit('close')
}

const accept = () => {
  emit('accept')
  close()
}

const cancel = () => {
  emit('cancel')
  close()
}

// Inicializar el estilo basado en el tipo
setAlertStyle()
</script>

<style scoped>
.headline {
  display: flex;
  align-items: center;
}

.headline span {
  margin-right: 10px;
  font-size: 24px;
}

.message-text {
  font-weight: bold;
}
</style>
