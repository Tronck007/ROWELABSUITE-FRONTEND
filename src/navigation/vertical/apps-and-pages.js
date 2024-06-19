export default [
  { heading: "Apps" },

  {
    title: "Control Lab Traceability",
    icon: { icon: "tabler-hexagons" },
    children: [
      {
        title: "Proceso ",
        to: "apps-control-labs-traceability-process-samples",
      },
      {
        title: "Histórico",
        to: "apps-control-labs-traceability-process-samples-history",
      },
      {
        title: "Board",
        to: "apps-control-labs-traceability-equipment-board-equipment",
      },
      {
        title: "Equipos",
        icon: { icon: "tabler-hexagons" },
        children: [
          {
            title: "Listado",
            to: "apps-control-labs-traceability-equipment-list-equipment",
          },
          {
            title: "Reportes Abiertos",
            to: "apps-control-labs-traceability-reports-report-equipment",
          },
        ],
      },
    ],
  },
];
