export class AppointmentRepository {
  async getAll() { throw new Error('AppointmentRepository.getAll() must be implemented'); }
  async getById(id) { throw new Error('AppointmentRepository.getById() must be implemented'); }
  async getByCustomerId(customerId) { throw new Error('AppointmentRepository.getByCustomerId() must be implemented'); }
  async create(appointment) { throw new Error('AppointmentRepository.create() must be implemented'); }
  async update(id, appointment) { throw new Error('AppointmentRepository.update() must be implemented'); }
  async cancel(id) { throw new Error('AppointmentRepository.cancel() must be implemented'); }
}
