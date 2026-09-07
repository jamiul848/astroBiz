import { kundaliData } from '../../../data/mock/kundaliData.js';
import { KundaliRepository } from './KundaliRepository.js';

const clone = (value) => structuredClone(value);

export class MockKundaliRepository extends KundaliRepository {
  constructor(initialKundalis = kundaliData) {
    super();
    this.kundalis = clone(initialKundalis);
  }

  async simulateLatency() {
    await new Promise((resolve) => window.setTimeout(resolve, 180));
  }

  async getAll() {
    await this.simulateLatency();
    return clone(this.kundalis);
  }

  async getById(id) {
    await this.simulateLatency();
    return clone(this.kundalis.find((kundali) => kundali.id === id) || null);
  }

  async getByCustomerId(customerId) {
    await this.simulateLatency();
    return clone(this.kundalis.find((kundali) => kundali.customerId === customerId) || null);
  }
}
