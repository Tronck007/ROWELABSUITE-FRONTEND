/* eslint-disable camelcase */
import ApiService from "../../ApiService";

class MaterialConsumptionService extends ApiService {
  constructor() {
    super("/control_lab_traceability");
  }

  async getAllMaterialConsumptions() {
    return this.fetchAll("material-consumption");
  }
  async getBatchById(batchId) {
    return this.fetchById(`catalog/inventory/${batchId}`);
  }

  async addMaterialConsumption(materialConsumption) {
    return this.create("material-consumption", materialConsumption);
  }

  async updateMaterialConsumption(materialId, materialConsumption) {
    return this.update(
      `material-consumption/${materialId}`,
      materialConsumption,
    );
  }

  async softDeleteMaterialConsumption(materialId, newState) {
    return this.delete(`material-consumption/${materialId}`, newState);
  }
}

export const materialConsumptionService = new MaterialConsumptionService();
