import ApiService from '../../ApiService'

class TestEquipmentService extends ApiService {
  constructor() {
    super('control_lab_traceability')
  }

  async createTests(processData) {
    return this.create(processData, 'test')
  }
  async createEquipment(processData) {
    return this.create(processData, 'equipment')
  }
}

// Creando e exportando una instancia de TestEquipmentService
export const testEquipmentService = new TestEquipmentService()
