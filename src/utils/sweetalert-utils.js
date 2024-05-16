import { useBackgroundStore } from '@/stores/theme/useBackgroundStore'
import Swal from 'sweetalert2'


// Función para mostrar una alerta de confirmación
export const mostrarAlertaConfirmacion = (titulo, mensaje, accionConfirmada) => {
  const { colorDeFondo } = useBackgroundStore()

  Swal.fire({
    title: titulo,
    text: mensaje,
    icon: 'warning',
    background: colorDeFondo, 
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, Ejecutar!',
    cancelButtonText: 'Cancelar',
  }).then(result => {
    if (result.isConfirmed) {
      accionConfirmada()
    }
  })
}

// Función para mostrar una alerta de éxito
export const mostrarAlertaExito = mensaje => {


  Swal.fire({
    title: '¡Éxito!',
    text: mensaje,
    icon: 'success',
    background: colorDeFondo, // Aplica el color de fondo
  })
}

// Función para mostrar una alerta de error
export const mostrarAlertaError = mensaje => {
  const colorDeFondo = obtenerColorDeFondo()

  Swal.fire({
    title: 'Error',
    text: mensaje,
    icon: 'error',
    background: colorDeFondo, // Aplica el color de fondo
  })
}
