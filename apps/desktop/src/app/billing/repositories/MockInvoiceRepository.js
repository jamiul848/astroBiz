import { astroBizMockRepository } from '../../shared/repositories/AstroBizMockRepository.js';
import { InvoiceRepository } from './InvoiceRepository.js';

export class MockInvoiceRepository extends InvoiceRepository {
  constructor() {
    super();
    this.store = astroBizMockRepository;
  }

  async getAll() {
    return this.store.getInvoices();
  }

  async getById(id) {
    return this.store.getInvoiceById(id);
  }

  async getByCustomerId(customerId) {
    return this.store.getInvoicesByCustomerId(customerId);
  }

  async create(invoice) {
    return this.store.createInvoice(invoice);
  }

  async update(id, invoice) {
    return this.store.updateInvoice(id, invoice);
  }

  async updatePaymentStatus(id, status) {
    return this.update(id, { paymentStatus: status });
  }
}
