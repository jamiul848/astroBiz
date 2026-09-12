export function ServicePerformanceReport({ services }) {
  const section = document.createElement('div');
  section.className = 'reports-panel';

  const tableWrap = document.createElement('div');
  tableWrap.className = 'report-table-wrapper';
  const table = document.createElement('table');
  table.className = 'report-table';
  const head = document.createElement('thead');
  head.innerHTML = '<tr><th>Service</th><th>Appointments</th><th>Revenue</th><th>Duration</th><th>Availability</th></tr>';
  const body = document.createElement('tbody');

  if (!services.rows.length) {
    const empty = document.createElement('tr');
    empty.innerHTML = '<td colspan="5"><div class="empty-state"><div class="empty-state-icon">🧾</div><h3 class="empty-state-title">No service data</h3><p>No service performance data is available for this range.</p></div></td>';
    body.appendChild(empty);
  } else {
    services.rows.forEach((row) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${row.name}</td>
        <td>${row.appointments}</td>
        <td>₹${row.revenue.toLocaleString()}</td>
        <td>${row.duration}</td>
        <td>${row.active ? 'Active' : 'Paused'}</td>
      `;
      body.appendChild(tr);
    });
  }

  table.append(head, body);
  tableWrap.appendChild(table);
  section.appendChild(tableWrap);
  return section;
}
