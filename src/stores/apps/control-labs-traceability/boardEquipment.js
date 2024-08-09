/* eslint-disable semi */
/* eslint-disable camelcase */
import { defineStore } from "pinia";
import { equipmentService } from "@/services/apps/control-labs-traceability/EquipmentService";
import libreImage from "@images/status/Libre.png";
import reservadoImage from "@images/status/Reservado.png";
import ocupadoImage from "@images/status/Ocupado.png";
import noAnilibleImage from "@images/status/NoDisponible.png";
import placeholderImage from "@images/status/placeholder.png";

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
const userData = useCookie("userData").value;

export const useEquipmentStore = defineStore("equipment", {
  state: () => ({
    originalData: [],
    isLoading: false,
    headers: [
      { title: "EQUIPO", key: "equipment_name" },
      { title: "DESCRIPCIÓN", key: "equipment_desc" },
      { title: "TIPO DE EQUIPO", key: "type_object" },
      { title: "LOCALIZACIÓN", key: "location" },
      { title: "DISPONIBILIDAD", key: "status" },
      { title: "ESTADO", key: "is_active" },
      { title: "ACCIONES", key: "actions" },
    ],
    currentIndexes: {},
  }),
  actions: {
    async fetchAllEquipmentStatus() {
      this.isLoading = true;
      try {
        const { data } = await equipmentService.getAllEquipmentStatus();
        this.originalData = data.map((item, index) => ({
          id: index + 1,
          _id: item._id,
          equipment_name: item.equipment_name,
          equipment_desc: item.equipment_desc,
          type_object: item.type_object,
          display_board: item.display_board,
          imageUrl: item.imageUrl
            ? `${IMAGE_BASE_URL}${item.imageUrl}`
            : placeholderImage,
          status: item.status,
          program_end_equipment_process:
            item.program_end_equipment_process || "00:00:00",
        }));
      } catch (error) {
        console.error("Error fetching equipment:", error);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchAllEquipment() {
      this.isLoading = true;
      try {
        const { data } = await equipmentService.getAllEquipment();
        this.originalData = data.map((item, index) => ({
          ...item,
          id: `${index}`,
          imageUrl: item.imageUrl
            ? `${IMAGE_BASE_URL}${item.imageUrl}`
            : placeholderImage,
        }));
      } catch (error) {
        console.error("Error fetching equipment:", error);
      } finally {
        this.isLoading = false;
      }
    },

    updateStatus(id, newStatus) {
      const equipment = this.originalData.find((eq) => eq.id === id);
      if (equipment) {
        equipment.status = newStatus;
      }
    },

    addEquipment(
      type_object,
      equipment_name,
      status,
      remaining,
      imageUrl,
      display_board,
    ) {
      const id = this.originalData.length + 1;
      this.originalData.push({
        id,
        type_object,
        equipment_name,
        status,
        program_end_equipment_process: remaining,
        imageUrl: imageUrl ? `${IMAGE_BASE_URL}${imageUrl}` : placeholderImage,
        display_board,
      });
    },

    initializeIndexes() {
      for (const type in this.groupedEquipment) {
        if (!this.currentIndexes[type]) {
          this.currentIndexes[type] = 0;
        }
      }
    },

    rotateVisibleEquipmentCard() {
      for (const type in this.currentIndexes) {
        const group = this.groupedEquipment[type];
        if (group && group.length > 4) {
          this.currentIndexes[type] =
            (this.currentIndexes[type] + 1) % group.length;
        }
      }
    },

    getVisibleEquipmentCard(equipmentGroup, equipmentType) {
      try {
        if (!equipmentGroup) {
          console.error(
            `equipmentGroup is undefined or null for type: ${equipmentType}`,
          );
          return [];
        }

        if (typeof this.currentIndexes[equipmentType] === "undefined") {
          this.currentIndexes[equipmentType] = 0;
        }

        const totalVisible = 4;
        const visibleEquipment = [];

        if (equipmentGroup.length < totalVisible) {
          for (let i = 0; i < totalVisible; i++) {
            if (i < equipmentGroup.length) {
              visibleEquipment.push(equipmentGroup[i]);
            } else {
              visibleEquipment.push(null);
            }
          }
        } else {
          for (let i = 0; i < totalVisible; i++) {
            const index =
              (this.currentIndexes[equipmentType] + i) % equipmentGroup.length;
            visibleEquipment.push(equipmentGroup[index]);
          }
        }

        return visibleEquipment;
      } catch (error) {
        console.error(
          `Error in getVisibleEquipmentCard for ${equipmentType}:`,
          error,
        );
        return [];
      }
    },
  },
  getters: {
    groupedEquipment: (state) => {
      return state.originalData.reduce((acc, equipment) => {
        if (equipment.display_board) {
          if (!acc[equipment.type_object]) {
            acc[equipment.type_object] = [];
          }
          acc[equipment.type_object].push(equipment);
        }
        return acc;
      }, {});
    },

    getEquipmentImage: () => (imageUrl) => {
      return imageUrl || placeholderImage;
    },

    getStatusImage: () => (status) => {
      switch (status) {
        case "free":
          return libreImage;
        case "reserved":
          return reservadoImage;
        case "in_process":
          return ocupadoImage;
        case "fault":
          return noAnilibleImage;
        default:
          return placeholderImage;
      }
    },

    getChipColor: () => (status) => {
      const colors = {
        free: "success",
        reserved: "primary",
        in_process: "warning",
        fault: "error",
      };
      return colors[status] || "";
    },

    equipmentTransformation: (state) => (equipmentData) => {
      return equipmentData.map((data) => ({
        id: data.id,
        equipment_name: data.equipment_name,
        equipment_desc: data.equipment_desc,
        type_object: data.type_object,
        location: data.location,
        status: data.status,
        is_active: data.is_active,
        imageUrl: data.imageUrl,
        program_end_equipment_process: formatIsoDateTimeToReadable(
          data.program_end_equipment_process,
        ),
      }));
    },

    transformedData(state) {
      return state.equipmentTransformation(state.originalData);
    },

    tableConfig(state) {
      return {
        headers: {
          main: state.headers,
        },
        filterSubtables: "",
        filterCards: {
          searchInput: true,
          filterStatus: false,
        },
        expandedRows: true,
        buttonConfigs: {
          main: {
            showFinishButton: false,
            showEdit: true,
            showDelete: false,
            showCheck: false,
            showGoto: false,
          },
          sub: {
            showEdit: false,
            showDelete: true,
            showCheck: false,
            showGoto: false,
          },
        },
        goToPage: "equipmentDetails",
        isLoading: state.isLoading,
        data: state.transformedData,
      };
    },
  },
});
