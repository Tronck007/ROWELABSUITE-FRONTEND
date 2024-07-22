<script setup>
definePage({
  meta: {
    action: 'read',
    subject: 'Public',
  },
})
</script>

<template>
  <div class="d-flex align-center justify-center min-h-screen">
    <VCard max-width="500" class="mx-auto" title="Usuario No Configurado">
      <VCardText>
        <p>Su usuario aún no está configurado para acceder a esta aplicación.</p>
        <p>Por favor, espere hasta que el administrador realice los cambios necesarios.</p>
      </VCardText>
    </VCard>
  </div>
</template>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}
</style>
