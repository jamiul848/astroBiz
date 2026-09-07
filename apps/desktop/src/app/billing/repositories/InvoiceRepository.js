export class InvoiceRepository {
  async getAll() { throw new Error('InvoiceRepository.getAll() must be implemented'); }
  async getById(id) { throw new Error('InvoiceRepository.getById() must be implemented'); }
  async create(invoice) { throw new Error('InvoiceRepository.create() must be implemented'); }
  async update(id, invoice) { throw new Error('InvoiceRepository.update() must be implemented'); }
  async updatePaymentStatus(id, status) { throw new Error('InvoiceRepository.updatePaymentStatus() must be implemented'); }
}
