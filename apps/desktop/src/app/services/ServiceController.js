export class ServiceController {
  constructor(repository) {
    this.repository = repository;
    this.state = { services: [], selectedService: null, loading: false, error: null };
    this.listeners = new Set();
  }

  subscribe(listener) { this.listeners.add(listener); return () => this.listeners.delete(listener); }
  notify() { this.listeners.forEach((listener) => listener(this.state)); }
  setState(changes) { this.state = { ...this.state, ...changes }; this.notify(); }
  async load() { this.setState({ loading: true, error: null }); try { this.setState({ services: await this.repository.getAll(), loading: false }); } catch (error) { this.setState({ loading: false, error: error.message }); } }
  async selectService(id) { this.setState({ loading: true, error: null }); try { this.setState({ selectedService: await this.repository.getById(id), loading: false }); } catch (error) { this.setState({ loading: false, error: error.message }); } }
  clearSelection() { this.setState({ selectedService: null, error: null }); }
  async createService(service) { const created = await this.repository.create(service); this.setState({ services: [created, ...this.state.services] }); return created; }
  async updateService(id, service) { const updated = await this.repository.update(id, service); this.setState({ services: this.state.services.map((record) => record.id === id ? updated : record), selectedService: null }); return updated; }
  async setActive(id, active) { const updated = await this.repository.setActive(id, active); this.setState({ services: this.state.services.map((record) => record.id === id ? updated : record), selectedService: this.state.selectedService?.id === id ? updated : this.state.selectedService }); return updated; }
}
