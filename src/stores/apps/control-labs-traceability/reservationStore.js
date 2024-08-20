/* eslint-disable */
import { reservationService } from "@/services/apps/control-labs-traceability/reservationService"; // Asegúrate de que la ruta de importación sea correcta
import { getDominicanRepublicDateTime } from "@/utils/actualDate";
import { defineStore } from "pinia";

// Obtiene la fecha y hora actual de la República Dominicana
const date = getDominicanRepublicDateTime();
const userData = useCookie("userData").value;

// Define la tienda para manejar las reservas
export const useReservationStore = defineStore("reservation", {
  state: () => ({
    reservations: [], // Arreglo para almacenar las reservas
    isLoading: false, // Indicador de carga
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
    // Acción para obtener todas las reservas
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

    // Acción para crear una nueva reserva
    async createReservation(processCode, reservationData) {
      const { date, time, hora, minutos, equipment } = reservationData;
      const totalMinutos = hora * 60 + minutos;

      // Combina la fecha y hora para formar una cadena en el formato deseado
      const dateTimeString = `${date} ${time}`;
      const start = new Date(dateTimeString);
      const end = new Date(start.getTime() + totalMinutos * 60000);
      const { equipment_name, equipment_desc } = equipment;

      // Construye el objeto de datos de la reserva
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
        console.error("Error creating new reservation:", error);
      } finally {
        this.isLoading = false;
      }
    },

    // Acción para eliminar una reserva
    async deleteReservation(item) {
      const processCode = item.process_code;
      try {
        const updatedData = {
          equipmentId: item.id_equipment,
          status: "inactive",
          details: "Inactive by user",
          userId: userData.user_id,
          userCode: userData.user_code,
          email: userData.email,
        };

        const response = await equipmentService.endEquipment(
          processCode,
          updatedData,
        );
        const { body } = response;
        const { meta } = body;

        if (meta.status === 200) {
          notify("deletion", "ok");
          await this.getTestProcessById(processCode);
        } else {
          notify("deletion", "fail");
        }
      } catch (error) {
        console.error("Error ending reservation:", error);
      }
    },
  },
  getters: {},
});
