import { StatCard } from '../../../shared/components/Card.js';

export async function DashboardStats(repo) {
  const container = document.createElement('div');
  container.className = 'dashboard-stats';

  try {
    const [invoices, customers, appointments] = await Promise.all([
      repo.getInvoices(),
      repo.getCustomers(),
      repo.getAppointments(),
    ]);

    const today = new Date().toISOString().split('T')[0];
    const todaysAppointments = appointments.filter((a) => a.date === today);
    const upcomingAppointmentsCount = todaysAppointments.filter((a) => a.status === 'Confirmed' || a.status === 'Pending').length;

    const paidInvoices = invoices.filter((i) => i.paymentStatus === 'Paid' && i.invoiceDate === today);
    const todaysRevenue = paidInvoices.reduce((sum, inv) => sum + (inv.total || 0), 0);

    const pendingInvoices = invoices.filter((i) => i.paymentStatus === 'Pending' || i.paymentStatus === 'Overdue');
    const pendingPaymentsSum = pendingInvoices.reduce((sum, inv) => sum + (inv.total || 0), 0);

    const stats = [
      {
        label: "Today's Revenue",
        value: `Rs ${todaysRevenue.toLocaleString()}`,
        change: { value: 0, direction: 'up' },
        detail: 'Calculated from today\'s paid invoices',
        tone: 'revenue',
      },
      {
        label: 'Total Customers',
        value: customers.length.toLocaleString(),
        change: { value: 0, direction: 'up' },
        detail: 'Active records in database',
        tone: 'customers',
      },
      {
        label: "Today's Appointments",
        value: todaysAppointments.length.toString(),
        change: { value: 0, direction: 'up' },
        detail: `${upcomingAppointmentsCount} consultations remaining`,
        tone: 'appointments',
      },
      {
        label: 'Pending Payments',
        value: `Rs ${pendingPaymentsSum.toLocaleString()}`,
        change: { value: 0, direction: 'down' },
        detail: `${pendingInvoices.length} invoices need attention`,
        tone: 'payments',
      },
    ];

    stats.forEach((stat) => {
      const card = new StatCard({
        label: stat.label,
        value: stat.value,
        change: stat.change,
        className: `dashboard-stat dashboard-stat-${stat.tone}`,
      }).render();

      const detail = document.createElement('span');
      detail.className = 'dashboard-stat-detail';
      detail.textContent = stat.detail;
      card.appendChild(detail);
      container.appendChild(card);
    });
  } catch (err) {
    container.textContent = 'Failed to load stats.';
  }

  return container;
}
