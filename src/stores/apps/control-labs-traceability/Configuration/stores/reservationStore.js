/* eslint-disable semi */
/* eslint-disable camelcase */
import { reservationService } from "@/services/apps/control-labs-traceability/reservationService"; // Asegúrate de que la ruta de importación sea correcta
import { getDominicanRepublicDateTime } from "@/utils/actualDate";
import { defineStore } from "pinia";

const date = getDominicanRepublicDateTime();
const userData = useCookie("userData").value;

export const useReservationStore = defineStore("reservation", {
  state: () => ({
    reservations: [],
    isLoading: false,
    headers: [
      { title: "EQUIPO", key: "object_name" },
      { title: "DESCRIPCIÓN", key: "object_name" },
      { title: "INICIO", key: "program_start_equipment_process" },
      { title: "FINAL", key: "program_end_equipment_process" },
      { title: "T.RESTANTE", key: "quality_test_group_id" },
      { title: "ESTADO", key: "entity_lifecycle_id" },
      { title: "ACCIONES", key: "actions" },
    ],
  }),
  actions: {
    async fetchAllReservations() {
      this.isLoading = true;
      try {
        const data = await reservationService.getAllProcesses();

        this.reservations = data;
      } catch (error) {
        console.error("Error fetching reservations:", error);
      } finally {
        this.isLoading = false;
      }
    },

    async createReservation(processCode, reservationData) {
      // Asegúrate de obtener el valor actual del cookie aquí
      const { date, time, hora, minutos, equipment } = reservationData;
      const totalMinutos = hora * 60 + minutos;

      // Aquí concatenamos date y time para formar una cadena en el formato deseado
      const dateTimeString = `${date} ${time}`;

      const start = new Date(dateTimeString); // Esto ahora creará una fecha con la fecha y hora combinadas
      const end = new Date(start.getTime() + totalMinutos * 60000);
      const { equipment_name, equipment_desc } = equipment;

      const dataInfo = {
        processCode: processCode,
        reservationData: {
          equipment_name: equipment_name,
          equipment_desc: equipment_desc,
          program_start_equipment_process: start,
          program_end_equipment_process: end,
        },
        userCode: userData.user_code,
        userId: userData.user_id,
        email: userData.email,
      };

      try {
        const { body } = await reservationService.createReservation({
          ...dataInfo,
        });

        const { meta } = body;

        if (meta.status === 200) {
          notify("creation", "ok");
        } else {
          notify("creation", "fail");
        }
      } catch (error) {
        console.error("Error creating new process:", error);
      } finally {
        this.isLoading = false;
      }
    },

    async updateReservationState(id, newState) {
      this.isLoading = true;
      try {
        await reservationService.updateReservationState(id, newState);
      } catch (error) {
        console.error("Error updating reservation state:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  getters: {},
});
