<template>
  <AppCardActions action-collapsed>
    <VCardText>
      <FilterCard
        v-if="tableConfig.expandedRows"
        v-model:modelValueSelectableStatus="tableConfig.filterStatus"
        v-model:modelValueSearch="search"
        :estado="estadosDisponibles"
        :filter-cards="tableConfig.filterCards || {}"
        class="mb-4"
      />
      <VDataTable
        :headers="tableConfig.headers.main"
        :items="tableConfig.data"
        :items-per-page="localItemsPerPage"
        :search="search"
        :page="localPage"
        expand-on-click
      >
        <template #expanded-row="{ item }">
          <SubTable
            :items="item[tableConfig.filterSubtables]"
            :colspan="tableConfig.headers.main.length"
            :sub-headers="tableConfig.headers.sub"
            :button-configs="tableConfig.buttonConfigs.sub"
            :loading="tableConfig.isLoading"
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
            :show-edit="tableConfig.buttonConfigs.main.showEdit"
            :show-delete="tableConfig.buttonConfigs.main.showDelete"
            :show-check="tableConfig.buttonConfigs.main.showCheck"
            :show-go-to-button="tableConfig.buttonConfigs.main.showGoto"
            :show-finish-button="tableConfig.buttonConfigs.main.showFinishButton"
            :show-view="tableConfig.buttonConfigs.main.showView"
            :show-print-button="tableConfig.buttonConfigs.main.showPrintButton"
            :item="item"
            :tooltips="tooltips"
            @edit="$emit('edit', item)"
            @delete="$emit('delete', item)"
            @check="$emit('check', item)"
            @goto="$emit('goto', item)"
            @view="$emit('view', item)"
            @finishProcess="$emit('finishProcess', item)"
            @print="$emit('print', item)" 
          />
        </template>

        <template #bottom>
          <VCardText class="pt-2">
            <div class="d-flex flex-wrap justify-center justify-sm-space-between gap-y-2 mt-2">
              <VSelect
                v-model="localItemsPerPage"
                :items="calculatedItemsPerPageOptions"
                label="Elementos por página:"
                variant="underlined"
                style="max-inline-size: 8rem;min-inline-size: 5rem;"
              />

              <VPagination
                v-model="localPage"
                :total-visible="$vuetify.display.smAndDown ? 3 : 5"
                :length="Math.ceil(totalItems / localItemsPerPage)"
              />
            </div>
          </VCardText>
        </template>
      </VDataTable>
    </VCardText>
  </AppCardActions>
</template>

<script setup>
import { computed, ref, defineProps, defineEmits } from "vue"
import { VDataTable } from "vuetify/labs/VDataTable"
import FilterCard from "@/views/apps/components/FilterCard.vue"
import SubTable from "@/views/apps/components/SubTable.vue"
import ActionButton from "@/views/apps/ui/ActionButton.vue"

const props = defineProps({
  tableConfig: {
    type: Object,
    required: true,
  },
  totalItems: {
    type: Number,
    default: 0,

  },
  itemsPerPage: {
    type: Number,
    default: 10,
  },
  page: {
    type: Number,
    default: 1,
  },
  tooltips: {
    type: Object,
    default: () => ({}),
  },  
})

const emit = defineEmits([
  "update:page",
  "update:itemsPerPage",
  "edit",
  "delete",
  "check",
  "goto",
  "view",
  "finishProcess",
  "print",
])

const localItemsPerPage = ref(props.itemsPerPage)
const localPage = ref(props.page)
const search = ref("")

const calculatedItemsPerPageOptions = computed(() => {
  const options = []
  for (let i = 10; i <= props.totalItems; i += 10) {
    options.push(i)
  }
  [10, 20, 50, 100].forEach(num => {
    if (num <= props.totalItems && !options.includes(num)) {
      options.push(num)
    }
  })
  options.sort((a, b) => a - b)
  
  return options
})

const estadosDisponibles = computed(() => {
  const uniqueStates = new Set(
    props.tableConfig.data.map(item => item.state),
  )

  
  return Array.from(uniqueStates).map(
    state => statusTextMap[state] || "Estado Desconocido",
  )
})

const statusTextMap = {
  created: "Creado",
  in_process: "En Proceso",
  completed: "Completado",
  on_hold: "En Espera",
  inactive: "Inactivo",
  reserved: "Reservado",
  active: "Activo",
}


// Emitir eventos cuando cambian localItemsPerPage y localPage
watch(localItemsPerPage, newValue => {
  emit("update:itemsPerPage", newValue)
})

watch(localPage, newValue => {
  emit("update:page", newValue)
})

const handleAction = (action, item) => {
  emit(action, item)
}
</script>
