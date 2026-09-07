export class ServiceRepository {
  async getAll() { throw new Error('ServiceRepository.getAll() must be implemented'); }
  async getById(id) { throw new Error('ServiceRepository.getById() must be implemented'); }
  async create(service) { throw new Error('ServiceRepository.create() must be implemented'); }
  async update(id, service) { throw new Error('ServiceRepository.update() must be implemented'); }
  async setActive(id, active) { throw new Error('ServiceRepository.setActive() must be implemented'); }
}
