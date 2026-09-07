export class KundaliRepository {
  async getAll() {
    throw new Error('KundaliRepository.getAll() must be implemented');
  }

  async getById(id) {
    throw new Error('KundaliRepository.getById() must be implemented');
  }

  async getByCustomerId(customerId) {
    throw new Error('KundaliRepository.getByCustomerId() must be implemented');
  }
}
