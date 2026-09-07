export class CustomerRepository {
  async getAll() {
    throw new Error('CustomerRepository.getAll() must be implemented');
  }

  async getById(id) {
    throw new Error('CustomerRepository.getById() must be implemented');
  }

  async create(customer) {
    throw new Error('CustomerRepository.create() must be implemented');
  }

  async update(id, customer) {
    throw new Error('CustomerRepository.update() must be implemented');
  }
}
