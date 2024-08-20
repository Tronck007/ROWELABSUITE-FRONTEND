<template>
  <VRow dense>
    <!-- Método -->
    <VCol cols="12" md="12">
      <AppSelect
        v-model="selectedMethod"
        :items="methodOptions"
        placeholder="Seleccione el Método"
        label="Método"
        chips
        closable-chips
        persistent-hint
        @change="handleMethodChange"
      />
      <AppTextField
        v-if="selectedMethod.includes('Otro')"
        v-model="otherMethod"
        label="Especifica el Método"
        placeholder="Ingresa el método"
      />
    </VCol>

    <!-- Ensayos -->
    <VCol cols="12" md="12">
      <AppSelect
        v-model="selectedAssay"
        :items="assayOptions"
        placeholder="Seleccione el Ensayo"
        label="Ensayo"
        chips
        multiple
        closable-chips
        @change="handleAssayChange"
      />
      <AppTextField
        v-if="selectedAssay.includes('Otro')"
        v-model="otherAssay"
        label="Descripción del Ensayo"
        placeholder="Ingresa la descripción del ensayo"
        class="mt-1"
      />
    </VCol>

    <!-- Campo para ingresar el Lote -->
    <VCol cols="12" md="12">
      <AppTextField
        v-model="lotNumber"
        label="Ingrese el Lote"
        placeholder="Ingresa el número de lote"
        @keyup.enter="searchByLot"
        @blur="searchByLot"
        :disabled="!isMethodAndAssayFilled"
      />
    </VCol>

    <!-- Información del Producto concatenada -->
    <VCol cols="12" v-if="selectedItem">
      <div class="product-info">
        <strong>Código del Producto:</strong> {{ selectedItem.productCode }} -
        <strong>Nombre del Producto:</strong> {{ selectedItem.productName }} -
        <strong>Cantidad Disponible:</strong> {{ selectedItem.available_qty }} -
        <strong>Fecha de Expiración:</strong> {{ selectedItem.expiration_date }}
      </div>
    </VCol>

    <!-- Unidad de medida y Cantidad requerida -->
    <VRow dense v-if="selectedItem">
      <VCol cols="12" md="4">
        <AppSelect
          v-model="selectedUnit"
          :items="unitOptions"
          label="Unidad de Medida"
          chips
          closable-chips
          persistent-hint
          :disabled="!selectedItem"
        />
      </VCol>
      <VCol cols="12" md="4">
        <AppTextField
          v-model="NumberVial"
          type="number"
          label="Número de vial"
          :disabled="!selectedItem"
        />
      </VCol>
      <VCol cols="12" md="4">
        <AppTextField
          v-model="quantityRequired"
          label="Cantidad Requerida"
          type="number"
          placeholder="Ingrese la cantidad requerida"
          :disabled="!selectedItem"
        />
      </VCol>
    </VRow>

    <!-- Botón para agregar a la tabla -->
    <VCol cols="12" md="12" v-if="selectedItem" class="d-flex flex-wrap gap-4 mt-4">
      <VBtn color="primary" @click="addToTable" :disabled="!canAddToTable">
        <VIcon start icon="tabler-plus" />
        Agregar
      </VBtn>
    </VCol>

    <!-- Tabla ExpandableTable -->
    <VCol cols="12" md="12">
      <ExpandableTable
        :items="tableItems"
        :headers="headers"
        :button-configs="buttonConfigs"
        :loading="false"
        :expand-config="(item) => ({
          name: item.productName,
          unit: item.unit,
          exp: item.expiration_date,
          numberVials: item.numberVials,
        })"
        :fields-to-display="[
          { label: 'Nombre', key: 'name' },
          { label: 'Unidad de Medida', key: 'unit' },
          { label: 'Fecha expiración', key: 'exp' },
          { label: 'Número de vial', key: 'R144C0' },
        ]"
        @remove-item="removeItem"
      />
    </VCol>

    <!-- Botón de Envío -->
    <VCol cols="12" md="12">
      <div class="d-flex justify-end mt-4 mb-6">
        <VBtn type="submit" @click="handleSubmit" :disabled="!canSubmit">
          <VIcon start icon="tabler-send" />
          ENVIAR
        </VBtn>
      </div>
    </VCol>
  </VRow>
</template>
<!-- eslint-disable -->
<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useMaterialConsumptionStore } from '@/stores/apps/control-labs-traceability/materialConsumptionStore';
import { useDialogStore } from '@/stores/apps/control-labs-traceability/dialogStore';
import ExpandableTable from "../../components/ExpandableTable.vue";

// Estado y métodos del store
const store = useMaterialConsumptionStore();
const dialogStore = useDialogStore();
const selectedItem = ref(null);
const quantityRequired = ref('');
const tableItems = ref([]);

// Opciones del combo para Método
const methodOptions = ['USP', 'Otro'];
const unitOptions = ['mg', 'g', 'kg'];
const selectedUnit = ref([]);
const NumberVial = ref('');
const selectedMethod = ref([]); // Inicializado como array vacío
const otherMethod = ref('');

// Opciones del combo para Ensayo
const assayOptions = ['Valorización', 'Uniformidad', 'Impurezas', 'Disolución', 'ID', 'MB', 'Otro'];
const selectedAssay = ref([]); // Inicializado como array vacío
const otherAssay = ref('');

// Opciones para las muestras
const sampleOptions = ref([]);
const selectedSamples = ref([]); // Aquí almacenamos las muestras seleccionadas

// Campo para ingresar el número de lote
const lotNumber = ref('');

