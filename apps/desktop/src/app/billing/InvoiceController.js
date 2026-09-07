export class InvoiceController {
  constructor(repository, customerRepository, serviceRepository) {
    this.repository = repository;
    this.customerRepository = customerRepository;
    this.serviceRepository = serviceRepository;
    this.state = { invoices: [], customers: [], services: [], selectedInvoice: null, loading: false, error: null };
    this.listeners = new Set();
  }

  subscribe(listener) { this.listeners.add(listener); return () => this.listeners.delete(listener); }
  notify() { this.listeners.forEach((listener) => listener(this.state)); }
  setState(changes) { this.state = { ...this.state, ...changes }; this.notify(); }
  async load() { this.setState({ loading: true, error: null }); try { const [invoices, customers, services] = await Promise.all([this.repository.getAll(), this.customerRepository.getAll(), this.serviceRepository.getAll()]); this.setState({ invoices, customers, services, loading: false }); } catch (error) { this.setState({ loading: false, error: error.message }); } }
  resolveInvoice(invoice) { if (!invoice) return null; return { ...invoice, customer: this.state.customers.find((customer) => customer.id === invoice.customerId), service: this.state.services.find((service) => service.id === invoice.serviceId) }; }
  async selectInvoice(id) { this.setState({ loading: true, error: null }); try { this.setState({ selectedInvoice: this.resolveInvoice(await this.repository.getById(id)), loading: false }); } catch (error) { this.setState({ loading: false, error: error.message }); } }
  clearSelection() { this.setState({ selectedInvoice: null, error: null }); }
  async createInvoice(invoice) { const created = await this.repository.create(invoice); this.setState({ invoices: [created, ...this.state.invoices] }); return created; }
  async updateInvoice(id, invoice) { const updated = await this.repository.update(id, invoice); this.setState({ invoices: this.state.invoices.map((record) => record.id === id ? updated : record), selectedInvoice: null }); return updated; }
  getEnrichedInvoices() { return this.state.invoices.map((invoice) => ({ ...invoice, customer: this.state.customers.find((customer) => customer.id === invoice.customerId), service: this.state.services.find((service) => service.id === invoice.serviceId) })); }
  getSummary() { const invoices = this.state.invoices; return { totalRevenue: invoices.reduce((sum, invoice) => sum + invoice.total, 0), paidAmount: invoices.filter((invoice) => invoice.paymentStatus === 'Paid').reduce((sum, invoice) => sum + invoice.total, 0), pendingAmount: invoices.filter((invoice) => invoice.paymentStatus !== 'Paid').reduce((sum, invoice) => sum + invoice.total, 0), invoiceCount: invoices.length }; }
}
