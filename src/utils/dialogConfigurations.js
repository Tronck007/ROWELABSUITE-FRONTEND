import ReportEquipment from "@/pages/apps/control-labs-traceability/reports/report-equipment.vue";
import { defineAsyncComponent } from "vue";

// Componentes dinámicos
export const dynamicComponents = {
  AddMuestras: defineAsyncComponent(
    () =>
      import(
        "@/views/apps/control-labs-traceability/components/addSamples.vue"
      ),
  ),
  Pruebas: defineAsyncComponent(
    () =>
      import(
        "@/views/apps/control-labs-traceability/components/TestAnEquipment.vue"
      ),
  ),
  Reserva: defineAsyncComponent(
    () =>
      import(
        "@/views/apps/control-labs-traceability/components/reservationSamples.vue"
      ),
  ),
  InsLabSamples: defineAsyncComponent(
    () =>
      import(
        "@/views/apps/control-labs-traceability/components/insLabSamples.vue"
      ),
  ),
  ToolsLabs: defineAsyncComponent(
    () =>
      import(
        "@/views/apps/control-labs-traceability/components/insLabSamples.vue"
      ),
  ),
  ReportEquipment: defineAsyncComponent(
    () =>
      import(
        "@/views/apps/control-labs-traceability/components/ReportEquipment.vue"
      ),
  ),
};

export const dialogMeta = {
  menuItems: [
    {
      icon: "tabler-qrcode",
      title: "Agregar",
      subtitle: "Muestras",
      actionId: 1,
    },
    {
      icon: "tabler-device-laptop",
      title: "Seleccionar",
      subtitle: "Equipos",
      actionId: 2,
    },
    {
      icon: "tabler-hourglass",
      title: "Reserva",
      subtitle: "Equipos",
      actionId: 3,
    },
    {
      icon: "tabler-test-pipe",
      title: "Consumo",
      subtitle: "Reactivo & Estandar",
      actionId: 4,
    },
    {
      icon: "tabler-tools",
      title: "Uso",
      subtitle: "Instrumentos",
      actionId: 5,
    },
    {
      icon: "tabler-calendar-event",
      title: "Reportar",
      subtitle: "Equipo",
      actionId: 6,
    },
  ],
  stepsConfig: [
    {
      actionId: 1,
      title: "Agregar Muestras",
      componentID: "AddMuestras",
    },
    {
      actionId: 2,
      title: "Seleccionar Pruebas",
      componentID: "Pruebas",
      propsRequired: ["catalogEquipment", "catalogTest"],
    },
    {
      actionId: 3,
      title: "Reservas de Equipos",
      componentID: "Reserva",
      propsRequired: ["catalogEquipment"],
    },
    {
      actionId: 4,
      title: "Consumo de Reactivo & Estandar",
      componentID: "InsLabSamples",
    },
    {
      actionId: 5,
      title: "Uso de Instrumentos de Laboratorio",
      componentID: "ToolsLabs",
    },
    {
      actionId: 6,
      title: "Reportar Equipo",
      componentID: "ReportEquipment",
    },
  ],
  componentMap: dynamicComponents, // Directamente usa el objeto de componentes dinámicos
};
