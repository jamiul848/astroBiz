export class CRMRepository {
  async getAllCustomers() {
    throw new Error('CRMRepository.getAllCustomers() must be implemented');
  }

  async getCustomerById(id) {
    throw new Error('CRMRepository.getCustomerById() must be implemented');
  }

  async getFollowUps() {
    throw new Error('CRMRepository.getFollowUps() must be implemented');
  }

  async getFollowUpsForCustomer(customerId) {
    throw new Error('CRMRepository.getFollowUpsForCustomer() must be implemented');
  }

  async getActivitiesForCustomer(customerId) {
    throw new Error('CRMRepository.getActivitiesForCustomer() must be implemented');
  }

  async createFollowUp(followUp) {
    throw new Error('CRMRepository.createFollowUp() must be implemented');
  }

  async updateFollowUp(id, followUp) {
    throw new Error('CRMRepository.updateFollowUp() must be implemented');
  }

  async completeFollowUp(id, completedAt = new Date().toISOString()) {
    throw new Error('CRMRepository.completeFollowUp() must be implemented');
  }

  async cancelFollowUp(id) {
    throw new Error('CRMRepository.cancelFollowUp() must be implemented');
  }
}
