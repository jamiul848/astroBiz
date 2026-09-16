import { astroBizMockRepository } from '../../shared/repositories/AstroBizMockRepository.js';
import { AppointmentRepository } from './AppointmentRepository.js';

export class MockAppointmentRepository extends AppointmentRepository {
  constructor() {
    super();
    this.store = astroBizMockRepository;
  }

  async getAll() {
    return this.store.getAppointments();
  }

  async getById(id) {
    return this.store.getAppointmentById(id);
  }

  async getByCustomerId(customerId) {
    return this.store.getAppointmentsByCustomerId(customerId);
  }

  async create(appointment) {
    return this.store.createAppointment(appointment);
  }

  async update(id, appointment) {
    return this.store.updateAppointment(id, appointment);
  }

  async cancel(id) {
    return this.store.updateAppointment(id, { status: 'Cancelled' });
  }
}
