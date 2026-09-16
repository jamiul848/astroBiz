import { astroBizMockRepository } from '../../shared/repositories/AstroBizMockRepository.js';
import { CustomerRepository } from './CustomerRepository.js';

export class MockCustomerRepository extends CustomerRepository {
  constructor() {
    super();
    this.store = astroBizMockRepository;
  }

  async getAll() {
    return this.store.getCustomers();
  }

  async getById(id) {
    return this.store.getCustomerById(id);
  }

  async create(customer) {
    return this.store.createCustomer(customer);
  }

  async update(id, customer) {
    return this.store.updateCustomer(id, customer);
  }
}
