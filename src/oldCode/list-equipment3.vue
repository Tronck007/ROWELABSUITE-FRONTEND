<script setup>
import { useCatalogStore, useDialogStore, useEquipmentStore } from '@/stores/apps/control-labs-traceability'
import { VDataTable } from "vuetify/labs/VDataTable"
import SubTable from "@/views/apps/components/SubTable.vue"
import FilterCard from "@/views/apps/components/FilterCard.vue"

const equipmentStore = useEquipmentStore()
const catalogStore = useCatalogStore()

const isLoadingAnimation = ref(false)

const page = ref(equipmentStore.currentPage) // Separar la reactividad
const itemsPerPage = ref(equipmentStore.itemsPerPage) // Separar la reactividad
const totalItems = ref(equipmentStore.totalDocuments)
const tableConfig = equipmentStore.tableConfig
const search = ref("")


const fetchData = async () => {
  isLoadingAnimation.value = true
  try {
    await Promise.all([
      catalogStore.getCatalogAllEquipment(), 
      equipmentStore.fetchAllEquipment(page.value, itemsPerPage.value),
    ])
    totalItems.value = equipmentStore.totalDocuments // Actualizar totalItems después de la carga
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    isLoadingAnimation.value = false
  }
}

// Calcula los múltiplos de 10 para ofrecer como opciones en el selector
const calculatedItemsPerPageOptions = computed(() => {
  const options = []
  for (let i = 10; i <= totalItems.value; i += 10) {
    options.push(i)
  }
  [10, 20, 50, 100].forEach(num => {
    if (num <= totalItems.value && !options.includes(num)) {
      options.push(num)
    }
  })
  options.sort((a, b) => a - b)

  return options
})

const handleAction = (action, item) => {
  console.log('Action:', action, 'Item:', item)
}

const widgetData = ref([
  {
    title: 'Disponibles',
    value: 100,
    icon: 'tabler-check',
  },
  {
    title: 'Procesos',
    value: 10,
    icon: 'tabler-progress',
  },
  {
    title: 'Reservados',
    value: 5,
    icon: 'tabler-calendar-event',
  },
  {
    title: 'No Disponibles',
    value: 3,
    icon: 'tabler-circle-off',
  },
])

// Define tus tooltips aquí
const tooltips = {
  finishProcess: 'Terminar Proceso',
  edit: 'Muestras - Equipos - Reservas',
  check: 'Marcar',
  delete: 'Eliminar Proceso',
  goTo: 'Ir a Equipos (En Proceso, Reservados y Finalizados)',
  view: 'Visualizar PDF',
}

// Mapa de textos de estado
const statusTextMap = {
  created: "Creado",
  in_process: "En Proceso",
  completed: "Completado",
  on_hold: "En Espera",
  inactive: "Inactivo",
  reserved: "Reservado",
  active: "Activo",
}

// Computed para obtener los estados disponibles
const estadosDisponibles = computed(() => {
  const uniqueStates = new Set(
    tableConfig.data.map(item => item.state),
  )

  
  return Array.from(uniqueStates).map(
    state => statusTextMap[state] || "Estado Desconocido",
  )
})

// Observa cambios en `itemsPerPage` para volver a la primera página y recargar datos
watch(itemsPerPage, newItemsPerPage => {
  page.value = 1
  equipmentStore.setItemsPerPage(newItemsPerPage)
  fetchData()
})

// Observa cambios en `page` para cargar la página correspondiente
watch(page, newPage => {
  equipmentStore.setCurrentPage(newPage)
  fetchData()
})

onMounted(() => {
  fetchData()
})
</script>

<template>
  <!-- 👉 Widgets -->
  <VCard class="mb-6">
    <VCardText class="px-3">
      <VRow>
        <template
          v-for="(data, id) in widgetData"
          :key="id"
        >
          <VCol
            cols="12"
            sm="6"
            md="3"
            class="px-6"
          >
            <div
              class="d-flex justify-space-between align-center"
              :class="$vuetify.display.xs
                ? id !== widgetData.length - 1 ? 'border-b pb-4' : ''
                : $vuetify.display.sm
                  ? id < (widgetData.length / 2) ? 'border-b pb-4' : ''
                  : ''"
            >
              <div class="d-flex flex-column">
                <h4 class="text-h4">
                  {{ data.value }}
                </h4>
                <span class="text-body-1 text-capitalize">{{ data.title }}</span>
              </div>

              <VAvatar
                variant="tonal"
                rounded
                size="42"
              >
                <VIcon
                  :icon="data.icon"
                  size="26"
                  color="high-emphasis"
                />
              </VAvatar>
            </div>
          </VCol>
          <VDivider
            v-if="$vuetify.display.mdAndUp ? id !== widgetData.length - 1
              : $vuetify.display.smAndUp ? id % 2 === 0
                : false"
            vertical
            inset
            length="60"
          />
        </template>
      </VRow>
    </VCardText>
  </VCard>



  <VCard>
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
        :headers="equipmentStore.tableConfig.headers.main"
        :items="equipmentStore.tableConfig.data"
        :items-per-page="itemsPerPage"
        :search="search"
        :page="page"
        expand-on-click
      >
        <!-- Expanded Row Data -->
        <template #expanded-row="{ item }">
          <SubTable
            :items="item[equipmentStore.tableConfig.filterSubtables]"
            :colspan="equipmentStore.tableConfig.headers.main.length"
            :sub-headers="equipmentStore.tableConfig.headers.sub"
            :button-configs="equipmentStore.tableConfig.buttonConfigs.sub"
            :loading="equipmentStore.tableConfig.isLoading"
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
                v-model="itemsPerPage"
                :items="calculatedItemsPerPageOptions"
                label="Elementos por página:"
                variant="underlined"
                style="max-inline-size: 8rem;min-inline-size: 5rem;"
              />

              <VPagination
                v-model="page"
                :total-visible="$vuetify.display.smAndDown ? 3 : 5"
                :length="Math.ceil(totalItems / itemsPerPage)"
              />
            </div>
          </VCardText>
        </template>
      </VDataTable>
    </VCardText>
  </VCard>
</template>

<style lang="scss">
#invoice-list {
  .invoice-list-actions {
    inline-size: 8rem;
  }

  .invoice-list-filter {
    inline-size: 12rem;
  }
}
</style>
