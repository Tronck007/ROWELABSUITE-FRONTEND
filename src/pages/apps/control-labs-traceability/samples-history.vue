/* stylelint-disable CssSyntaxError */
<script setup>
import { VNodeRenderer } from '@layouts/components/VNodeRenderer';
import { themeConfig } from '@themeConfig';

const route = useRoute('apps-invoice-preview-id')


const jsonData =ref({ 
  "data": [
    {
      "item_batch_id": "20758",
      "item_id": "35738CH",
      "samples": [
        {
          "sampling_id": "MUES-A000064348",
        },
      ],
      "equipments": [
        {
          "equipment_name": "10007",
          "equipment_desc": "Baño de maría",
          "program_start_equipment_process": "2024-04-17T17:56:48.325Z",
          "program_end_equipment_process": "2024-04-17T18:06:48.325Z",
          "real_end_equipment_process": "2024-04-17T18:07:00.983Z",
          "createdBy": {
            "user_id": 464,
            "transaction_id": "c252be4c-5005-472c-aa10-dd05c09135cc",
            "timestamp": "2024-04-17T15:57:16.000Z",
          },
          "updatedBy": {
            "user_id": 464,
            "transaction_id": "c252be4c-5005-472c-aa10-dd05c09135cc",
            "timestamp": "2024-04-17T15:57:16.000Z",
          },
          "tests": [
            {
              "quality_test_id": "P_A0141",
              "quality_test_desc": "Bacterias gram negativas tolerantes a la bilis",
            },
          ],
        },
        {
          "equipment_name": "10038",
          "equipment_desc": "Baño de Precisión 28L",
          "program_start_equipment_process": "2024-04-17T18:00:29.653Z",
          "program_end_equipment_process": "2024-04-17T18:05:29.653Z",
          "real_end_equipment_process": "2024-04-17T18:06:00.926Z",
          "createdBy": {
            "user_id": 464,
            "transaction_id": "7bc63bb5-d1f4-47e2-9671-8498130d75ba",
            "timestamp": "2024-04-17T15:57:16.000Z",
          },
          "updatedBy": {
            "user_id": 464,
            "transaction_id": "7bc63bb5-d1f4-47e2-9671-8498130d75ba",
            "timestamp": "2024-04-17T15:57:16.000Z",
          },
          "tests": [
            {
              "quality_test_id": "P_A0006",
              "quality_test_desc": "Descripción",
            },
            {
              "quality_test_id": "P_A2057",
              "quality_test_desc": "Densidad",
            },
          ],
        },
        {
          "equipment_name": "10064",
          "equipment_desc": "Mechero Fireboy Plus",
          "program_start_equipment_process": "2024-04-17T18:01:22.837Z",
          "program_end_equipment_process": "2024-04-17T18:04:22.837Z",
          "real_end_equipment_process": "2024-04-17T18:05:00.864Z",
          "createdBy": {
            "user_id": 464,
            "transaction_id": "18c5bef7-a1a2-4339-aa76-59521a09f11b",
            "timestamp": "2024-04-17T15:57:16.000Z",
          },
          "updatedBy": {
            "user_id": 464,
            "transaction_id": "18c5bef7-a1a2-4339-aa76-59521a09f11b",
            "timestamp": "2024-04-17T15:57:16.000Z",
          },
          "tests": [
            {
              "quality_test_id": "P_A2066",
              "quality_test_desc": "Burkholderia cepacia",
            },
          ],
        },
        {
          "equipment_name": "10104",
          "equipment_desc": "HPLC #31 Chromaster",
          "program_start_equipment_process": "2024-04-17T18:06:01.077Z",
          "program_end_equipment_process": "2024-04-17T18:18:01.077Z",
          "real_end_equipment_process": "2024-04-17T18:19:00.707Z",
          "createdBy": {
            "user_id": 464,
            "transaction_id": "01ab82c8-15c2-4eff-b853-ef7fc9d17757",
            "timestamp": "2024-04-17T15:57:16.000Z",
          },
          "updatedBy": {
            "user_id": 464,
            "transaction_id": "01ab82c8-15c2-4eff-b853-ef7fc9d17757",
            "timestamp": "2024-04-17T15:57:16.000Z",
          },
          "tests": [
            {
              "quality_test_id": "P_A1800",
              "quality_test_desc": "pH",
            },
          ],
        },
        {
          "equipment_name": "10383",
          "equipment_desc": "Penetrador  de Supositorios",
          "program_start_equipment_process": "2024-04-17T18:06:01.077Z",
          "program_end_equipment_process": "2024-04-17T18:16:01.077Z",
          "real_end_equipment_process": "2024-04-17T18:17:00.582Z",
          "createdBy": {
            "user_id": 464,
            "transaction_id": "d719cc3b-4370-41c1-bd20-12dbe420cef4",
            "timestamp": "2024-04-17T15:57:16.000Z",
          },
          "updatedBy": {
            "user_id": 464,
            "transaction_id": "d719cc3b-4370-41c1-bd20-12dbe420cef4",
            "timestamp": "2024-04-17T15:57:16.000Z",
          },
          "tests": [
            {
              "quality_test_id": "P-A2355",
              "quality_test_desc": "Mesófilos aerobios totales",
            },
            {
              "quality_test_id": "P_A0615",
              "quality_test_desc": "Salmonella",
            },
          ],
        },
        {
          "equipment_name": "10034",
          "equipment_desc": "Automuestreador ICP",
          "program_start_equipment_process": "2024-04-17T18:06:01.077Z",
          "program_end_equipment_process": "2024-04-17T18:31:01.077Z",
          "real_end_equipment_process": "2024-04-18T11:05:00.964Z",
          "createdBy": {
            "user_id": 464,
            "transaction_id": "2e68bae3-a505-436b-bb80-a22573147b95",
            "timestamp": "2024-04-17T15:57:16.000Z",
          },
          "updatedBy": {
            "user_id": 464,
            "transaction_id": "2e68bae3-a505-436b-bb80-a22573147b95",
            "timestamp": "2024-04-17T15:57:16.000Z",
          },
          "tests": [
            {
              "quality_test_id": "P_A2057",
              "quality_test_desc": "Densidad",
            },
            {
              "quality_test_id": "P_A0006",
              "quality_test_desc": "Descripción",
            },
          ],
        },
      ],
    },
    {
      "item_batch_id": "20758",
      "item_id": "35738CH",
      "samples": [
        {
          "sampling_id": "MUES-A000064349",
        },
      ],
      "equipments": [
        {
          "equipment_name": "10007",
          "equipment_desc": "Baño de maría",
          "program_start_equipment_process": "2024-04-17T17:56:48.325Z",
          "program_end_equipment_process": "2024-04-17T18:06:48.325Z",
          "real_end_equipment_process": "2024-04-17T18:07:00.983Z",
          "createdBy": {
            "user_id": 464,
            "transaction_id": "c252be4c-5005-472c-aa10-dd05c09135cc",
            "timestamp": "2024-04-17T15:57:16.000Z",
          },
          "updatedBy": {
            "user_id": 464,
            "transaction_id": "c252be4c-5005-472c-aa10-dd05c09135cc",
            "timestamp": "2024-04-17T15:57:16.000Z",
          },
          "tests": [
            {
              "quality_test_id": "P_A0141",
              "quality_test_desc": "Bacterias gram negativas tolerantes a la bilis",
            },
          ],
        },
        {
          "equipment_name": "10038",
          "equipment_desc": "Baño de Precisión 28L",
          "program_start_equipment_process": "2024-04-17T18:00:29.653Z",
          "program_end_equipment_process": "2024-04-17T18:05:29.653Z",
          "real_end_equipment_process": "2024-04-17T18:06:00.926Z",
          "createdBy": {
            "user_id": 464,
            "transaction_id": "7bc63bb5-d1f4-47e2-9671-8498130d75ba",
            "timestamp": "2024-04-17T15:57:16.000Z",
          },
          "updatedBy": {
            "user_id": 464,
            "transaction_id": "7bc63bb5-d1f4-47e2-9671-8498130d75ba",
            "timestamp": "2024-04-17T15:57:16.000Z",
          },
          "tests": [
            {
              "quality_test_id": "P_A0006",
              "quality_test_desc": "Descripción",
            },
            {
              "quality_test_id": "P_A2057",
              "quality_test_desc": "Densidad",
            },
          ],
        },
        {
          "equipment_name": "10064",
          "equipment_desc": "Mechero Fireboy Plus",
          "program_start_equipment_process": "2024-04-17T18:01:22.837Z",
          "program_end_equipment_process": "2024-04-17T18:04:22.837Z",
          "real_end_equipment_process": "2024-04-17T18:05:00.864Z",
          "createdBy": {
            "user_id": 464,
            "transaction_id": "18c5bef7-a1a2-4339-aa76-59521a09f11b",
            "timestamp": "2024-04-17T15:57:16.000Z",
          },
          "updatedBy": {
            "user_id": 464,
            "transaction_id": "18c5bef7-a1a2-4339-aa76-59521a09f11b",
            "timestamp": "2024-04-17T15:57:16.000Z",
          },
          "tests": [
            {
              "quality_test_id": "P_A2066",
              "quality_test_desc": "Burkholderia cepacia",
            },
          ],
        },
        {
          "equipment_name": "10104",
          "equipment_desc": "HPLC #31 Chromaster",
          "program_start_equipment_process": "2024-04-17T18:06:01.077Z",
          "program_end_equipment_process": "2024-04-17T18:18:01.077Z",
          "real_end_equipment_process": "2024-04-17T18:19:00.707Z",
          "createdBy": {
            "user_id": 464,
            "transaction_id": "01ab82c8-15c2-4eff-b853-ef7fc9d17757",
            "timestamp": "2024-04-17T15:57:16.000Z",
          },
          "updatedBy": {
            "user_id": 464,
            "transaction_id": "01ab82c8-15c2-4eff-b853-ef7fc9d17757",
            "timestamp": "2024-04-17T15:57:16.000Z",
          },
          "tests": [
            {
              "quality_test_id": "P_A1800",
              "quality_test_desc": "pH",
            },
          ],
        },
        {
          "equipment_name": "10383",
          "equipment_desc": "Penetrador  de Supositorios",
          "program_start_equipment_process": "2024-04-17T18:06:01.077Z",
          "program_end_equipment_process": "2024-04-17T18:16:01.077Z",
          "real_end_equipment_process": "2024-04-17T18:17:00.582Z",
          "createdBy": {
            "user_id": 464,
            "transaction_id": "d719cc3b-4370-41c1-bd20-12dbe420cef4",
            "timestamp": "2024-04-17T15:57:16.000Z",
          },
          "updatedBy": {
            "user_id": 464,
            "transaction_id": "d719cc3b-4370-41c1-bd20-12dbe420cef4",
            "timestamp": "2024-04-17T15:57:16.000Z",
          },
          "tests": [
            {
              "quality_test_id": "P-A2355",
              "quality_test_desc": "Mesófilos aerobios totales",
            },
            {
              "quality_test_id": "P_A0615",
              "quality_test_desc": "Salmonella",
            },
          ],
        },
        {
          "equipment_name": "10034",
          "equipment_desc": "Automuestreador ICP",
          "program_start_equipment_process": "2024-04-17T18:06:01.077Z",
          "program_end_equipment_process": "2024-04-17T18:31:01.077Z",
          "real_end_equipment_process": "2024-04-18T11:05:00.964Z",
          "createdBy": {
            "user_id": 464,
            "transaction_id": "2e68bae3-a505-436b-bb80-a22573147b95",
            "timestamp": "2024-04-17T15:57:16.000Z",
          },
          "updatedBy": {
            "user_id": 464,
            "transaction_id": "2e68bae3-a505-436b-bb80-a22573147b95",
            "timestamp": "2024-04-17T15:57:16.000Z",
          },
          "tests": [
            {
              "quality_test_id": "P_A2057",
              "quality_test_desc": "Densidad",
            },
            {
              "quality_test_id": "P_A0006",
              "quality_test_desc": "Descripción",
            },
          ],
        },
      ],
    },
  ] })

