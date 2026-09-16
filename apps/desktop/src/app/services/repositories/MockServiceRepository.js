import { astroBizMockRepository } from '../../shared/repositories/AstroBizMockRepository.js';
import { ServiceRepository } from './ServiceRepository.js';

export class MockServiceRepository extends ServiceRepository {
  constructor() {
    super();
    this.store = astroBizMockRepository;
  }

  async getAll() {
    return this.store.getServices();
  }

  async getById(id) {
    return this.store.getServiceById(id);
  }

  async create(service) {
    const created = { ...service, id: service.id || `svc-${Date.now()}` };
    this.store.data.services = [created, ...this.store.data.services];
    return structuredClone(created);
  }

  async update(id, service) {
    const index = this.store.data.services.findIndex((record) => record.id === id);
    if (index === -1) throw new Error('Service not found');
    this.store.data.services[index] = { ...this.store.data.services[index], ...service, id };
    return structuredClone(this.store.data.services[index]);
  }

  async setActive(id, active) {
    return this.update(id, { active });
  }
}
