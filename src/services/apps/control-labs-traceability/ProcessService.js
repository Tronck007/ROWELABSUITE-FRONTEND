/* eslint-disable camelcase */
/* eslint-disable sonarjs/no-redundant-jump */
import ApiService from '../../ApiService'

class ProcessService extends ApiService {
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
  
  async createProcess(process) {    
    console.log('process', process)
    
    return  this.create('process', [process])
  }
  async aggregateSamples(processId, samples) {

   
    
    return this.updatePatch(`process/aggregate/${processId}`, samples)
  
  }
  
  async deleteProcess(id, newState) { 
    
    return this.delete(`process/${id}`, newState)
  }
  async endProcess(id, newState) { 
    
    return this.delete(`process/${id}`, newState)
  }
  
  async deleteSamples(id, newState) {
    // Similar al método de actualizar proceso, pero para 'samples'.
    return this.update(`samples/${id}`, newState)
  }
}
  
export const processService = new ProcessService()
