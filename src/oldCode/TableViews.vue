<!-- eslint-disable  -->
<!-- TableView.vue -->
<script setup>
import { ref, computed, defineProps, defineEmits } from "vue";
import { VDataTable } from "vuetify/labs/VDataTable";
import ActionButton from "../ui/ActionButton.vue";
import FilterCard from "../components/FilterCard.vue";
import SubTable from "../components/SubTable.vue";

const props = defineProps({
  tableConfig: {
    type: Object,
    required: true,
  },
  tooltips: {
    type: Object,
    default: () => ({}),
  },
  filterStatus: {
    type: Array,
    default: () => [],
  },
  page: {
    type: Number,
    default: 1,
  },
  itemsPerPage: {
    type: Number,
    default: 10,
  },
  totalItems: {
    type: Number,
    default: 0,
  },
  totalPages: {  // Asegúrate de que esta prop esté definida
    type: Number,
    default: 1,
  },
});

const emit = defineEmits([
  "edit",
  "delete",
  "view",
  "check",
  "goto",
  "finishProcess",
  "update:page",
  "update:itemsPerPage",
]);

const expandedRows = ref([]);
const search = ref("");

// Calcula los múltiplos de 10 para ofrecer como opciones en el selector
const calculatedItemsPerPageOptions = computed(() => {
  const options = [];
  for (let i = 10; i <= props.totalItems; i += 10) {
    options.push(i);
  }
  [10, 20, 50, 100].forEach((num) => {
    if (num <= props.totalItems && !options.includes(num)) {
      options.push(num);
    }
  });
  options.sort((a, b) => a - b);
  return options;
});


// Computed para procesar los datos de la tabla
const processedData = computed(() => {
  let data = props.tableConfig.data || [];

  // Filtrar por estado si es necesario
  if (props.filterStatus.length > 0) {
    const selectedStates = props.filterStatus.map((status) =>
      Object.keys(statusTextMap).find(
        (key) => statusTextMap[key] === status
      )
    );
    data = data.filter((item) =>
      selectedStates.includes(item.state)
    );
  }

  const start = (props.page - 1) * props.itemsPerPage;
  const end = start + props.itemsPerPage;

  return data.slice(start, end);
});

const handlePageChange = (newPage) => {
  console.log(newPage);
  if (newPage !== props.page) {
    emit("update:page", newPage);
  }
};


const handleItemsPerPageChange = (newItemsPerPage) => {
  console.log(newItemsPerPage);
  if (newItemsPerPage !== props.itemsPerPage) {
    emit("update:itemsPerPage", newItemsPerPage);
  }
};


// Manejo de filas expandidas
const toggleRowExpansion = (item) => {
  const itemId = item.id;
  const index = expandedRows.value.indexOf(itemId);
  if (index > -1) {
    expandedRows.value.splice(index, 1);
  } else {
    expandedRows.value.push(itemId);
  }
};

// Mapa de textos de estado
const statusTextMap = {
  created: "Creado",
  in_process: "En Proceso",
  completed: "Completado",
  on_hold: "En Espera",
  inactive: "Inactivo",
  reserved: "Reservado",
  active: "Activo",
};

// Computed para obtener los estados disponibles
const estadosDisponibles = computed(() => {
  const uniqueStates = new Set(
    props.tableConfig.data.map((item) => item.state)
  );
  return Array.from(uniqueStates).map(
    (state) => statusTextMap[state] || "Estado Desconocido"
  );
});

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
    :headers="props.tableConfig.headers.main"
    :items="processedData"
    :search="search"
    :loading="props.tableConfig.isLoading"
    loading-text="Cargando..."
    class="rounded-lg elevation-1 mb-4"
    :page="props.page"
    :items-per-page="props.itemsPerPage"
    :server-items-length="props.totalItems"
    @update:page="handlePageChange"
    @update:items-per-page="handleItemsPerPageChange"
  >
    <!-- Aquí deberían estar las plantillas expandidas -->
    <template #expanded-row="{ item }">
      <SubTable
        :items="item[props.tableConfig.filterSubtables]"
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
        :show-print-button="props.tableConfig.buttonConfigs.main.showPrintButton"
        :item="item"
        :tooltips="props.tooltips"
        @edit="handleAction('edit', item)"
        @delete="handleAction('delete', item)"
        @check="handleAction('check', item)"
        @goto="handleAction('goto', item)"
        @view="handleAction('view', item)"
        @finishProcess="handleAction('finishProcess', item)"
        @print="emit('print', item)" 
      />
    </template>

    <template #bottom>
      <VCardText class="pt-2">
        <div class="d-flex flex-wrap justify-center justify-sm-space-between gap-y-2 mt-2">
          <VSelect
            v-model="props.itemsPerPage"
            :items="calculatedItemsPerPageOptions"
            label="Rows per page:"
            variant="underlined"
            style="max-inline-size: 8rem; min-inline-size: 5rem;"
            @change="handleItemsPerPageChange"
          />
          <VPagination
            :model-value="props.page"
            :total-visible="$vuetify.display.smAndDown ? 3 : 5"
            :length="props.totalPages"
            @update:model-value="handlePageChange"
          />
        </div>
      </VCardText>
    </template>
  </VDataTable>
</template>

<style scoped>
.align-right {
  margin-left: auto;
}
</style>
