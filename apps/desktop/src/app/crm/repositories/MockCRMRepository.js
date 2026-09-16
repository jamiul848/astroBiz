import { astroBizMockRepository } from '../../shared/repositories/AstroBizMockRepository.js';
import { CRMRepository } from './CRMRepository.js';

export class MockCRMRepository extends CRMRepository {
  constructor() {
    super();
    this.store = astroBizMockRepository;
  }

  async getAllCustomers() {
    return this.store.getCustomers();
  }

  async getCustomerById(id) {
    return this.store.getCustomerById(id);
  }

  async getFollowUps() {
    return this.store.getFollowUps();
  }

  async getFollowUpsForCustomer(customerId) {
    return this.store.getFollowUpsByCustomerId(customerId);
  }

  async getActivitiesForCustomer(customerId) {
    return this.store.getActivitiesByCustomerId(customerId);
  }

  async createFollowUp(followUp) {
    return this.store.createFollowUp(followUp);
  }

  async updateFollowUp(id, followUp) {
    return this.store.updateFollowUp(id, followUp);
  }

  async completeFollowUp(id, completedAt = new Date().toISOString()) {
    const followUp = await this.store.completeFollowUp(id);
    if (completedAt) {
      followUp.completedAt = completedAt;
    }
    return followUp;
  }

  async cancelFollowUp(id) {
    return this.store.updateFollowUp(id, { status: 'Cancelled' });
  }
}
