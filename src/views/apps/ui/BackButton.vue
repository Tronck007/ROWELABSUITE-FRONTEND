<!-- eslint-disable semi -->
<template>
  <div class="d-flex justify-end">
    <VBtn @click="handleGoTo">
      <VIcon
        start
        icon="tabler-transfer-out"
        size="large"
      />
      REGRESAR
    </VBtn>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

// Inicializar Vue Router
const router = useRouter()

// Función para redirigir al usuario a la página de inicio
const handleGoTo = () => {
  router.push({ name: "traceability" })
}
</script>

<style scoped>
.d-flex.justify-content-end {
  margin-bottom: 20px;
}
</style>
