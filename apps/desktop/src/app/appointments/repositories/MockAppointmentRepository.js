import { appointmentData } from '../../../data/mock/appointmentData.js';
import { AppointmentRepository } from './AppointmentRepository.js';

const clone = (value) => structuredClone(value);

export class MockAppointmentRepository extends AppointmentRepository {
  constructor(initialAppointments = appointmentData) {
    super();
    this.appointments = clone(initialAppointments);
  }

  async simulateLatency() { await new Promise((resolve) => window.setTimeout(resolve, 160)); }
  async getAll() { await this.simulateLatency(); return clone(this.appointments); }
  async getById(id) { await this.simulateLatency(); return clone(this.appointments.find((appointment) => appointment.id === id) || null); }
  async getByCustomerId(customerId) { await this.simulateLatency(); return clone(this.appointments.filter((appointment) => appointment.customerId === customerId)); }
  async create(appointment) { await this.simulateLatency(); const created = { ...clone(appointment), id: `apt-${Date.now()}` }; this.appointments = [created, ...this.appointments]; return clone(created); }
  async update(id, appointment) { await this.simulateLatency(); const index = this.appointments.findIndex((record) => record.id === id); if (index === -1) throw new Error('Appointment not found'); this.appointments[index] = { ...this.appointments[index], ...clone(appointment), id }; return clone(this.appointments[index]); }
  async cancel(id) { return this.update(id, { status: 'Cancelled' }); }
}
