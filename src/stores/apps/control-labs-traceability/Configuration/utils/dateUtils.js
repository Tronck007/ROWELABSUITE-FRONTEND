
export function convertDateTime(inputString) {
  const date = new Date(inputString);
  return date.toISOString();
}

export function calculateRemainingTime(endTime) {
  const endDate = new Date(endTime);
  const now = new Date(); // Asegúrate de obtener la fecha actual en cada llamada
  const difference = endDate.getTime() - now.getTime();
  return Math.max(Math.floor(difference / 60000), 0); // Convertir a minutos y evitar valores negativos
}
