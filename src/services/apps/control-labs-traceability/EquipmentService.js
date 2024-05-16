/* eslint-disable camelcase */
/* eslint-disable sonarjs/no-redundant-jump */
import ApiService from '../../ApiService'

class EquipmentService extends ApiService {
  constructor() {
    super('/control_lab_traceability')
  }
  async getAllProcesses() {
    return this.fetchAll(`process`)
  }
  
  async getProcessById(id) {
    return this.fetchById(`process/${id}`)
  }
  
  async getSamplingById(id) {
    // Asumiendo que hay un error en la ruta proporcionada en tu código original,
    // y que deberías usar la estructura base de la clase para acceder a 'samples'.
    return this.fetchById(`catalog/sample/${id}`)
  }
  
  async createEquipmentProcess(equipment) {    
    console.log('process', process)
    
    return  this.create('equipment', equipment)
  }

  async endEquipment(id, newState) { 
    
    return this.deleteEquipment(`state/equipment/${id}`, newState)
  } 

  
  async deleteE(id, newState) {     
    return this.deleteEquipment(`state/equipment/${id}`, newState)
  }

}
  
export const equipmentService = new EquipmentService()
