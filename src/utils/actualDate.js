import moment from "moment-timezone"

export const getDominicanRepublicDateTime = () => {
  return moment.tz("America/Santo_Domingo").toDate()
}


export const getDominicanRepublicDateOnly = () => {
  return moment.tz("America/Santo_Domingo").format("DD/MM/YYYY")
}
