import { StatusBadge } from '../../../shared/components/Badge.js';

export function CustomerReport({ customers }) {
  const section = document.createElement('div');
  section.className = 'reports-panel';

  const summary = document.createElement('div');
  summary.className = 'reports-metrics-grid';
  summary.append(
    metricCard('Total customers', customers.totalCustomers),
    metricCard('New customers', customers.newCustomers),
    metricCard('Active customers', customers.activeCustomers),
    metricCard('VIP customers', customers.vipCustomers),
    metricCard('Follow-up customers', customers.followUpCustomers),
    metricCard('Inactive customers', customers.inactiveCustomers),
  );

  const tableWrap = document.createElement('div');
  tableWrap.className = 'report-table-wrapper';
  const table = document.createElement('table');
  table.className = 'report-table';
  const head = document.createElement('thead');
  head.innerHTML = '<tr><th>Customer</th><th>Email</th><th>Status</th><th>Last seen</th><th>Engagement</th></tr>';
  const body = document.createElement('tbody');

  if (!customers.rows.length) {
    const empty = document.createElement('tr');
    empty.innerHTML = '<td colspan="5"><div class="empty-state"><div class="empty-state-icon">👥</div><h3 class="empty-state-title">No customer data</h3><p>There are no customer records in this range.</p></div></td>';
    body.appendChild(empty);
  } else {
    customers.rows.forEach((row) => {
      const tr = document.createElement('tr');
      const badge = new StatusBadge({
        label: row.status,
        status: row.status === 'VIP' ? 'danger' : row.status === 'New' ? 'primary' : row.status === 'Inactive' ? 'neutral' : 'success',
      }).render();

      tr.innerHTML = `
        <td>${row.name}</td>
        <td>${row.email}</td>
        <td></td>
        <td>${row.lastSeen}</td>
        <td>${row.orders}</td>
      `;
      const statusCell = tr.children[2];
      statusCell.appendChild(badge);
      body.appendChild(tr);
    });
  }

  table.append(head, body);
  tableWrap.appendChild(table);
  section.append(summary, tableWrap);
  return section;
}

function metricCard(label, value) {
  const card = document.createElement('div');
  card.className = 'report-metric-card';
  card.innerHTML = `<div class="report-metric-label">${label}</div><div class="report-metric-value">${value}</div>`;
  return card;
}
