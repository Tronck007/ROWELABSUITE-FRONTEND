<template>
  <VCard class="mb-6">
    <VCardText class="px-3">
      <VRow
        align="center"
        justify="space-between"
        class="text-center flex-wrap"
      >
        <template
          v-for="(data, id) in widgetData"
          :key="id"
        >
          <VCol
            cols="12"
            sm="4"
            md="2"
            class="d-flex align-center justify-center"
          >
            <div class="d-flex flex-column align-center">
              <VAvatar
                :style="{ backgroundColor: resolveStatusVariant(data.status).color }"
                rounded
                size="42"
                class="mb-2"
              >
                <VIcon
                  :icon="data.icon"
                  size="26"
                  color="on-primary"
                />
              </VAvatar>
              <h4 class="text-h4 m-0">
                {{ data.value }}
              </h4>
              <span class="text-body-1 text-capitalize">{{ data.title }}</span>
            </div>
          </VCol>
          <VDivider
            v-if="id !== widgetData.length - 1"
            vertical
            inset
            length="60"
            class="hidden-xs-only" 
          />
        </template>
      </VRow>
    </VCardText>
  </VCard>
</template>

<script setup>
const props = defineProps({
  widgetData: {
    type: Array,
    required: true,
    default: () => [],
  },
})
</script>

<style lang="scss">
.VCol {
  border-right: 1px solid #E0E0E0;
}
.VCol:last-child {
  border-right: none;
}
.VRow {
  padding: 0 20px;
  display: flex;
  justify-content: space-between; /* Distribuye los elementos de forma equitativa */
  flex-wrap: wrap; /* Permite que los elementos se envuelvan en la fila */
}

@media (max-width: 600px) {
  .VCol {
    flex: 1 1 50%; /* Ocupa el 50% del ancho en pantallas pequeñas */
    border-right: none;
    border-bottom: 1px solid #E0E0E0;
  }
  .VCol:nth-child(odd) {
    border-right: 1px solid #E0E0E0; /* Agrega un borde derecho a los elementos impares */
  }
  .VCol:last-child,
  .VCol:nth-last-child(2) {
    border-bottom: none;
  }
  .VDivider {
    display: none; /* Oculta el divisor vertical en pantallas pequeñas */
  }
}
</style>
