export class AppointmentController {
  constructor(repository, customerRepository, serviceRepository) {
    this.repository = repository;
    this.customerRepository = customerRepository;
    this.serviceRepository = serviceRepository;
    this.state = { appointments: [], customers: [], services: [], selectedAppointment: null, currentDate: '2024-06-14', view: 'day', loading: false, error: null };
    this.listeners = new Set();
  }

  subscribe(listener) { this.listeners.add(listener); return () => this.listeners.delete(listener); }
  notify() { this.listeners.forEach((listener) => listener(this.state)); }
  setState(changes) { this.state = { ...this.state, ...changes }; this.notify(); }
  async load() {
    this.setState({ loading: true, error: null });
    try { const [appointments, customers, services] = await Promise.all([this.repository.getAll(), this.customerRepository.getAll(), this.serviceRepository.getAll()]); this.setState({ appointments, customers, services, loading: false }); }
    catch (error) { this.setState({ loading: false, error: error.message }); }
  }
  async resolveAppointment(appointment) {
    if (!appointment) return null;
    const [customer] = await Promise.all([this.customerRepository.getById(appointment.customerId)]);
    return { ...appointment, customerName: customer?.name || 'Unknown customer', serviceName: this.state.services.find((service) => service.id === appointment.serviceId)?.name || 'Unknown service' };
  }
  async selectAppointment(id) { this.setState({ loading: true, error: null }); try { this.setState({ selectedAppointment: await this.resolveAppointment(await this.repository.getById(id)), loading: false }); } catch (error) { this.setState({ loading: false, error: error.message }); } }
  clearSelection() { this.setState({ selectedAppointment: null, error: null }); }
  setView(view) { this.setState({ view }); }
  setCurrentDate(currentDate) { this.setState({ currentDate }); }
  async createAppointment(appointment) { const created = await this.repository.create(appointment); this.setState({ appointments: [created, ...this.state.appointments] }); return created; }
  async updateAppointment(id, appointment) { const updated = await this.repository.update(id, appointment); this.setState({ appointments: this.state.appointments.map((record) => record.id === id ? updated : record), selectedAppointment: null }); return updated; }
  async cancelAppointment(id) { const cancelled = await this.repository.cancel(id); this.setState({ appointments: this.state.appointments.map((record) => record.id === id ? cancelled : record), selectedAppointment: null }); return cancelled; }
  getEnrichedAppointments() { return this.state.appointments.map((appointment) => ({ ...appointment, customerName: this.state.customers.find((customer) => customer.id === appointment.customerId)?.name || 'Unknown customer', serviceName: this.state.services.find((service) => service.id === appointment.serviceId)?.name || 'Unknown service' })); }
}
