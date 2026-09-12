import { StatusBadge } from '../../../shared/components/Badge.js';

export function AppointmentReport({ appointments }) {
  const section = document.createElement('div');
  section.className = 'reports-panel';

  const summary = document.createElement('div');
  summary.className = 'reports-metrics-grid';
  summary.append(
    metricCard('Total appointments', appointments.totalAppointments),
    metricCard('Confirmed', appointments.confirmed),
    metricCard('Completed', appointments.completed),
    metricCard('Cancelled', appointments.cancelled),
    metricCard('No Show', appointments.noShow),
    metricCard('Pending', appointments.pending),
  );

  const tableWrap = document.createElement('div');
  tableWrap.className = 'report-table-wrapper';
  const table = document.createElement('table');
  table.className = 'report-table';
  const head = document.createElement('thead');
  head.innerHTML = '<tr><th>Date</th><th>Customer</th><th>Service</th><th>Time</th><th>Status</th></tr>';
  const body = document.createElement('tbody');

  if (!appointments.rows.length) {
    const empty = document.createElement('tr');
    empty.innerHTML = '<td colspan="5"><div class="empty-state"><div class="empty-state-icon">📅</div><h3 class="empty-state-title">No appointment data</h3><p>There are no appointments in this date range.</p></div></td>';
    body.appendChild(empty);
  } else {
    appointments.rows.forEach((row) => {
      const tr = document.createElement('tr');
      const badge = new StatusBadge({
        label: row.status,
        status: row.status === 'Completed' ? 'success' : row.status === 'Confirmed' ? 'primary' : row.status === 'Cancelled' ? 'danger' : row.status === 'No Show' ? 'neutral' : 'warning',
      }).render();

      tr.innerHTML = `
        <td>${row.date}</td>
        <td>${row.customer}</td>
        <td>${row.service}</td>
        <td>${row.time}</td>
        <td></td>
      `;
      const statusCell = tr.children[4];
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
