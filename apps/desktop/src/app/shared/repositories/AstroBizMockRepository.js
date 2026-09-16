import { astrobizMockData } from '../../../data/mock/astrobizMockData.js';

const clone = (value) => structuredClone(value);

export class AstroBizMockRepository {
  constructor(initialData = astrobizMockData) {
    this.data = clone(initialData);
  }

  async simulateLatency(ms = 120) {
    await new Promise((resolve) => window.setTimeout(resolve, ms));
  }

  async getCustomers() {
    await this.simulateLatency();
    return clone(this.data.customers);
  }

  async getCustomerById(customerId) {
    await this.simulateLatency();
    return clone(this.data.customers.find((customer) => customer.id === customerId) || null);
  }

  async getKundalis() {
    await this.simulateLatency();
    return clone(this.data.kundalis);
  }

  async getKundalisByCustomerId(customerId) {
    await this.simulateLatency();
    return clone(this.data.kundalis.filter((kundali) => kundali.customerId === customerId));
  }

  async getKundaliById(kundaliId) {
    await this.simulateLatency();
    return clone(this.data.kundalis.find((kundali) => kundali.id === kundaliId) || null);
  }

  async getAppointments() {
    await this.simulateLatency();
    return clone(this.data.appointments);
  }

  async getAppointmentById(appointmentId) {
    await this.simulateLatency();
    return clone(this.data.appointments.find((appointment) => appointment.id === appointmentId) || null);
  }

  async getAppointmentsByCustomerId(customerId) {
    await this.simulateLatency();
    return clone(this.data.appointments.filter((appointment) => appointment.customerId === customerId));
  }

  async getServices() {
    await this.simulateLatency();
    return clone(this.data.services);
  }

  async getServiceById(serviceId) {
    await this.simulateLatency();
    return clone(this.data.services.find((service) => service.id === serviceId) || null);
  }

  async getInvoices() {
    await this.simulateLatency();
    return clone(this.data.invoices);
  }

  async getInvoicesByCustomerId(customerId) {
    await this.simulateLatency();
    return clone(this.data.invoices.filter((invoice) => invoice.customerId === customerId));
  }

  async getInvoiceById(invoiceId) {
    await this.simulateLatency();
    return clone(this.data.invoices.find((invoice) => invoice.id === invoiceId) || null);
  }

  async getFollowUps() {
    await this.simulateLatency();
    return clone(this.data.crm.followUps);
  }

  async getFollowUpsByCustomerId(customerId) {
    await this.simulateLatency();
    return clone(this.data.crm.followUps.filter((followUp) => followUp.customerId === customerId));
  }

  async getActivitiesByCustomerId(customerId) {
    await this.simulateLatency();
    return clone(this.data.crm.activities.filter((activity) => activity.customerId === customerId));
  }

  async createCustomer(customer) {
    await this.simulateLatency();
    const created = {
      ...clone(customer),
      id: customer.id || `cus-${Date.now()}`,
      kundaliIds: [],
      appointmentIds: [],
      invoiceIds: [],
      crmFollowUpIds: [],
    };
    this.data.customers = [created, ...this.data.customers];
    return clone(created);
  }

  async updateCustomer(customerId, customer) {
    await this.simulateLatency();
    const index = this.data.customers.findIndex((record) => record.id === customerId);
    if (index === -1) throw new Error('Customer not found');
    this.data.customers[index] = { ...this.data.customers[index], ...clone(customer), id: customerId };
    return clone(this.data.customers[index]);
  }

  async createAppointment(appointment) {
    await this.simulateLatency();
    const created = { ...clone(appointment), id: appointment.id || `apt-${Date.now()}` };
    this.data.appointments = [created, ...this.data.appointments];
    const customer = this.data.customers.find((record) => record.id === created.customerId);
    if (customer && !customer.appointmentIds.includes(created.id)) {
      customer.appointmentIds = [created.id, ...customer.appointmentIds];
    }
    return clone(created);
  }

  async updateAppointment(appointmentId, appointment) {
    await this.simulateLatency();
    const index = this.data.appointments.findIndex((record) => record.id === appointmentId);
    if (index === -1) throw new Error('Appointment not found');
    this.data.appointments[index] = { ...this.data.appointments[index], ...clone(appointment), id: appointmentId };
    return clone(this.data.appointments[index]);
  }

  async createInvoice(invoice) {
    await this.simulateLatency();
    const created = { ...clone(invoice), id: invoice.id || `inv-${Date.now()}` };
    this.data.invoices = [created, ...this.data.invoices];
    const customer = this.data.customers.find((record) => record.id === created.customerId);
    if (customer && !customer.invoiceIds.includes(created.id)) {
      customer.invoiceIds = [created.id, ...customer.invoiceIds];
    }
    return clone(created);
  }

  async updateInvoice(invoiceId, invoice) {
    await this.simulateLatency();
    const index = this.data.invoices.findIndex((record) => record.id === invoiceId);
    if (index === -1) throw new Error('Invoice not found');
    this.data.invoices[index] = { ...this.data.invoices[index], ...clone(invoice), id: invoiceId };
    return clone(this.data.invoices[index]);
  }

  async createFollowUp(followUp) {
    await this.simulateLatency();
    const created = {
      ...clone(followUp),
      id: followUp.id || `fup-${Date.now()}`,
      status: followUp.status || 'Pending',
      priority: followUp.priority || 'Medium',
      createdAt: followUp.createdAt || new Date().toISOString(),
      completedAt: followUp.completedAt || null,
      customerName: followUp.customerName || this.data.customers.find((customer) => customer.id === followUp.customerId)?.name || 'Customer',
    };
    this.data.crm.followUps = [created, ...this.data.crm.followUps];
    this.data.crm.activities = [{
      id: `act-${Date.now()}`,
      customerId: created.customerId,
      type: 'Follow-up',
      title: created.title,
      description: created.description,
      date: new Date().toISOString(),
      relatedRecord: created.id,
    }, ...this.data.crm.activities];
    const customer = this.data.customers.find((record) => record.id === created.customerId);
    if (customer && !customer.crmFollowUpIds.includes(created.id)) {
      customer.crmFollowUpIds = [created.id, ...customer.crmFollowUpIds];
    }
    return clone(created);
  }

  async updateFollowUp(followUpId, followUp) {
    await this.simulateLatency();
    const index = this.data.crm.followUps.findIndex((record) => record.id === followUpId);
    if (index === -1) throw new Error('Follow-up not found');
    this.data.crm.followUps[index] = { ...this.data.crm.followUps[index], ...clone(followUp), id: followUpId };
    return clone(this.data.crm.followUps[index]);
  }

  async completeFollowUp(followUpId) {
    await this.simulateLatency();
    const index = this.data.crm.followUps.findIndex((record) => record.id === followUpId);
    if (index === -1) throw new Error('Follow-up not found');
    this.data.crm.followUps[index] = { ...this.data.crm.followUps[index], status: 'Completed', completedAt: new Date().toISOString() };
    return clone(this.data.crm.followUps[index]);
  }
}

export const astroBizMockRepository = new AstroBizMockRepository();
