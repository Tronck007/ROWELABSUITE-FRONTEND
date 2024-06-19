/* eslint-disable sonarjs/no-identical-conditions */
/* eslint-disable sonarjs/no-duplicated-branches */
/* eslint-disable semi */
export const resolveStatusVariant = (status) => {
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
  } else if (
    status === "In Process" ||
    status === true ||
    status === "in_process"
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
  } else {
    return {
      color: "success",
      text: "Completo",
    };
  }
};
