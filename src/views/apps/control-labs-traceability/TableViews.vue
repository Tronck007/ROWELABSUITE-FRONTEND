<!-- eslint-disable arrow-parens -->
<!-- eslint-disable semi -->
<!-- TableView.vue -->
<script setup>
import { useDialogStore } from "@/stores/apps/control-labs-traceability/dialogStore";
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
  filterStatus: {
    type: Array,
    default: () => [],
  },
});


const emit = defineEmits(["edit", "delete", "view", "check", "goto", "finishProcess"]);

const filterSubtables = props.tableConfig.filterSubtables;
const filterCards = props.tableConfig.filterCards;
const selectableStatus = ref(["Creado", "En Proceso"]);
const DialogStore = useDialogStore();

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
  if (props.filterStatus.length === 0) {
    return props.tableConfig.data;
  } else {
    const selectedStates = props.filterStatus.map((status) => {
      return Object.keys(statusTextMap).find((key) => statusTextMap[key] === status);
    }).filter((status) => status);
    return props.tableConfig.data.filter((item) => selectedStates.includes(item.state));
  }
});


const statusTextMap = {
  created: "Creado",
  in_process: "En Proceso",
  completed: "Completado",
  on_hold: "En Espera",
  inactive: "Inactivo",
  reserved: "Reservado",
  active: "Activo",	
};

const estadosDisponibles = computed(() => {
  const uniqueStates = new Set(props.tableConfig.data.map((item) => item.state));

  return Array.from(uniqueStates).map((state) => statusTextMap[state] || "Estado Desconocido");
  
});

const handleAction = (action, item) => {
  emit(action, item);
  DialogStore.currentProcessItem = ({ item, action });
};
</script>

<template>
  <FilterCard
    v-if="props.tableConfig.expandedRows"
    v-model:modelValueSelectableStatus="props.filterStatus"
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
        :color="resolveStatusVariant(item.state).color"
        size="small"
      >
        {{ resolveStatusVariant(item.state).text }}
      </VChip>
    </template>
    <template #item.status="{ item }">
      <VChip
        :color="resolveStatusVariant(item.status).color"
        size="small"
      >
        {{ resolveStatusVariant(item.status).text }}
      </VChip>
    </template>
    <template #item.is_active="{ item }">
      <VChip
        :color="resolveStatusVariant(item.is_active).color"
        size="small"
      >
        {{ resolveStatusVariant(item.is_active).text }}
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
