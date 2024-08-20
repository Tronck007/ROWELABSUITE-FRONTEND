/* eslint-disable */
import { defineStore } from "pinia";
import { materialConsumptionService } from "@/services/apps/control-labs-traceability/MaterialConsumptionService"; // Ajusta la ruta según la estructura de tu proyecto

// Obtiene los datos del usuario desde una cookie
const userData = useCookie("userData").value;

// Define la tienda para el manejo de consumos de materiales
export const useMaterialConsumptionStore = defineStore("materialConsumption", {
  state: () => ({
    materialConsumptions: [], // Arreglo para almacenar los consumos de materiales
    isLoading: false, // Indicador de carga
  }),
  actions: {
    // Acción para obtener todos los consumos de materiales
    async fetchAllMaterialConsumptions() {
      this.isLoading = true;
      try {
        const { data } =
          await materialConsumptionService.getAllMaterialConsumptions();
        this.materialConsumptions = data;
      } catch (error) {
        console.error("Error fetching material consumptions:", error);
      } finally {
        this.isLoading = false;
      }
    },

    // Acción para obtener el inventario por lote
    async fetchBatchInventory(batchId) {
      try {
        const { data } = await materialConsumptionService.getBatchById(batchId);
        this.batchInventory = data[0]; // Almacena el primer elemento del inventario del lote
      } catch (error) {
        console.error("Error fetching batch inventory:", error);
      }
    },

    // Acción para agregar un nuevo consumo de material
    async addMaterialConsumption(materialConsumptionData) {
      this.isLoading = true;
      try {
        const { body } =
          await materialConsumptionService.addMaterialConsumption({
            ...materialConsumptionData,
            userCode: userData.user_code,
            userId: userData.user_id,
            email: userData.email,
          });
        this.materialConsumptions.push(body.data); // Agrega el nuevo consumo a la lista
        notify("creation", "ok"); // Notifica que la creación fue exitosa
      } catch (error) {
        console.error("Error adding material consumption:", error);
        notify("creation", "fail");
      } finally {
        this.isLoading = false;
      }
    },

    // Acción para actualizar un consumo de material existente
    async updateMaterialConsumption(materialId, materialConsumptionData) {
      this.isLoading = true;
      try {
        const { body } =
          await materialConsumptionService.updateMaterialConsumption(
            materialId,
            {
              ...materialConsumptionData,
              userCode: userData.user_code,
              userId: userData.user_id,
              email: userData.email,
            },
          );
        const index = this.materialConsumptions.findIndex(
          (item) => item._id === materialId,
        );
        if (index !== -1) {
          this.materialConsumptions[index] = body.data;
          notify("update", "ok"); // Notifica que la actualización fue exitosa
        }
      } catch (error) {
        console.error("Error updating material consumption:", error);
        notify("update", "fail");
      } finally {
        this.isLoading = false;
      }
    },

    // Acción para realizar un borrado lógico de un consumo de material
    async softDeleteMaterialConsumption(materialId) {
      this.isLoading = true;
      try {
        const { body } =
          await materialConsumptionService.softDeleteMaterialConsumption(
            materialId,
            {
              userCode: userData.user_code,
              userId: userData.user_id,
              email: userData.email,
            },
          );
        const index = this.materialConsumptions.findIndex(
          (item) => item._id === materialId,
        );
        if (index !== -1) {
          this.materialConsumptions[index].status = "deleted";
          notify("deletion", "ok"); // Notifica que el borrado fue exitoso
        }
      } catch (error) {
        console.error("Error soft deleting material consumption:", error);
        notify("deletion", "fail");
      } finally {
        this.isLoading = false;
      }
    },
  },
});