const userData = useCookie("userData").value

const calculateTimeDifference = (start, end) => {
  const startDate = new Date(start)
  const endDate = new Date(end)
  const diffTime = Math.abs(endDate - startDate)
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
  const diffMinutes = Math.floor((diffTime / (1000 * 60)) % 60)
  
  return `${diffHours} hora${diffHours !== 1 ? 's' : ''} ${diffMinutes} minutos`
}

const lote = computed(() => jsonData.value.data[0].item_batch_id)
const dateNow = computed(() => getDominicanRepublicDateOnly())

const formattedData = computed(() => {
  const data = jsonData.value.data.flatMap(item =>
    item.equipments.flatMap(equipment => 
      equipment.tests.map(test => ({
        equipo: equipment.equipment_name,
        descripcion: equipment.equipment_desc,
        prueba: `${test.quality_test_id} -> ${test.quality_test_desc}`,
        inicio: formatIsoDateTimeToReadable(equipment.program_start_equipment_process),
        fin: formatIsoDateTimeToReadable(equipment.real_end_equipment_process),
        tiempo: calculateTimeDifference(equipment.program_start_equipment_process, equipment.real_end_equipment_process),
      })),
    ),
  )

  return Object.values(data)
})

const groupedAndSortedData = computed(() => {
  const equipmentMap = new Map()

  // Agrupar las pruebas por equipo y por horario
  for (const row of formattedData.value) {
    let equipment = equipmentMap.get(row.equipo)
    if (!equipment) {
      equipment = {
        equipo: row.equipo,
        descripcion: row.descripcion,
        horarios: [],
        tiempo: row.tiempo,
      }
      equipmentMap.set(row.equipo, equipment)
    }

    // Encuentra un horario existente o crea uno nuevo
    let horario = equipment.horarios.find(h => h.inicio === row.inicio && h.fin === row.fin)
    if (!horario) {
      horario = {
        inicio: row.inicio,
        fin: row.fin,

        pruebas: new Set(), // Usar un conjunto para evitar duplicados
      }
      equipment.horarios.push(horario)
    }

    // Añadir prueba al conjunto, si no está ya presente
    horario.pruebas.add(row.prueba)
  }

  // Ordenar los horarios dentro de cada equipo
  equipmentMap.forEach(equipment => {
    equipment.horarios.sort((a, b) => new Date(a.inicio) - new Date(b.inicio))
  })

  // Convertir el Map en un array y ordenar los equipos por la fecha del primer horario
  return Array.from(equipmentMap.values()).sort((a, b) => {
    return new Date(a.horarios[0].inicio) - new Date(b.horarios[0].inicio)
  })
})


