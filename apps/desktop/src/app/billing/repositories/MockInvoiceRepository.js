import { invoiceData } from '../../../data/mock/invoiceData.js';
import { InvoiceRepository } from './InvoiceRepository.js';

const clone = (value) => structuredClone(value);

export class MockInvoiceRepository extends InvoiceRepository {
  constructor(initialInvoices = invoiceData) { super(); this.invoices = clone(initialInvoices); }
  async simulateLatency() { await new Promise((resolve) => window.setTimeout(resolve, 160)); }
  async getAll() { await this.simulateLatency(); return clone(this.invoices); }
  async getById(id) { await this.simulateLatency(); return clone(this.invoices.find((invoice) => invoice.id === id) || null); }
  async create(invoice) { await this.simulateLatency(); const created = { ...clone(invoice), id: `inv-${Date.now()}`, invoiceNumber: `INV-2024-${String(this.invoices.length + 1).padStart(3, '0')}` }; this.invoices = [created, ...this.invoices]; return clone(created); }
  async update(id, invoice) { await this.simulateLatency(); const index = this.invoices.findIndex((record) => record.id === id); if (index === -1) throw new Error('Invoice not found'); this.invoices[index] = { ...this.invoices[index], ...clone(invoice), id }; return clone(this.invoices[index]); }
  async updatePaymentStatus(id, status) { return this.update(id, { paymentStatus: status }); }
}
