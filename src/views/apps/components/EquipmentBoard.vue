<template>
  <VRow>
    <VCol
      v-for="(equipmentGroup, type) in visibleGroupedEquipment"
      :key="type"
      sm="6"
      cols="12"
    >
      <VCard>
        <div class="d-flex justify-space-between flex-wrap flex-md-nowrap flex-column flex-md-row">
          <div class="ma-auto pa-5 flex-grow-1">
            <VImg
              width="137"
              height="176"
              :src="getEquipmentImage(equipmentGroup[0]?.imageUrl)"
            />
          </div>

          <VDivider
            class="flex-grow-0 flex-shrink-0"
            :vertical="display.mdAndUp"
          />

          <div class="flex-grow-1">
            <h1>{{ type.toUpperCase() }}</h1>
            <VCardItem>
              <VRow>
                <VCol
                  v-for="(equipment, index) in getVisibleEquipmentCard(equipmentGroup, type)"
                  :key="index"
                  :sm="getColSize"
                  cols="12"
                >
                  <div v-if="equipment" class="equipment-item">
                    <img
                      :src="getStatusImage(equipment.status)"
                      alt="status"
                      class="status-icon"
                    >
                    <h4 class="equipment-info">
                      {{ equipment.equipment_name }}
                    </h4>
                    <strong>Restante</strong>
                    <VChip
                      :label="false"
                      :color="getChipColor(equipment.status)"
                    >
                      {{ equipment.program_end_equipment_process }}
                    </VChip>
                  </div>
                  <div v-else class="equipment-item placeholder">
                    <VImg
                      :src="placeholderImage"
                      alt="placeholder"
                      class="status-icon"
                    />
                  </div>
                </VCol>
              </VRow>
            </VCardItem>
          </div>
        </div>
      </VCard>
    </VCol>
  </VRow>
</template>

<script setup>
import { computed, reactive, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import { useEquipmentStore } from '@/stores/apps/control-labs-traceability/boardEquipment'
import placeholderImage from '@images/status/placeholder.png'

const equipmentStore = useEquipmentStore()
const display = useDisplay()

const currentIndex = reactive({ value: 0 })

const typesToShow = computed(() => {
  return Object.keys(equipmentStore.groupedEquipment).slice(currentIndex.value, currentIndex.value + 6)
})

const visibleGroupedEquipment = computed(() => {
  const equipmentTypes = typesToShow.value
  const visibleGroups = {}

  equipmentTypes.forEach(type => {
    if (equipmentStore.groupedEquipment[type]) {
      visibleGroups[type] = equipmentStore.groupedEquipment[type]
    }
  })

  console.log(visibleGroups)

  return visibleGroups
})

onMounted(async () => {
  await equipmentStore.fetchAllEquipment()
  equipmentStore.initializeIndexes()

  setInterval(() => {
    currentIndex.value = (currentIndex.value + 6) % Object.keys(equipmentStore.groupedEquipment).length
  }, 25000)
  setInterval(() => {
    equipmentStore.rotateVisibleEquipmentCard()
  }, 4000)
})

const getEquipmentImage = imageUrl => {
  return imageUrl || placeholderImage
}

const getStatusImage = status => {
  return equipmentStore.getStatusImage(status)
}

const getChipColor = status => {
  return equipmentStore.getChipColor(status)
}

const getVisibleEquipmentCard = (equipmentGroup, type) => {
  return equipmentStore.getVisibleEquipmentCard(equipmentGroup, type)
}

const getColSize = computed(() => {
  if (display.mdAndUp.value) return 3
  if (display.smAndUp.value) return 4
  return 12
})
</script>

<style scoped>
.equipment-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

.status-icon {
  width: 100%; /* Ajusta el ancho al 100% del contenedor */
  max-width: 100px; /* Máximo ancho para pantallas grandes */
  height: auto; /* Mantiene la proporción */
}

.responsive-image {
  width: 100%; /* Ajusta el ancho al 100% del contenedor */
  height: auto; /* Mantiene la proporción */
}

.equipment-info {
  margin-top: 5px;
  text-align: center;
  font-size: 1.1em;
}

.placeholder .status-icon {
  opacity: 0.5;
}
</style>
