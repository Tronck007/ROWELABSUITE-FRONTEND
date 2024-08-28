<script setup>
import ActionButton from '@/views/apps/ui/ActionButton.vue';
import EquipmentActions from '@/views/apps/components/EquipmentActions.vue';
import { VDataTableServer } from "vuetify/labs/VDataTable";


const props = defineProps({
  equipments: {
    type: Array,
    required: true,
  },
  totalEquipments: {
    type: Number,
    required: true,
  },
  selectedRows: {
    type: Array,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    required: true,
  },
  page: {
    type: Number,
    required: true,
  },
  sortBy: {
    type: String,
    required: true,
  },
  orderBy: {
    type: String,
    required: true,
  },
  headers: {
    type: Array,
    required: true,
  },
  searchQuery: {
    type: String,
    required: true,
  },
  selectedStatus: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:options', 'delete-equipment', 'update:search-query', 'update:selected-status', 'update:items-per-page']);

const updateOptions = (options) => {
  emit('update:options', options);
};
</script>

<template>
  <div>
    <!-- Equipment Actions -->
    <EquipmentActions
      :search-query="props.searchQuery"
      :selected-status="props.selectedStatus"
      :items-per-page="props.itemsPerPage"
      @update:search-query="(val) => emit('update:search-query', val)"
      @update:selected-status="(val) => emit('update:selected-status', val)"
      @update:items-per-page="(val) => emit('update:items-per-page', val)"
    />

    <!-- Equipment Table -->
    <VDataTableServer
      v-model="props.selectedRows"
      v-model:items-per-page="props.itemsPerPage"
      v-model:page="props.page"
      show-select
      :items-length="props.totalEquipments"
      :headers="props.headers"
      :items="props.equipments"
      item-value="id"
      class="text-no-wrap"
      @update:options="updateOptions"
    >
      <!-- id -->
      <template #item.id="{ item }">
        <RouterLink :to="{ name: 'equipment-details-id', params: { id: item.id } }">
          #{{ item.id }}
        </RouterLink>
      </template>

      <!-- status -->
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

      <!-- name -->
      <template #item.name="{ item }">
        <div class="d-flex align-center">
          <VAvatar
            size="34"
            :color="!item.avatar.length ? resolveEquipmentStatusVariantAndIcon(item.status).variant : undefined"
            :variant="!item.avatar.length ? 'tonal' : undefined"
            class="me-3"
          >
            <VImg
              v-if="item.avatar.length"
              :src="item.avatar"
            />
            <span v-else>{{ avatarText(item.name) }}</span>
          </VAvatar>
          <div class="d-flex flex-column">
            <RouterLink
              :to="{ name: 'equipment-details', params: { id: item.id } }"
              class="text-link font-weight-medium"
            >
              {{ item.name }}
            </RouterLink>
            <span class="text-sm text-medium-emphasis">{{ item.description }}</span>
          </div>
        </div>
      </template>

      <!-- Total -->
      <template #item.total="{ item }">
        {{ item.total }}
      </template>

      <!-- Actions -->
      <template #item.actions="{ item }">
        <ActionButton
          :item="item"
          :show-edit="true"
          :show-delete="true"
          @delete="() => emit('delete-equipment', item.id)"
        />
      </template>

      <!-- pagination -->
      <template #bottom>
        <TablePagination
          v-model:page="props.page"
          :items-per-page="props.itemsPerPage"
          :total-items="props.totalEquipments"
        />
      </template>
    </VDataTableServer>
  </div>
</template>
