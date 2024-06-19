/* eslint-disable indent */
/* eslint-disable camelcase */
/* eslint-disable arrow-parens */
/* eslint-disable semi */
import { defineStore } from "pinia";
import { equipmentService } from "@/services/apps/control-labs-traceability/EquipmentService";
import libreImage from "@images/status/Libre.png";
import reservadoImage from "@images/status/Reservado.png";
import ocupadoImage from "@images/status/Ocupado.png";
import noAnilibleImage from "@images/status/NoDisponible.png";
import placeholderImage from "@images/status/placeholder.png";

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

export const useEquipmentStore = defineStore("equipment", {
  state: () => ({
    originalData: [],
    isLoading: false,
    currentIndexes: {},
  }),
  actions: {
    async fetchAllEquipment() {
      this.isLoading = true;
      try {
        const { data } = await equipmentService.getAllEquipment();

        this.originalData = data.map((item, index) => ({
          id: index + 1,
          _id: item._id,
          equipment_name: item.equipment_name,
          equipment_desc: item.equipment_desc,
          type_object: item.type_object,
          display_board: item.display_board,
          imageUrl: `${IMAGE_BASE_URL}${item.imageUrl}`, // Concatenate directly
          status: item.status,
          program_end_equipment_process:
            item.program_end_equipment_process || "00:00:00",
        }));
      } catch (error) {
        console.log("Error fetching equipment:", error);
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
        imageUrl: `${IMAGE_BASE_URL}${imageUrl}`, // Concatenate directly
        display_board,
      });
    },

    initializeIndexes() {
      for (const type in this.groupedEquipment) {
        this.currentIndexes[type] = 0;
      }
    },

    rotateVisibleEquipment() {
      const equipmentTypes = Object.keys(this.groupedEquipment);

      const currentIndex =
        (this.currentIndexes.value + 6) % equipmentTypes.length;

      this.currentIndexes.value = currentIndex;
    },

    rotateVisibleEquipmentCard() {
      for (const type in this.currentIndexes) {
        const group = this.groupedEquipment[type];
        if (group.length > 4) {
          this.currentIndexes[type] =
            (this.currentIndexes[type] + 1) % group.length;
        }
      }
    },

    getVisibleEquipmentCard(equipmentGroup, equipmentType) {
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
    },
  },
  getters: {
    groupedEquipment: (state) => {
      return state.originalData.reduce((acc, equipment) => {
        if (equipment.display_board) {
          // Ensure only those with display_board = true are included
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
  },
});
