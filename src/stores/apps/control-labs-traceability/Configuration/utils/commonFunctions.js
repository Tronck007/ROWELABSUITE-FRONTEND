export function notify(type, status) {
  if (status === "ok") {
    console.log(`${type} succeeded`);
  } else {
    console.log(`${type} failed`);
  }
}

export function formatIsoDateTimeToReadable(dateTimeString) {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return new Date(dateTimeString).toLocaleString("es-ES", options);
}
