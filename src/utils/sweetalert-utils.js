import { useBackgroundStore } from "@/stores/theme/useBackgroundStore";
import Swal from "sweetalert2";

// Función auxiliar para obtener los colores de acuerdo al tipo de acción
const obtenerColoresPorTipo = (tipo) => {
  switch (tipo) {
    case "eliminar":
      return {
        confirmButtonColor: "#d33", // Rojo para eliminar
        cancelButtonColor: "#3085d6", // Azul para cancelar
        borderColor: "#d33", // Borde rojo para eliminar
      };
    case "completar":
      return {
        confirmButtonColor: "#28a745", // Verde para completar
        cancelButtonColor: "#d33", // Rojo para cancelar
        borderColor: "#28a745", // Borde verde para completar
      };
    default:
      return {
        confirmButtonColor: "#3085d6", // Azul por defecto
        cancelButtonColor: "#d33", // Rojo por defecto
        borderColor: "#ccc", // Borde por defecto
      };
  }
};

// Función para mostrar una alerta de confirmación
export const mostrarAlertaConfirmacion = (
  titulo,
  mensaje,
  accionConfirmada,
  tipo = "default",
) => {
  const { borderColor, confirmButtonColor, cancelButtonColor } =
    obtenerColoresPorTipo(tipo);

  Swal.fire({
    title: titulo,
    text: mensaje,
    icon: "warning",
    background: "#ffffff", // Fondo blanco
    showCancelButton: true,
    confirmButtonColor: confirmButtonColor,
    cancelButtonColor: cancelButtonColor,
    confirmButtonText: "Sí, Ejecutar!",
    cancelButtonText: "Cancelar",
    customClass: {
      popup: "custom-swal-popup",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      accionConfirmada();
    }
  });

  // Aplicar el borde
  setTimeout(() => {
    const popup = document.querySelector(".custom-swal-popup");
    if (popup) {
      popup.style.border = `4px solid ${borderColor}`;
    }
  }, 0);
};

// Función para mostrar una alerta de éxito
export const mostrarAlertaExito = (mensaje) => {
  Swal.fire({
    title: "¡Éxito!",
    text: mensaje,
    icon: "success",
    background: "#ffffff",
  });
};

// Función para mostrar una alerta de error
export const mostrarAlertaError = (mensaje) => {
  Swal.fire({
    title: "Error",
    text: mensaje,
    icon: "error",
    background: "#ffffff",
  });
};
