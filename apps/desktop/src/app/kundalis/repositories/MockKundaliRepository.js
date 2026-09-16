import { astroBizMockRepository } from '../../shared/repositories/AstroBizMockRepository.js';
import { KundaliRepository } from './KundaliRepository.js';

export class MockKundaliRepository extends KundaliRepository {
  constructor() {
    super();
    this.store = astroBizMockRepository;
  }

  async getAll() {
    return this.store.getKundalis();
  }

  async getById(id) {
    return this.store.getKundaliById(id);
  }

  async getByCustomerId(customerId) {
    return this.store.getKundalisByCustomerId(customerId);
  }
}
