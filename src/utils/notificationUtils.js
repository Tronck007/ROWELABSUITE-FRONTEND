import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

// Mensajes definidos para diferentes acciones y resultados
const messages = {
  creation: {
    ok: "¡Excelente! El elemento se ha creado con éxito 😎👍",
    empty: "No se puede crear un elemento vacío. Por favor, completa los campos requeridos 📝",
    fail: "Parece que hubo un problema creando el elemento 😢",
  },
  update: {
    ok: "Actualización realizada correctamente. ¡Buen trabajo! 😊",
    fail: "Ocurrió un error al intentar actualizar. Por favor, intenta nuevamente 😞",
  },
  deletion: {
    ok: "Eliminado correctamente. El elemento ya no existe 🗑️",
    fail: "No se pudo eliminar el elemento. ¿Quizás está siendo usado en otro lugar? 🤔",
  },
  fetch: {
    ok: "Datos obtenidos satisfactoriamente 📊",
    fail: "Error al cargar los datos. Verifica tu conexión y vuelve a intentarlo 😓",
  },
  auth: {
    loginSuccess: "Inicio de sesión exitoso. Bienvenido/a de nuevo 😄",
    loginFail: "No se pudo iniciar sesión. Revisa tu usuario y contraseña 🚫",
    logout: "Has cerrado sesión. ¡Esperamos verte pronto! 👋",
  },
  addition: {
    duplicate: "El elemento ya existe y no se añadirá de nuevo 🚫🔁",
    fail: "Los nuevos Id de muestra no coinciden con grupo de pruebas existentes y no se agregaron 🔍❌",
    empty: "No se encontraron Id de muestra válidos para agregar 🚫📦",
    ok: "Id de muestra añadida correctamente ✅📦",
  },
}

// Función para disparar notificaciones
export const notify = (action, result) => {
  const message = messages[action][result]

  if (result === 'ok') {
    toast.success(message, { position: toast.POSITION.TOP_RIGHT, autoClose: 3000, transition: 'zoom' })
  } else {
    toast.error(message, { position: toast.POSITION.TOP_RIGHT, autoClose: 3000, transition: 'zoom' })
  }
}
