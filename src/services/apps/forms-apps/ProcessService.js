import ApiService from '../../ApiService'

class ProcessService extends ApiService {  
  async getAllProcesses() {
    return this.fetchAll('/control_lab_traceability/process')
  }
  
  async getProcessById(id) {
    return this.fetchById(`/control_lab_traceability/process/${id}`)
  }
  
  async getSamplingById(id) {
    return this.fetchById(`/control_lab_traceability/samples/${id}`)
  }
  
  async createProcess(data) {
    return this.create('/control_lab_traceability/process', data)
  }
  
  async aggregateSamples(data) {
    return this.create('/control_lab_traceability/samples', data)
  }
  
  async updateProcessState(id, newState) {
    return this.update(`/control_lab_traceability/process/${id}`, newState)
  }
  
  async updateSamplesState(id, newState) {
    return this.update(`/control_lab_traceability/samples/${id}`, newState)
  }
}
  
export const processService = new ProcessService()
