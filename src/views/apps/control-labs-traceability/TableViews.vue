<!-- eslint-disable arrow-parens -->
<!-- eslint-disable semi -->
<!-- TableView.vue -->
<script setup>
import { ref, computed, defineProps, defineEmits } from "vue";
import { VDataTable } from "vuetify/labs/VDataTable";
import FilterCard from "../components/FilterCard.vue";
import SubTable from "../components/SubTable.vue";
import ActionButton from "../ui/ActionButton.vue";

const props = defineProps({
  tableConfig: {
    type: Object,
    required: true,
  },
  tooltips: { // Propiedad para los tooltips
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["edit", "delete", "view", "check", "goto", "finishProcess"]);

const filterSubtables = props.tableConfig.filterSubtables;
const filterCards = props.tableConfig.filterCards;

const selectableStatus = ref([]);
const search = ref("");
const expandedRows = ref([]);
const actionClicked =  props.tableConfig.actionClicked;

const toggleRowExpansion = (item) => {
  const itemId = item.id; // Asumiendo que cada ítem tiene un campo 'id'
  const index = expandedRows.value.indexOf(itemId);
  if (index > -1) {
    expandedRows.value.splice(index, 1);
  } else {
    expandedRows.value.push(itemId);
  }
};

const filteredData = computed(() => {
  if (selectableStatus.value.length === 0) {
    return props.tableConfig.data;
  } else {
    const selectedStates = selectableStatus.value.map((status) => {
      return Object.keys(statusTextMap).find((key) => statusTextMap[key] === status);
    }).filter((status) => status);
    return props.tableConfig.data.filter((item) => selectedStates.includes(item.state));
  }
});

// Función para obtener el estado real basado en las propiedades disponibles
const getRealState = (item) => {
  console.log('item', item.status || item.state || item.is_active);
  return item.status || item.state || item.is_active;
};

const statusTextMap = {
  Created: "Creado",
  "In Process": "En Proceso",
  Revisado: "Revisado",
  completed: "Completado",
  "On Hold": "En Espera",
  Inactive: "Inactivo",
  Rechazado: "Rechazado",
  reserved: "Reservado",
  Aprobado: "Aprobado",
  Activa: "Activa",
};

const estadosDisponibles = computed(() => {
  const uniqueStates = new Set(props.tableConfig.data.map((item) => item.state));

  return Array.from(uniqueStates).map((state) => statusTextMap[state] || "Estado Desconocido");
  
});

const handleAction = (action, item) => {
  emit(action, item);
};
</script>

<template>
  <FilterCard
    v-if="props.tableConfig.expandedRows"
    v-model:modelValueSelectableStatus="selectableStatus"
    v-model:modelValueSearch="search"
    :estado="estadosDisponibles"
    :filter-cards="props.tableConfig.filterCards || {}"
    class="mb-4"
  />

  <VDataTable
    v-model:expanded="expandedRows"
    :expand-on-click="!actionClicked"
    :headers="props.tableConfig.headers.main"
    :items="filteredData"
    :search="search"
    :loading="props.tableConfig.isLoading"
    loading-text="Cargando..."
    class="rounded-lg elevation-1 mb-4"
    @item-clicked="toggleRowExpansion"
  >
    <template #expanded-row="{ item }">
      <SubTable
        :items="item[filterSubtables]"
        :colspan="props.tableConfig.headers.main.length"
        :sub-headers="props.tableConfig.headers.sub"
        :button-configs="props.tableConfig.buttonConfigs.sub"
        :loading="props.tableConfig.isLoading"
      />
    </template>

    <template #item.state="{ item }">
      <VChip
        :color="resolveStatusVariant(getRealState(item)).color"
        size="small"
      >
        {{ resolveStatusVariant(getRealState(item)).text }}
      </VChip>
    </template>

    <template #item.actions="{ item }">
      <ActionButton
        :show-edit="props.tableConfig.buttonConfigs.main.showEdit"
        :show-delete="props.tableConfig.buttonConfigs.main.showDelete"
        :show-check="props.tableConfig.buttonConfigs.main.showCheck"
        :show-go-to-button="props.tableConfig.buttonConfigs.main.showGoto"
        :show-finish-button="props.tableConfig.buttonConfigs.main.showFinishButton"
        :show-view="props.tableConfig.buttonConfigs.main.showView"
        :disable-delete="expandedRows.includes(item.id)"
        :item="item"
        :tooltips="props.tooltips"
        @edit="handleAction('edit', item)"
        @delete="handleAction('delete', item)"
        @check="handleAction('check', item)"
        @goto="handleAction('goto', item)"
        @view="handleAction('view', item)"
        @finishProcess="handleAction('finishProcess', item)"
      />
    </template>
  </VDataTable>
</template>

<style scoped>
.align-right {
  margin-left: auto;
}
</style>
