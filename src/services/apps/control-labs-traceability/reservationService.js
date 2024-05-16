import ApiService from '../../ApiService'

class ReservationService extends ApiService {
  constructor() {
    super('/control_lab_traceability')
  }
  async getAllProcesses() {
    return this.fetchAll(`reservation`)
  }

  async createReservation(data) { 
    return this.create('reservation', data)
  } 
  
  async updateReservationState(id, newState) {
    return this.update(`reservation/${id}`, newState)
  }
}
  
export const reservationService = new ReservationService()
