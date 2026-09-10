import { appointmentData } from '../../../data/mock/appointmentData.js';
import { customerData } from '../../../data/mock/customerData.js';
import { CRMRepository } from './CRMRepository.js';

const clone = (value) => structuredClone(value);

const buildSeedFollowUps = () => [
  {
    id: 'fup-1001',
    customerId: 'cus-1001',
    customerName: 'Aarav Malhotra',
    title: 'Quarterly career follow-up',
    description: 'Share the updated reading summary and confirm the next reading slot.',
    dueDate: '2024-06-14',
    dueTime: '15:30',
    status: 'Due',
    priority: 'High',
    createdAt: '2024-06-11T10:00:00',
    completedAt: null,
    notes: 'Client asked for a follow-up after the last consultation.',
  },
  {
    id: 'fup-1002',
    customerId: 'cus-1003',
    customerName: 'Ishaan Bedi',
    title: 'Book the written summary review',
    description: 'Send the written summary and confirm whether he wants an additional consultation.',
    dueDate: '2024-06-16',
    dueTime: '10:00',
    status: 'Pending',
    priority: 'Medium',
    createdAt: '2024-06-10T09:15:00',
    completedAt: null,
    notes: 'Requested written notes earlier.',
  },
  {
    id: 'fup-1003',
    customerId: 'cus-1002',
    customerName: 'Diya Kapoor',
    title: 'Website inquiry response',
    description: 'Share the service menu and next available reading slots.',
    dueDate: '2024-06-13',
    dueTime: '12:00',
    status: 'Completed',
    priority: 'High',
    createdAt: '2024-06-09T11:00:00',
    completedAt: '2024-06-13T12:30:00',
    notes: 'Follow-up completed via phone call.',
  },
  {
    id: 'fup-1004',
    customerId: 'cus-1004',
    customerName: 'Mira Srinivasan',
    title: 'Monthly review discussion',
    description: 'Touch base before the appointment and check whether she wants a document summary.',
    dueDate: '2024-06-18',
    dueTime: '17:00',
    status: 'Pending',
    priority: 'Low',
    createdAt: '2024-06-08T15:45:00',
    completedAt: null,
    notes: 'VIP client; keep updates concise.',
  },
  {
    id: 'fup-1005',
    customerId: 'cus-1006',
    customerName: 'Tara Menon',
    title: 'Marriage consultation briefing',
    description: 'Confirm the marriage consultation requirements before next week.',
    dueDate: '2024-06-17',
    dueTime: '09:30',
    status: 'Due',
    priority: 'High',
    createdAt: '2024-06-12T08:20:00',
    completedAt: null,
    notes: 'Needs birth details updated.',
  },
];

const buildSeedActivities = () => [
  {
    id: 'act-2001',
    customerId: 'cus-1001',
    type: 'Appointment',
    title: 'Career consultation booked',
    description: 'Consultation scheduled with a focus on career forecasting.',
    date: '2024-06-14T10:30:00',
    relatedRecord: 'apt-3001',
  },
  {
    id: 'act-2002',
    customerId: 'cus-1001',
    type: 'Follow-up',
    title: 'Quarterly career follow-up',
    description: 'A follow-up is open to share the latest reading summary.',
    date: '2024-06-11T10:00:00',
    relatedRecord: 'fup-1001',
  },
  {
    id: 'act-2003',
    customerId: 'cus-1003',
    type: 'Note',
    title: 'Preference recorded',
    description: 'Requested the written summary after the consultation.',
    date: '2024-06-10T19:00:00',
    relatedRecord: 'cus-1003',
  },
  {
    id: 'act-2004',
    customerId: 'cus-1002',
    type: 'Kundali',
    title: 'Kundali reviewed',
    description: 'Birth chart and planetary notes reviewed with the customer.',
    date: '2024-06-08T11:45:00',
    relatedRecord: 'kundali-7102',
  },
  {
    id: 'act-2005',
    customerId: 'cus-1006',
    type: 'Invoice',
    title: 'Invoice shared',
    description: 'Invoice was issued for the marriage consultation package.',
    date: '2024-06-07T15:00:00',
    relatedRecord: 'inv-4012',
  },
];

export class MockCRMRepository extends CRMRepository {
  constructor() {
    super();
    this.customers = clone(customerData);
    this.appointments = clone(appointmentData);
    this.followUps = clone(buildSeedFollowUps());
    this.activities = clone(buildSeedActivities());
  }

  async simulateLatency() {
    await new Promise((resolve) => window.setTimeout(resolve, 140));
  }

  async getAllCustomers() {
    await this.simulateLatency();
    return clone(this.customers);
  }

  async getCustomerById(id) {
    await this.simulateLatency();
    return clone(this.customers.find((customer) => customer.id === id) || null);
  }

  async getFollowUps() {
    await this.simulateLatency();
    return clone(this.followUps);
  }

  async getFollowUpsForCustomer(customerId) {
    await this.simulateLatency();
    return clone(this.followUps.filter((followUp) => followUp.customerId === customerId));
  }

  async getActivitiesForCustomer(customerId) {
    await this.simulateLatency();
    return clone(this.activities.filter((activity) => activity.customerId === customerId));
  }

  async createFollowUp(followUp) {
    await this.simulateLatency();
    const created = {
      ...clone(followUp),
      id: `fup-${Date.now()}`,
      status: followUp.status || 'Pending',
      priority: followUp.priority || 'Medium',
      createdAt: new Date().toISOString(),
      completedAt: null,
      customerName: this.customers.find((customer) => customer.id === followUp.customerId)?.name || followUp.customerName || 'Customer',
    };
    this.followUps = [created, ...this.followUps];
    this.activities = [{
      id: `act-${Date.now()}`,
      customerId: followUp.customerId,
      type: 'Follow-up',
      title: 'Follow-up created',
      description: followUp.title,
      date: new Date().toISOString(),
      relatedRecord: created.id,
    }, ...this.activities];
    return clone(created);
  }

  async updateFollowUp(id, followUp) {
    await this.simulateLatency();
    const index = this.followUps.findIndex((record) => record.id === id);
    if (index === -1) throw new Error('Follow-up not found');
    const updated = { ...this.followUps[index], ...clone(followUp), id };
    this.followUps[index] = updated;
    return clone(updated);
  }

  async completeFollowUp(id, completedAt = new Date().toISOString()) {
    await this.simulateLatency();
    const index = this.followUps.findIndex((record) => record.id === id);
    if (index === -1) throw new Error('Follow-up not found');
    this.followUps[index] = { ...this.followUps[index], status: 'Completed', completedAt };
    return clone(this.followUps[index]);
  }

  async cancelFollowUp(id) {
    await this.simulateLatency();
    const index = this.followUps.findIndex((record) => record.id === id);
    if (index === -1) throw new Error('Follow-up not found');
    this.followUps[index] = { ...this.followUps[index], status: 'Cancelled' };
    return clone(this.followUps[index]);
  }
}
