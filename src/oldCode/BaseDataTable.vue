<script setup>
import { VDataTable } from "vuetify/labs/VDataTable";
import { ref, watch, onMounted } from "vue";
import ActionButton from "@/views/apps/ui/ActionButton.vue";
import FilterCard from "@/views/apps/components/FilterCard.vue";
import SubTable from "@/views/apps/components/SubTable.vue";

const props = defineProps({
  store: Object,
  catalogStore: Object,
  tableConfig: Object,
  fetchData: Function,
  handleAction: Function,
  tooltips: Object,
  widgetData: Array,
  estadosDisponibles: Array,
  calculatedItemsPerPageOptions: Array,
  search: String,
});

const isLoadingAnimation = ref(false);
const page = ref(props.store.currentPage);
const itemsPerPage = ref(props.store.itemsPerPage);
const totalItems = ref(props.store.totalDocuments);

watch(itemsPerPage, newItemsPerPage => {
  page.value = 1;
  props.store.setItemsPerPage(newItemsPerPage);
  props.fetchData();
});

watch(page, newPage => {
  props.store.setCurrentPage(newPage);
  props.fetchData();
});

onMounted(() => {
  props.fetchData();
});
</script>

<template>
  <VCard class="mb-6">
    <VCardText class="px-3">
      <VRow>
        <template v-for="(data, id) in props.widgetData" :key="id">
          <VCol cols="12" sm="6" md="3" class="px-6">
            <div
              class="d-flex justify-space-between align-center"
              :class="$vuetify.display.xs
                ? id !== props.widgetData.length - 1 ? 'border-b pb-4' : ''
                : $vuetify.display.sm
                  ? id < (props.widgetData.length / 2) ? 'border-b pb-4' : ''
                  : ''"
            >
              <div class="d-flex flex-column">
                <h4 class="text-h4">{{ data.value }}</h4>
                <span class="text-body-1 text-capitalize">{{ data.title }}</span>
              </div>
              <VAvatar variant="tonal" rounded size="42">
                <VIcon :icon="data.icon" size="26" color="high-emphasis" />
              </VAvatar>
            </div>
          </VCol>
          <VDivider
            v-if="$vuetify.display.mdAndUp ? id !== props.widgetData.length - 1
              : $vuetify.display.smAndUp ? id % 2 === 0
                : false"
            vertical
            inset
            length="60"
          />
        </template>
      </VRow>

      <FilterCard
        v-if="props.tableConfig.expandedRows"
        v-model:modelValueSelectableStatus="props.tableConfig.filterStatus"
        v-model:modelValueSearch="props.search"
        :estado="props.estadosDisponibles"
        :filter-cards="props.tableConfig.filterCards || {}"
        class="mb-4"
      />
    </VCardText>
  </VCard>

  <VDataTable
    :headers="props.tableConfig.headers.main"
    :items="props.store.tableConfig.data"
    :items-per-page="itemsPerPage.value"
    :search="props.search"
    :page="page.value"
    expand-on-click
  >
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
      <VChip :color="resolveStatusVariant(item.state).color" size="small">
        {{ resolveStatusVariant(item.state).text }}
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
        @edit="props.handleAction('edit', item)"
        @delete="props.handleAction('delete', item)"
        @check="props.handleAction('check', item)"
        @goto="props.handleAction('goto', item)"
        @view="props.handleAction('view', item)"
        @finishProcess="props.handleAction('finishProcess', item)"
        @print="emit('print', item)"
      />
    </template>

    <template #bottom>
      <VCardText class="pt-2">
        <div class="d-flex flex-wrap justify-center justify-sm-space-between gap-y-2 mt-2">
          <VSelect
            v-model="itemsPerPage.value"
            :items="props.calculatedItemsPerPageOptions"
            label="Elementos por página:"
            variant="underlined"
            style="max-inline-size: 8rem; min-inline-size: 5rem;"
          />

          <VPagination
            v-model="page.value"
            :total-visible="$vuetify.display.smAndDown ? 3 : 5"
            :length="Math.ceil(totalItems.value / itemsPerPage.value)"
          />
        </div>
      </VCardText>
    </template>
  </VDataTable>
</template>
