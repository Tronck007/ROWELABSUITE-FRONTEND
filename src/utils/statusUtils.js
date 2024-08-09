/* eslint-disable indent */
/* eslint-disable sonarjs/no-identical-conditions */
/* eslint-disable sonarjs/no-duplicated-branches */
/* eslint-disable semi */

// Define los colores disponibles
const colors = {
  primary: "#3498db", // Ejemplo de color primario, ajústalo si tienes un valor específico
  "on-primary": "#fff",
  secondary: "#A8AAAE",
  "on-secondary": "#fff",
  success: "#28C76F",
  "on-success": "#fff",
  info: "#00CFE8",
  "on-info": "#fff",
  warning: "#FF9F43",
  "on-warning": "#fff",
  error: "#EA5455",
  background: "#25293C",
  "on-background": "#D0D4F1",
  surface: "#2F3349",
  "on-surface": "#D0D4F1",
  "grey-50": "#26293A",
  "grey-100": "#2F3349",
  "grey-200": "#26293A",
  "grey-300": "#4A5072",
  "grey-400": "#5E6692",
  "grey-500": "#7983BB",
  "grey-600": "#AAB3DE",
  "grey-700": "#B6BEE3",
  "grey-800": "#CFD3EC",
  "grey-900": "#E7E9F6",
  "perfect-scrollbar-thumb": "#4A5072",
  "skin-bordered-background": "#2f3349",
  "skin-bordered-surface": "#2f3349",
};

// Función para resolver el color y el texto del estado
export const resolveStatusVariant = (status) => {
  switch (status) {
    case "created":
      return { color: colors.primary, text: "Creado" };
    case "in_process":
      return { color: colors.info, text: "En Proceso" };
    case "Revisado":
      return { color: colors.warning, text: "Revisado" };
    case "completed":
      return { color: colors.success, text: "Completado" };
    case "free":
      return { color: colors.success, text: "Libre" };
    case true:
      return { color: colors.success, text: "Activo" };
    case "On Hold":
      return { color: colors.warning, text: "En Espera" };
    case "Inactive":
      return { color: colors.error, text: "Inactivo" };
    case "Rechazado":
      return { color: colors.error, text: "Rechazado" };
    case "reserved":
      return { color: colors.warning, text: "Reservado" };
    case "Aprobado":
      return { color: colors.primary, text: "Aprobado" };
    case "Activa":
      return { color: colors.success, text: "Activa" };
    default:
      return { color: colors["grey-500"], text: "Estado Desconocido" };
  }
};
