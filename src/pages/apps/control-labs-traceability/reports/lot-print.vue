<script setup>
import { useBatchStore } from '@/stores/apps/control-labs-traceability'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'


const route = useRoute()
const batchStore = useBatchStore()

onMounted(() => {
  console.log('batchStore', batchStore.currentProcess)
  window.addEventListener('beforeunload', handleBeforeUnload)
  window.addEventListener('popstate', handlePopState)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
  window.removeEventListener('popstate', handlePopState)
})

const userData = useCookie("userData").value

const calculateTimeDifference = (start, end) => {
  const parseDate = (dateString) => {
    const [date, time] = dateString.split(', ')
    const [day, month, year] = date.split('/')
    return new Date(`${year}-${month}-${day}T${time}`)
  }

  const startDate = parseDate(start)
  const endDate = parseDate(end)

  const diffTime = Math.abs(endDate - startDate)
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
  const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60))

  return `${diffHours} hora${diffHours !== 1 ? 's' : ''} ${diffMinutes} minutos`
}

const lote = computed(() => batchStore.currentProcess?.item_batch_id || '')

const dateNow = computed(() => {
  const date = new Date()
  return date.toLocaleDateString('es-DO', { year: 'numeric', month: '2-digit', day: '2-digit' })
})

const groupedAndSortedData = computed(() => {
  const equipmentMap = new Map()
  const equipments = batchStore.currentProcess?.equipments || []

  equipments.forEach(equipment => {
    if (!equipmentMap.has(equipment.equipment_name)) {
      equipmentMap.set(equipment.equipment_name, {
        equipo: equipment.equipment_name,
        descripcion: equipment.equipment_desc,
        horarios: []
      })
    }
    const entry = equipmentMap.get(equipment.equipment_name)
    entry.horarios.push({
      inicio: equipment.start_date,
      fin: equipment.real_date,
      tiempo: calculateTimeDifference(equipment.start_date, equipment.real_date),
      prueba: equipment.test_quality,
      tecnico: equipment.user_code
    })
  })

  const sortedEquipments = Array.from(equipmentMap.values())
  sortedEquipments.forEach(equipment => {
    equipment.horarios.sort((a, b) => new Date(a.inicio) - new Date(b.inicio))
  })
  return sortedEquipments
})

const printInvoice = () => {
  if (groupedAndSortedData.value.length > 0) {
    window.print()
  } else {
    alert('No hay datos para imprimir.')
  }
}

const handleBeforeUnload = (event) => {
  const confirmationMessage = '¿Estás seguro de que deseas salir? Cualquier cambio no guardado se perderá.'
  event.preventDefault()
  event.returnValue = confirmationMessage // Compatibilidad con navegadores antiguos
  return confirmationMessage
}

const handlePopState = (event) => {
  const confirmationMessage = '¿Estás seguro de que deseas salir? Cualquier cambio no guardado se perderá.'
  if (!confirm(confirmationMessage)) {
    router.push(route.fullPath) // Redirigir a la misma página
  }
}
</script>

