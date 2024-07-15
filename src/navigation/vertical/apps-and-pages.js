/* eslint-disable semi */
export default [
  { heading: "Apps" },
  {
    title: "Control Lab Traceability",
    icon: { icon: "tabler-hexagons" },
    children: [
      {
        title: "Proceso",
        to: {
          name: "apps-control-labs-traceability-process-samples",
          meta: { action: "read", subject: "Process" },
        },
      },
      {
        title: "Histórico",
        to: {
          name: "apps-control-labs-traceability-process-samples-history",
          meta: { action: "read", subject: "Process" },
        },
      },
      {
        title: "Board",
        to: {
          name: "apps-control-labs-traceability-equipment-board-equipment",
          meta: { action: "read", subject: "Process-Equipment" },
        },
      },
      {
        title: "Equipos",
        icon: { icon: "tabler-hexagons" },
        children: [
          {
            title: "Listado",
            to: {
              name: "apps-control-labs-traceability-equipment-list-equipment",
              meta: { action: "read", subject: "Equipment-Catalog" },
            },
          },
          {
            title: "Reportes Abiertos",
            to: {
              name: "apps-control-labs-traceability-reports-report-equipment",
              meta: { action: "read", subject: "Report-Equipment" },
            },
          },
        ],
      },
    ],
  },
];
