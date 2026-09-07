import { customerData } from '../../../data/mock/customerData.js';
import { CustomerRepository } from './CustomerRepository.js';

const clone = (value) => structuredClone(value);

export class MockCustomerRepository extends CustomerRepository {
  constructor(initialCustomers = customerData) {
    super();
    this.customers = clone(initialCustomers);
  }

  async simulateLatency() {
    await new Promise((resolve) => window.setTimeout(resolve, 180));
  }

  async getAll() {
    await this.simulateLatency();
    return clone(this.customers);
  }

  async getById(id) {
    await this.simulateLatency();
    const customer = this.customers.find((record) => record.id === id);
    return customer ? clone(customer) : null;
  }

  async create(customer) {
    await this.simulateLatency();
    const created = { ...clone(customer), id: `cus-${Date.now()}`, dateAdded: 'Today', avatarColor: 'accent' };
    this.customers = [created, ...this.customers];
    return clone(created);
  }

  async update(id, customer) {
    await this.simulateLatency();
    const index = this.customers.findIndex((record) => record.id === id);
    if (index === -1) throw new Error('Customer not found');
    this.customers[index] = { ...this.customers[index], ...clone(customer), id };
    return clone(this.customers[index]);
  }
}