// Headers para la tabla ExpandableTable
const headers = ref([
  { title: 'Código', key: 'productCode' },
  { title: 'Lote', key: 'batchNumber' },
  { title: 'Cantidad Requerida', key: 'quantityRequired' }, 
  { title: 'Acciones', key: 'actions', align: 'center' },

]);

const buttonConfigs = {
  showEdit: false,
  showDelete: true,
  showCheck: false,
  showGoto: false,
};

// Computed para validar si los métodos y ensayos están completos
const isMethodAndAssayFilled = computed(() => {
  const methodFilled = selectedMethod.value.length > 0;
  const assayFilled = selectedAssay.value.length > 0;
  return methodFilled && assayFilled;
});

// Computed para verificar si se puede agregar a la tabla
const canAddToTable = computed(() => selectedItem.value && quantityRequired.value.trim() !== '');

// Computed para verificar si se puede enviar el formulario
const canSubmit = computed(() => tableItems.value.length > 0 && isMethodAndAssayFilled.value);

// Concatenar los valores de método y ensayo cuando se selecciona "Otro"
const finalMethod = computed(() => {
  if (Array.isArray(selectedMethod.value)) {
    // Caso cuando selectedMethod es un array
    return selectedMethod.value.includes('Otro') && otherMethod.value.trim() !== ''
      ? `Otro | ${otherMethod.value}`
      : selectedMethod.value.join(', ');
  } else {
    // Caso cuando selectedMethod es un string
    return selectedMethod.value === 'Otro' && otherMethod.value.trim() !== ''
      ? `Otro | ${otherMethod.value}`
      : selectedMethod.value;
  }
});

const finalAssay = computed(() => {
  if (Array.isArray(selectedAssay.value)) {
    // Caso cuando selectedAssay es un array
    return selectedAssay.value.includes('Otro') && otherAssay.value.trim() !== ''
      ? `Otro | ${otherAssay.value}`
      : selectedAssay.value.join(', ');
  } else {
    // Caso cuando selectedAssay es un string
    return selectedAssay.value === 'Otro' && otherAssay.value.trim() !== ''
      ? `Otro | ${otherAssay.value}`
      : selectedAssay.value;
  }
});


// Función para manejar el cambio en el método seleccionado
const handleMethodChange = () => {
  if (!selectedMethod.value.includes('Otro')) {
    otherMethod.value = '';
  }
};

// Función para manejar el cambio en el ensayo seleccionado
const handleAssayChange = () => {
  if (!selectedAssay.value.includes('Otro')) {
    otherAssay.value = '';
  }
};

// Función para buscar por lote
const searchByLot = async () => {
  if (lotNumber.value.trim() !== '' && isMethodAndAssayFilled.value) {
    try {
      await store.fetchBatchInventory(lotNumber.value);
      if (store.batchInventory) {
        selectedItem.value = {
          productCode: store.batchInventory.item_id,
          productName: store.batchInventory.item_desc,
          batchNumber: store.batchInventory.item_batch_id,
          available_qty: store.batchInventory.available_qty,
          expiration_date: store.batchInventory.expiration_date,
          unit: store.batchInventory.unit || '', // Ajusta según el dato recibido
        };
      } else {
        notify("findInfo", "fail");
      }
    } catch (error) {
      notify("findInfo", "fail");
    }
  }
};

// Función para agregar a la tabla
const addToTable = () => {
  if (canAddToTable.value) {
    tableItems.value.push({
      id: tableItems.value.length + 1, // Generar un ID único
      ...selectedItem.value,
      unit: selectedUnit.value, // Asegurarse de incluir la unidad seleccionada
      quantityRequired: quantityRequired.value,
      samples: selectedSamples.value, // Agregar las muestras seleccionadas
      numberVials: NumberVial.value, // Agregar el número de vial
    });
    // Limpiar los campos después de agregar
    selectedItem.value = null;
    quantityRequired.value = '';
    lotNumber.value = '';
    selectedSamples.value = sampleOptions.value.map(sample => sample.value); // Seleccionar todas las muestras por defecto
  }
};

// Función para manejar el envío del formulario
const handleSubmit = async () => {
  if (canSubmit.value) {
    try {
      // Crear el objeto de MaterialConsumption
      const MaterialConsumption = {
        processCode: dialogStore.currentProcessItem.item.process_code,
        method: finalMethod.value,
        assay: finalAssay.value,
        items: tableItems.value,
      };

      // Enviar la solicitud al store
      await store.addMaterialConsumption(MaterialConsumption);

      // Limpiar todos los campos después de enviar
      selectedMethod.value = [];
      otherMethod.value = '';
      selectedAssay.value = [];
      otherAssay.value = '';
      lotNumber.value = '';
      selectedItem.value = null;
      quantityRequired.value = '';
      tableItems.value = [];     
      NumberVial.value = ''; // Reiniciar el número de vial
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  }
};

// Función para eliminar un reactivo o estándar de la tabla
const removeItem = (index) => {
  tableItems.value.splice(index, 1);
};

// Cargar opciones de muestras al montar el componente
onMounted(() => {
  if (dialogStore.currentProcessItem.item.samples) {
    sampleOptions.value = dialogStore.currentProcessItem.item.samples.map(sample => ({
      text: `Muestra: ${sample.sampling_id} - Lote: ${sample.item_batch_id}`,
      value: sample.sampling_id,
    }));

    // Seleccionar todas las muestras por defecto
    selectedSamples.value = sampleOptions.value.map(sample => sample.value);
    console.log('sampleOptions:', sampleOptions.value);
  }
});
</script>
