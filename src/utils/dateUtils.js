/**
 * Formatea una fecha en formato ISO a un formato más legible con fecha y hora.
 * @param {string} isoDate - La fecha en formato ISO, como "2024-02-25T14:37:28.260Z".
 * @returns {string} La fecha y hora formateadas, como "25/02/2024, 14:37".
 */
export function formatIsoDateTimeToReadable(isoDate) {
  const date = new Date(isoDate)
  
  return date.toLocaleString('es-ES', { // 'es-ES' se puede cambiar por tu localidad preferida
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // Cambiar a true si prefieres formato de 12 horas
  })
}