<template>
  <section>
    <VRow>
      <VCol
        cols="12"
        md="9"
      >
        <VCard>
          <!-- SECTION Header -->
          <div
            v-if="groupedAndSortedData.length > 0"
            class="header-to-print"
          >
            <VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row print-row">
              <!-- 👉 Left Content -->
              <div class="ma-sm-4">
                <div class="d-flex align-center mb-6">
                  <!-- 👉 Logo -->
                  <VNodeRenderer
                    :nodes="themeConfig.app.logo"
                    class="me-3"
                  />
                  <!-- 👉 Title -->
                  <h4 class="font-weight-bold text-capitalize text-h4">
                    Laboratorio Rowe
                  </h4>
                </div>
                <p>
                  Office 149, 450 South Brand Brooklyn<br>
                  San Diego County, CA 91905, USA<br>
                  +1 (123) 456 7891, +44 (876) 543 2198
                </p>
              </div>
              <!-- 👉 Right Content -->
              <div class="mt-4 ma-sm-4">
                <!-- 👉 Invoice ID -->
                <h4 class="font-weight-medium text-h4">
                  N.Lote # {{ lote }}
                </h4>
                <!-- 👉 Issue Date -->
                <p class="my-3">
                  <span>Fecha: </span>
                  <span>{{ dateNow }}</span>
                </p>
              </div>
            </VCardText>
          </div>
        
          <!-- 👉 Payment Details -->
          <VCardText class="d-flex justify-space-between flex-wrap flex-column flex-sm-row print-row">
            <div class="ma-sm-4">
              <h6 class="text-base font-weight-medium mb-6">
                Generado Por:
              </h6>
              <strong>
                <p class="mb-1">
                  {{ userData.full_name }}
                </p>
              </strong>
              <p class="mb-1">
                Control de Calidad
              </p>
            </div>
          </VCardText>
          <!-- 👉 Table -->
          <VCardText v-if="groupedAndSortedData.length > 0">
            <VTable
              dense
              class="invoice-preview-table"
            >
              <thead>
                <tr>
                  <th>Equipos</th>
                  <th>Descripción</th>
                  <th>Uso del equipo</th>
                  <th>Técnico</th>
                </tr>
              </thead>
              <tbody>
                <template
                  v-for="(equipment, equipmentIndex) in groupedAndSortedData"
                  :key="`equipment-${equipmentIndex}`"
                >
                  <tr>
                    <td>{{ equipment.equipo }}</td>
                    <td>{{ equipment.descripcion }}</td>
                    <td>
                      <template
                        v-for="(horario, horarioIndex) in equipment.horarios"
                        :key="`horario-${horarioIndex}`"
                      >
                        <div>
                          {{ horario.inicio }} - {{ horario.fin }} - Tiempo total: ({{ horario.tiempo }})
                        </div>
                        <div>{{ horario.prueba }}</div>
                      </template>
                    </td>
                    <td>
                      <template
                        v-for="(horario, horarioIndex) in equipment.horarios"
                        :key="`tecnico-${horarioIndex}`"
                      >
                        <div>{{ horario.tecnico }}</div>
                      </template>
                    </td>
                  </tr>
                </template>
              </tbody>
            </VTable>
          </VCardText>
          <VDivider class="mb-2" />
          <VCardText v-if="groupedAndSortedData.length > 0">
            <div class="d-flex mx-sm-4">
              <h6 class="text-base font-weight-medium me-1">
                Nota:
              </h6>
              <span>Este documento es para uso exclusivamente interno y confidencial. No se debe compartir fuera de la organización sin autorización previa.</span>
            </div>
          </VCardText>
          <div v-else>
            No hay información disponible para imprimir.
          </div>
        </VCard>
      </VCol>
      <VCol
        cols="12"
        md="3"
        class="d-print-none"
      >
        <VCard>
          <VCardText>           
            <VBtn
              block
              variant="tonal"
              prepend-icon="tabler-printer"
              color="primary"
              class="mb-2"
              @click="printInvoice"
            >
              Imprimir
            </VBtn>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </section>
</template>

<style lang="scss">
@media print {
  .v-theme--dark {
    --v-theme-surface: 255, 255, 255;
    --v-theme-on-surface: 94, 86, 105;
  }

  body {
    background: none !important;
  }

  @page {
    margin: 20mm;
    size: auto;
    size: landscape;
  }

  .layout-page-content,
  .v-row,
  .v-col-md-9 {
    padding: 0;
    margin: 0;
  }

  .navigation-drawer,
  .layout-vertical-nav,
  .app-customizer-toggler,
  .layout-footer,
  .layout-navbar,
  .layout-navbar-and-nav-container .d-print-none {
    display: none;
  }

  .v-card {
    box-shadow: none !important;
  }

  .print-row {
    flex-direction: row !important;
  }

  .layout-content-wrapper {
    padding-inline-start: 0 !important;
  }

  .v-table__wrapper {
    overflow: hidden !important;
  }

  .header-to-print {
    position: fixed;
    background: white;
    inline-size: 100%;
    inset-block-start: 0;
    page-break-after: avoid;
  }
}
</style>
