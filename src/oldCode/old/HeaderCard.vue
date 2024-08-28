<!-- eslint-disable camelcase -->
<script setup>
import Swal from 'sweetalert2';
import { computed } from 'vue';


const props = defineProps({
  items: Object,
})





const data = computed(() => props.items[0])

console.log('data') 


const handleDelete = processGeneratedId => {
  console.log('Eliminar elemento con ID:', processGeneratedId)
  Swal.fire({
    title: '¿Estás seguro?',
    text: "¡No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar!',
    cancelButtonText: 'Cancelar',
  }).then(result => {
    if (result.isConfirmed) {
      

      // Aquí tu lógica para eliminar el elemento, como una llamada a la API
      Swal.fire(
        '¡Eliminado!',
        'El elemento ha sido eliminado.',
        'success',
      )
    }
  })
}
</script>


<template>
  <VCard v-if="data">
    <VCardText>
      <VRow>
        <VCol
          cols="2"
          md="2"
        >
          <VTextField
            :model-value="data.object_name"
            placeholder="Placeholder Text"
            label="OBJETO"
            variant="underlined"
            readonly
          />
        </VCol>
        <VCol
          cols="2"
       
          md="2"
        >
          <VTextField
            :model-value="data.object_desc"
            placeholder="Placeholder Text"
            label="DESCRIPCIÓN"
            variant="underlined"
            readonly
          />
        </VCol>
        <VCol
          cols="2"
       
          md="2"
        >
          <VTextField
            :model-value="data.process_code"
            placeholder="Placeholder Text"
            label="# PROCESO"
            variant="underlined"
            readonly
          />
        </VCol>
        <VCol
          cols="2"
       
          md="2"
        >
          <VTextField
            :model-value="data.quality_order_number"
            placeholder="Placeholder Text"
            label="PQ"
            variant="underlined"
            readonly
          />
        </VCol>
        <VCol
          cols="2"
       
          md="2"
        >
          <VTextField
            :model-value="data.quality_test_group_id"
            placeholder="Placeholder Text"
            label="METODO"
            variant="underlined"
            readonly
          />
        </VCol>
        <VCol
          cols="1"
       
          md="1"
        >
          <VBtn
            submit
            color="error"
            @click="handleDelete(data.process_generated_id)"
          >
            <VIcon
              start
              icon="tabler-trash"
            />ELIMINAR
          </VBtn>
        </VCol>
   
        <VCol
          cols="1"
       
          md="1"
        >
          <VBtn color="info">
            <VIcon
              start
              icon="tabler-arrow-left"
            />REGRESAR
          </VBtn>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
