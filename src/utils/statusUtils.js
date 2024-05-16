export const resolveStatusVariant = status => {
  if (status === "Created") {
    return {
      color: 'primary',
      text: 'Creado',
    }
  } else if (status === "Completed" ) {
    return {
      color: 'success',
      text: 'Completo',
    }
  } else if (status === "In Process" || status === true) {
    return {
      color: 'info',
      text: 'En Proceso',
    }
  } else if (status === "On Hold") {
    return {
      color: 'warning',
      text: 'Retenido',
    }
  } 
  // eslint-disable-next-line sonarjs/no-duplicated-branches
  else {
    return {
      color: 'success',
      text: 'Completo',
    }
  }
}
