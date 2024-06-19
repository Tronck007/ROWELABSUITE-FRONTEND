/* eslint-disable semi */
import ApiService from "../../ApiService";

class CatalogService extends ApiService {
  constructor() {
    super("control_lab_traceability");
  }

  async getAllEquipment() {
    return this.fetchAll(`equipment`);
  }

  async getTestCatalogById(id) {
    return this.fetchById(`catalog/test/${id}`);
  }

  async getAllBatchHistory() {
    return this.fetchAll(`process/history`);
  }
}

export const catalogService = new CatalogService();
