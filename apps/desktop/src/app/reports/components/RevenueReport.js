import { StatusBadge } from '../../../shared/components/Badge.js';

export function RevenueReport({ revenue }) {
  const section = document.createElement('div');
  section.className = 'reports-panel';

  const summary = document.createElement('div');
  summary.className = 'reports-metrics-grid';
  summary.append(
    metricCard('Total revenue', `₹${revenue.totalRevenue.toLocaleString()}`),
    metricCard('Paid amount', `₹${revenue.paidAmount.toLocaleString()}`),
    metricCard('Pending amount', `₹${revenue.pendingAmount.toLocaleString()}`),
    metricCard('Avg invoice', `₹${Math.round(revenue.averageInvoiceValue).toLocaleString()}`),
  );

  const chart = document.createElement('div');
  chart.className = 'revenue-chart';
  const maxValue = Math.max(...revenue.trend.map((item) => item.value), 1);
  revenue.trend.forEach((point) => {
    const barWrap = document.createElement('div');
    barWrap.className = 'revenue-bar-wrap';
    const bar = document.createElement('div');
    bar.className = 'revenue-bar';
    bar.style.height = `${(point.value / maxValue) * 100}%`;
    bar.title = `${point.label}: ₹${point.value.toLocaleString()}`;
    const label = document.createElement('span');
    label.textContent = point.label;
    const value = document.createElement('small');
    value.textContent = `₹${point.value.toLocaleString()}`;
    barWrap.append(bar, label, value);
    chart.appendChild(barWrap);
  });

  const tableWrap = document.createElement('div');
  tableWrap.className = 'report-table-wrapper';
  const table = document.createElement('table');
  table.className = 'report-table';
  const head = document.createElement('thead');
  head.innerHTML = '<tr><th>Date</th><th>Invoice</th><th>Customer</th><th>Service</th><th>Amount</th><th>Status</th></tr>';
  const body = document.createElement('tbody');

  if (!revenue.rows.length) {
    const empty = document.createElement('tr');
    empty.innerHTML = '<td colspan="6"><div class="empty-state"><div class="empty-state-icon">📊</div><h3 class="empty-state-title">No revenue data</h3><p>There are no invoices in this period.</p></div></td>';
    body.appendChild(empty);
  } else {
    revenue.rows.forEach((row) => {
      const tr = document.createElement('tr');
      const badge = new StatusBadge({
        label: row.paymentStatus,
        status: row.paymentStatus === 'Paid' ? 'success' : row.paymentStatus === 'Pending' ? 'warning' : row.paymentStatus === 'Partially Paid' ? 'primary' : 'neutral',
      }).render();

      tr.innerHTML = `
        <td>${row.date}</td>
        <td>${row.invoiceNumber}</td>
        <td>${row.customer}</td>
        <td>${row.service}</td>
        <td>₹${row.amount.toLocaleString()}</td>
      `;
      const statusCell = document.createElement('td');
      statusCell.appendChild(badge);
      tr.appendChild(statusCell);
      body.appendChild(tr);
    });
  }

  table.append(head, body);
  tableWrap.appendChild(table);
  section.append(summary, chart, tableWrap);
  return section;
}

function metricCard(label, value) {
  const card = document.createElement('div');
  card.className = 'report-metric-card';
  card.innerHTML = `<div class="report-metric-label">${label}</div><div class="report-metric-value">${value}</div>`;
  return card;
}
