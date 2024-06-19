/* eslint-disable semi */
import { useCatalogStore } from "./catalogStore";
import { useDialogStore } from "./dialogStore";
import { useProcessStore } from "./processStore";
import { useReservationStore } from "./reservationStore";
import { useTestAndEquipment } from "./testAndEquipmentStore";
import { useBatchStore } from "./useBatchStore";

// Exporta los hooks de los stores para un fácil acceso
export {
  useCatalogStore,
  useDialogStore,
  useProcessStore,
  useReservationStore,
  useTestAndEquipment,
  useBatchStore,
};
