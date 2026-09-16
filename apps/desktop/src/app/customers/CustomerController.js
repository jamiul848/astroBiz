import { MockAppointmentRepository } from '../appointments/repositories/MockAppointmentRepository.js';
import { MockInvoiceRepository } from '../billing/repositories/MockInvoiceRepository.js';
import { MockCRMRepository } from '../crm/repositories/MockCRMRepository.js';
import { MockKundaliRepository } from '../kundalis/repositories/MockKundaliRepository.js';

export class CustomerController {
  constructor(repository) {
    this.repository = repository;
    this.state = {
      customers: [],
      searchQuery: '',
      statusFilter: 'all',
      selectedCustomer: null,
      customerRelationships: {
        kundalis: [],
        appointments: [],
        invoices: [],
        activities: [],
        followUps: [],
      },
      loading: false,
      error: null,
    };
    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((listener) => listener(this.state));
  }

  async load() {
    this.setState({ loading: true, error: null });
    try {
      const customers = await this.repository.getAll();
      this.setState({ customers, loading: false });
    } catch (error) {
      this.setState({ loading: false, error: error.message });
    }
  }

  setState(changes) {
    this.state = { ...this.state, ...changes };
    this.notify();
  }

  setSearchQuery(searchQuery) {
    this.setState({ searchQuery });
  }

  setStatusFilter(statusFilter) {
    this.setState({ statusFilter });
  }

  getVisibleCustomers() {
    const query = this.state.searchQuery.trim().toLowerCase();
    return this.state.customers.filter((customer) => {
      const matchesSearch = !query || [customer.name, customer.phone, customer.email]
        .some((field) => field.toLowerCase().includes(query));
      const matchesStatus = this.state.statusFilter === 'all' || customer.status === this.state.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }

  async selectCustomer(id) {
    const customer = await this.repository.getById(id);
    this.setState({ selectedCustomer: customer });
    await this.loadCustomerRelationships(id);
    return customer;
  }

  async loadCustomerRelationships(customerId) {
    const [kundalis, appointments, invoices, activities, followUps] = await Promise.all([
      new MockKundaliRepository().getByCustomerId(customerId),
      new MockAppointmentRepository().getByCustomerId(customerId),
      new MockInvoiceRepository().getByCustomerId(customerId),
      new MockCRMRepository().getActivitiesForCustomer(customerId),
      new MockCRMRepository().getFollowUpsForCustomer(customerId),
    ]);

    this.setState({
      customerRelationships: {
        kundalis,
        appointments,
        invoices,
        activities,
        followUps,
      },
    });
  }

  clearSelection() {
    this.setState({ selectedCustomer: null, customerRelationships: { kundalis: [], appointments: [], invoices: [], activities: [], followUps: [] } });
  }

  async createCustomer(customer) {
    const created = await this.repository.create(customer);
    this.setState({ customers: [created, ...this.state.customers] });
    return created;
  }

  async updateCustomer(id, customer) {
    const updated = await this.repository.update(id, customer);
    this.setState({
      customers: this.state.customers.map((record) => record.id === id ? updated : record),
      selectedCustomer: updated,
    });
    return updated;
  }
}
