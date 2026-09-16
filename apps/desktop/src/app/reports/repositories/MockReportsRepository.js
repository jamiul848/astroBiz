import { astroBizMockRepository } from '../../shared/repositories/AstroBizMockRepository.js';
import { ReportsRepository } from './ReportsRepository.js';

const clone = (value) => structuredClone(value);

const toDateValue = (value) => {
  if (!value) return null;
  const asDate = new Date(value);
  return Number.isNaN(asDate.getTime()) ? null : asDate;
};

const matchRange = (value, startDate, endDate) => {
  if (!value) return true;
  const dateValue = toDateValue(value);
  if (!dateValue) return true;

  const start = startDate ? toDateValue(startDate) : null;
  const end = endDate ? toDateValue(endDate) : null;

  if (start && dateValue < start) return false;
  if (end && dateValue > end) return false;
  return true;
};

const safeNumber = (value) => Number(value) || 0;

export class MockReportsRepository extends ReportsRepository {
  constructor() {
    super();
    this.store = astroBizMockRepository;
  }

  async getOverview(period = 'thisMonth', range = {}) {
    await this.store.simulateLatency(180);

    const startDate = range.startDate || '2024-06-01';
    const endDate = range.endDate || '2024-06-30';

    const customers = await this.store.getCustomers();
    const appointments = await this.store.getAppointments();
    const invoices = await this.store.getInvoices();
    const services = await this.store.getServices();
    const followUps = await this.store.getFollowUps();

    const filteredCustomers = customers.filter((customer) => matchRange(customer.dateAdded && customer.dateAdded.replace(/\s+/g, ' '), startDate, endDate));
    const filteredAppointments = appointments.filter((appointment) => matchRange(appointment.date, startDate, endDate));
    const filteredInvoices = invoices.filter((invoice) => matchRange(invoice.invoiceDate, startDate, endDate));
    const filteredFollowUps = followUps.filter((item) => matchRange(item.dueDate, startDate, endDate));

    const serviceById = Object.fromEntries(services.map((service) => [service.id, service]));

    const totalRevenue = filteredInvoices.reduce((sum, invoice) => sum + safeNumber(invoice.total), 0);
    const paidAmount = filteredInvoices
      .filter((invoice) => ['Paid', 'Partially Paid'].includes(invoice.paymentStatus))
      .reduce((sum, invoice) => sum + safeNumber(invoice.total), 0);
    const pendingAmount = filteredInvoices
      .filter((invoice) => !['Paid', 'Partially Paid'].includes(invoice.paymentStatus))
      .reduce((sum, invoice) => sum + safeNumber(invoice.total), 0);

    const customerStatusCounts = filteredCustomers.reduce((acc, customer) => {
      acc[customer.status] = (acc[customer.status] || 0) + 1;
      return acc;
    }, {});

    const appointmentStatusCounts = filteredAppointments.reduce((acc, appointment) => {
      acc[appointment.status] = (acc[appointment.status] || 0) + 1;
      return acc;
    }, {});

    const paymentBreakdown = filteredInvoices.reduce((acc, invoice) => {
      const key = invoice.paymentMethod || 'Other';
      acc[key] = acc[key] || { count: 0, amount: 0, pending: 0 };
      acc[key].count += 1;
      acc[key].amount += safeNumber(invoice.total);
      if (invoice.paymentStatus !== 'Paid') {
        acc[key].pending += safeNumber(invoice.total);
      }
      return acc;
    }, {});

    const servicePerformance = services.map((service) => {
      const appointments = filteredAppointments.filter((appointment) => appointment.serviceId === service.id);
      const revenue = appointments.length * safeNumber(service.price);
      return {
        name: service.name,
        appointments: appointments.length,
        revenue,
        duration: service.duration,
        active: service.active,
      };
    }).sort((a, b) => b.revenue - a.revenue);

    const revenueTrend = [
      { label: 'Week 1', value: 5200 },
      { label: 'Week 2', value: 6400 },
      { label: 'Week 3', value: 7800 },
      { label: 'Week 4', value: 9100 },
    ];

    const monthSummary = {
      totalRevenue,
      paidAmount,
      pendingAmount,
      invoiceCount: filteredInvoices.length,
      averageInvoiceValue: filteredInvoices.length ? totalRevenue / filteredInvoices.length : 0,
      totalCustomers: filteredCustomers.length,
      newCustomers: customerStatusCounts.New || 0,
      activeCustomers: customerStatusCounts.Active || 0,
      vipCustomers: customerStatusCounts.VIP || 0,
      followUpCustomers: filteredCustomers.filter((customer) => ['Follow-up', 'New'].includes(customer.status)).length,
      inactiveCustomers: customerStatusCounts.Inactive || 0,
      totalAppointments: filteredAppointments.length,
      confirmedAppointments: appointmentStatusCounts.Confirmed || 0,
      completedAppointments: appointmentStatusCounts.Completed || 0,
      cancelledAppointments: appointmentStatusCounts.Cancelled || 0,
      noShowAppointments: appointmentStatusCounts['No Show'] || 0,
      pendingAppointments: appointmentStatusCounts.Pending || 0,
      totalFollowUps: filteredFollowUps.length,
      pendingFollowUps: filteredFollowUps.filter((item) => item.status === 'Pending').length,
      dueFollowUps: filteredFollowUps.filter((item) => item.status === 'Due').length,
      completedFollowUps: filteredFollowUps.filter((item) => item.status === 'Completed').length,
      cancelledFollowUps: filteredFollowUps.filter((item) => item.status === 'Cancelled').length,
      overdueFollowUps: filteredFollowUps.filter((item) => item.status === 'Overdue').length,
    };

    const report = {
      period,
      range: { startDate, endDate },
      summary: {
        totalRevenue,
        totalCustomers: filteredCustomers.length,
        totalAppointments: filteredAppointments.length,
        completedAppointments: appointmentStatusCounts.Completed || 0,
        pendingPayments: pendingAmount,
        followUpsCompleted: filteredFollowUps.filter((item) => item.status === 'Completed').length,
      },
      revenue: {
        totalRevenue,
        paidAmount,
        pendingAmount,
        invoiceCount: filteredInvoices.length,
        averageInvoiceValue: filteredInvoices.length ? totalRevenue / filteredInvoices.length : 0,
        trend: revenueTrend,
        rows: filteredInvoices.map((invoice) => ({
          date: invoice.invoiceDate,
          invoiceNumber: invoice.invoiceNumber,
          customer: customers.find((customer) => customer.id === invoice.customerId)?.name || 'Unknown customer',
          service: serviceById[invoice.serviceId]?.name || 'Unknown service',
          amount: safeNumber(invoice.total),
          paymentStatus: invoice.paymentStatus,
        })),
      },
      customers: {
        totalCustomers: filteredCustomers.length,
        newCustomers: customerStatusCounts.New || 0,
        activeCustomers: customerStatusCounts.Active || 0,
        vipCustomers: customerStatusCounts.VIP || 0,
        followUpCustomers: filteredCustomers.filter((customer) => ['Follow-up', 'New'].includes(customer.status)).length,
        inactiveCustomers: customerStatusCounts.Inactive || 0,
        rows: filteredCustomers.map((customer) => ({
          name: customer.name,
          email: customer.email,
          status: customer.status,
          lastSeen: customer.dateAdded,
          orders: customer.status === 'VIP' ? 3 : customer.status === 'New' ? 1 : 2,
        })),
      },
      appointments: {
        totalAppointments: filteredAppointments.length,
        confirmed: appointmentStatusCounts.Confirmed || 0,
        completed: appointmentStatusCounts.Completed || 0,
        cancelled: appointmentStatusCounts.Cancelled || 0,
        noShow: appointmentStatusCounts['No Show'] || 0,
        pending: appointmentStatusCounts.Pending || 0,
        rows: filteredAppointments.map((appointment) => ({
          date: appointment.date,
          customer: customers.find((customer) => customer.id === appointment.customerId)?.name || 'Unknown customer',
          service: serviceById[appointment.serviceId]?.name || 'Unknown service',
          time: `${appointment.startTime} - ${appointment.endTime}`,
          status: appointment.status,
        })),
      },
      services: {
        rows: servicePerformance,
      },
      payments: {
        breakdown: paymentBreakdown,
        pendingAmount,
      },
      crm: {
        totalFollowUps: filteredFollowUps.length,
        pending: filteredFollowUps.filter((item) => item.status === 'Pending').length,
        due: filteredFollowUps.filter((item) => item.status === 'Due').length,
        completed: filteredFollowUps.filter((item) => item.status === 'Completed').length,
        cancelled: filteredFollowUps.filter((item) => item.status === 'Cancelled').length,
        overdue: filteredFollowUps.filter((item) => item.status === 'Overdue').length,
        rows: filteredFollowUps.map((item) => ({
          customer: item.customerName || item.customer,
          followUp: item.title || item.detail,
          dueDate: item.dueDate,
          priority: item.priority,
          status: item.status,
        })),
      },
      monthSummary,
    };

    return clone(report);
  }
}
