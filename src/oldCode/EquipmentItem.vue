<template>
  <div class="equipment-item">
    <img
      v-if="$vuetify.breakpoint.mdAndUp"
      :src="statusImage"
      alt="status"
      class="status-icon responsive-image"
    >
    <div class="equipment-info" v-else>
      #{{ number }}
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import libreImage from '@/assets/images/status/Libre.png'
import reservadoImage from '@/assets/images/status/Reservado.png'
import ocupadoImage from '@/assets/images/status/Ocupado.png'
import noAnilibleImage from '@/assets/images/status/NoDisponible.png'

const props = defineProps({
  type: String,
  number: Number,
  status: String,
})

const statusImage = computed(() => {
  switch (props.status) {
  case 'libre':
    return libreImage
  case 'reservado':
    return reservadoImage
  case 'ocupado':
    return ocupadoImage
  case 'no_anilible':
    return noAnilibleImage
  default:
    return ''
  }
})
</script>

<style scoped>
.equipment-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
}

.status-icon {
  width: 100%; /* Ajusta el ancho al 100% del contenedor */
  max-width: 50px; /* Máximo ancho para pantallas grandes */
  height: auto; /* Mantiene la proporción */
}

.responsive-image {
  width: 100%; /* Ajusta el ancho al 100% del contenedor */
  height: auto; /* Mantiene la proporción */
}

.equipment-info {
  margin-top: 5px;
  text-align: center;
  font-size: 1.2em;
}
</style>
