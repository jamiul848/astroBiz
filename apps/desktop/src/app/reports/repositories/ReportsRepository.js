export class ReportsRepository {
  async getOverview(period = 'thisMonth', range = {}) {
    throw new Error('ReportsRepository.getOverview must be implemented by a concrete repository.');
  }
}
