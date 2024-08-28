<script setup>
const props = defineProps({
  searchQuery: {
    type: String,
    required: true,
  },
  selectedStatus: {
    type: Boolean,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    required: true,
  }
});

const emit = defineEmits(['update:searchQuery', 'update:selectedStatus', 'update:itemsPerPage']);

</script>

<template>
  <VCardText class="d-flex justify-space-between align-center flex-wrap gap-4">
    <div class="d-flex gap-4 align-center flex-wrap">
      <div class="d-flex align-center gap-2">
        <span>Show</span>
        <AppSelect
          :model-value="props.itemsPerPage"
          :items="[
            { value: 10, title: '10' },
            { value: 25, title: '25' },
            { value: 50, title: '50' },
            { value: 100, title: '100' },
            { value: -1, title: 'All' },
          ]"
          style="inline-size: 5.5rem;"
          @update:model-value="$emit('update:itemsPerPage', parseInt($event, 10))"
        />
      </div>
      <VBtn
        prepend-icon="tabler-plus"
        @click="$emit('create-equipment')"
      >
        Add Equipment
      </VBtn>
    </div>

    <div class="d-flex align-center flex-wrap gap-4">
      <!-- Search -->
      <div class="equipment-list-filter">
        <AppTextField
          v-model="props.searchQuery"
          placeholder="Search Equipment"
        />
      </div>

      <!-- Select status -->
      <div class="equipment-list-filter">
        <AppSelect
          v-model="props.selectedStatus"
          placeholder="Equipment Status"
          clearable
          clear-icon="tabler-x"
          single-line
          :items="['Available', 'In Use', 'Under Maintenance', 'Faulty']"
        />
      </div>
    </div>
  </VCardText>
</template>
