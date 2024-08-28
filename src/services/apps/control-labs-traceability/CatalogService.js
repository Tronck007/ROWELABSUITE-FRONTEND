/* eslint-disable semi */
import ApiService from "../../ApiService";

class CatalogService extends ApiService {
  constructor() {
    super("control_lab_traceability");
  }

  async getAllEquipment(page = 1, limit = 10) {
    const queryParams = new URLSearchParams({ page, limit });

    return this.fetchAll(`equipment?${queryParams.toString()}`);
  }

  async getTestCatalogById(id) {
    return this.fetchById(`catalog/test/${id}`);
  }

  async getAllBatchHistory(page = 1, limit = 10) {
    const params = new URLSearchParams({ page, limit });

    return this.fetchAll(`process/history?${params.toString()}`);
  }
}

export const catalogService = new CatalogService();
