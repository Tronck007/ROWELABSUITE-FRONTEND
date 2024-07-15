/* eslint-disable sonarjs/no-identical-conditions */
/* eslint-disable sonarjs/no-duplicated-branches */
/* eslint-disable semi */
export const resolveStatusVariant = (status, state) => {
  console.log("state", status);
  if (status === "created") {
    return {
      color: "primary",
      text: "Creado",
    };
  } else if (status === "completed") {
    return {
      color: "success",
      text: "Completo",
    };
  } else if (state === true || status === "active") {
    return {
      color: "success",
      text: "Activo",
    };
  } else if (
    status === "in_process" ||
    status === "In Process" ||
    status === true
  ) {
    return {
      color: "info",
      text: "En Proceso",
    };
  } else if (status === "on_hold") {
    return {
      color: "warning",
      text: "Retenido",
    };
  } else if (status === "reserved") {
    return {
      color: "warning",
      text: "Reservado",
    };
  } else if (status === "fault") {
    return {
      color: "error",
      text: "Error",
    };
  } else {
    return {
      color: "default",
      text: "Desconocido",
    };
  }
};
