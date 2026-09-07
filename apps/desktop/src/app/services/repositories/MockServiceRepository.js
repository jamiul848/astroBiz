import { serviceData } from '../../../data/mock/serviceData.js';
import { ServiceRepository } from './ServiceRepository.js';

const clone = (value) => structuredClone(value);

export class MockServiceRepository extends ServiceRepository {
  constructor(initialServices = serviceData) {
    super();
    this.services = clone(initialServices);
  }

  async simulateLatency() { await new Promise((resolve) => window.setTimeout(resolve, 160)); }
  async getAll() { await this.simulateLatency(); return clone(this.services); }
  async getById(id) { await this.simulateLatency(); return clone(this.services.find((service) => service.id === id) || null); }
  async create(service) { await this.simulateLatency(); const created = { ...clone(service), id: `svc-${Date.now()}` }; this.services = [created, ...this.services]; return clone(created); }
  async update(id, service) { await this.simulateLatency(); const index = this.services.findIndex((record) => record.id === id); if (index === -1) throw new Error('Service not found'); this.services[index] = { ...this.services[index], ...clone(service), id }; return clone(this.services[index]); }
  async setActive(id, active) { return this.update(id, { active }); }
}
