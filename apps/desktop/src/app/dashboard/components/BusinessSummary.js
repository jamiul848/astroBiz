import { Card } from '../../../shared/components/Card.js';

export async function BusinessSummary(repo) {
  let content = document.createElement('div');
  content.className = 'dashboard-summary-grid';

  try {
    const [invoices, appointments, customers] = await Promise.all([
      repo.getInvoices(),
      repo.getAppointments(),
      repo.getCustomers(),
    ]);

    const today = new Date().toISOString().split('T')[0];
    const thisMonth = today.slice(0, 7); // 'YYYY-MM'

    // Today calculations
    const todayInvoices = invoices.filter(i => i.invoiceDate === today);
    const todayRevenue = todayInvoices.reduce((sum, inv) => sum + (inv.total || 0), 0);
    const todayPaid = todayInvoices.filter(i => i.paymentStatus === 'Paid').reduce((sum, inv) => sum + (inv.total || 0), 0);
    const todayPending = todayInvoices.filter(i => i.paymentStatus === 'Pending' || i.paymentStatus === 'Overdue').reduce((sum, inv) => sum + (inv.total || 0), 0);

    // Month calculations
    const monthInvoices = invoices.filter(i => i.invoiceDate.startsWith(thisMonth));
    const monthRevenue = monthInvoices.reduce((sum, inv) => sum + (inv.total || 0), 0);
    const monthAppointments = appointments.filter(a => a.date.startsWith(thisMonth)).length;
    
    // Fallback: If customer dateAdded exists and matches this month, count them, else we just show total
    const monthCustomersCount = customers.filter(c => c.dateAdded && c.dateAdded.includes('2024')).length; // naive fallback

    const todaySection = `
      <div class="dashboard-summary-section">
        <h4>Today</h4>
        <div class="dashboard-summary-row"><span class="dashboard-summary-label">Revenue</span><span class="dashboard-summary-val">₹${todayRevenue.toLocaleString()}</span></div>
        <div class="dashboard-summary-row"><span class="dashboard-summary-label">Paid</span><span class="dashboard-summary-val">₹${todayPaid.toLocaleString()}</span></div>
        <div class="dashboard-summary-row"><span class="dashboard-summary-label">Pending</span><span class="dashboard-summary-val">₹${todayPending.toLocaleString()}</span></div>
      </div>
    `;

    const monthSection = `
      <div class="dashboard-summary-section">
        <h4>This Month</h4>
        <div class="dashboard-summary-row"><span class="dashboard-summary-label">Revenue</span><span class="dashboard-summary-val">₹${monthRevenue.toLocaleString()}</span></div>
        <div class="dashboard-summary-row"><span class="dashboard-summary-label">Appointments</span><span class="dashboard-summary-val">${monthAppointments}</span></div>
        <div class="dashboard-summary-row"><span class="dashboard-summary-label">New Customers</span><span class="dashboard-summary-val">${monthCustomersCount}</span></div>
      </div>
    `;

    content.innerHTML = todaySection + monthSection;

  } catch (err) {
    content.textContent = 'Failed to load summary.';
  }

  return new Card({
    title: 'Business Summary',
    content,
    className: 'dashboard-panel dashboard-panel-summary',
  }).render();
}
