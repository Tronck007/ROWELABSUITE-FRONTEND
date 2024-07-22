/* eslint-disable semi */
/* eslint-disable camelcase */
/* eslint-disable sonarjs/no-redundant-jump */
import ApiService from "../../ApiService";

class EquipmentService extends ApiService {
  constructor() {
    super("/control_lab_traceability");
  }
  async getAllProcesses() {
    return this.fetchAll(`process`);
  }

  async getAllEquipmentStatus() {
    return this.fetchAll(`equipment/status`);
  }
  async getAllEquipment() {
    return this.fetchAll(`equipment`);
  }

  async getProcessById(id) {
    return this.fetchById(`process/${id}`);
  }

  async getSamplingById(id) {
    return this.fetchById(`catalog/sample/${id}`);
  }

  async createEquipmentProcess(equipment) {
    return this.create("equipment", equipment);
  }

  async endEquipment(id, newState) {
    return this.deleteEquipment(`state/equipment/${id}`, newState);
  }

  async deleteE(id, newState) {
    return this.deleteEquipment(`state/equipment/${id}`, newState);
  }
}

export const equipmentService = new EquipmentService();