function formatName(value) {
  return value
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const printInvoice = () => {
  if (groupedAndSortedData.value.length > 0) {
    window.print()
  } else {
    alert('No hay datos para imprimir.')
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
                  <h6 class="font-weight-bold text-capitalize text-h4">
                    Laboratorio Rowe
                  </h6>
                </div>
              </div>
              <!-- 👉 Right Content -->
              <div class="mt-4 ma-sm-4">
                <!-- 👉 Invoice ID -->
                <h6 class="font-weight-medium text-h4">
                  N.Lote # {{ lote }}
                </h6>
                <!-- 👉 Issue Date -->
                <p class="my-3">
                  <span>Fecha: </span>
                  <span>{{ dateNow }}</span>
                </p>
              </div>
            </VCardText>
          </div>
          <!-- !SECTION -->
          <!-- 👉 Payment Details -->
          <VCardText class="d-flex justify-space-between flex-wrap flex-column flex-sm-row print-row">
            <div class="ma-sm-4">
              <h6 class="text-base font-weight-medium mb-6">
                Generado Por:
              </h6>
              <strong>
                <p class="mb-1">
                  {{ formatName(userData.full_name) }}
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
                          {{ horario.inicio }} - {{ horario.fin }} - Tiempo total: ({{ equipment.tiempo }})
                        </div>
                        <div
                          v-for="prueba in horario.pruebas"
                          :key="prueba"
                        >
                          {{ prueba }}
                        </div>
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
                Note:
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
 

    .print-row {
      flex-direction: row !important;
    }
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
