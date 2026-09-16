import { Card } from '../../../shared/components/Card.js';
import { EmptyState } from '../../../shared/components/States.js';

export async function UpcomingAppointments(repo) {
  let content = document.createElement('div');

  try {
    const [appointments, customers, services] = await Promise.all([
      repo.getAppointments(),
      repo.getCustomers(),
      repo.getServices(),
    ]);

    const today = new Date().toISOString().split('T')[0];
    const upcoming = appointments
      .filter((a) => a.date >= today && (a.status === 'Confirmed' || a.status === 'Pending'))
      .sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime))
      .slice(0, 4);

    if (!upcoming.length) {
      content = new EmptyState({
        icon: '○',
        title: 'No upcoming appointments',
        message: 'Your next consultations will appear here.',
        className: 'dashboard-empty-state',
      }).render();
    } else {
      const table = document.createElement('table');
      table.className = 'dashboard-dense-table';
      
      const thead = document.createElement('thead');
      thead.innerHTML = `
        <tr>
          <th>Time</th>
          <th>Customer</th>
          <th>Service</th>
          <th>Status</th>
        </tr>
      `;
      table.appendChild(thead);
      
      const tbody = document.createElement('tbody');
      upcoming.forEach((appointment) => {
        const customer = customers.find((c) => c.id === appointment.customerId);
        const service = services.find((s) => s.id === appointment.serviceId);
        
        const customerName = customer?.name || 'Unknown';
        const serviceName = service?.name || 'Unknown';
        const displayDate = appointment.date === today ? `Today, ${appointment.startTime}` : `${appointment.date} ${appointment.startTime}`;

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${displayDate}</td>
          <td><strong>${customerName}</strong></td>
          <td>${serviceName}</td>
          <td>${appointment.status}</td>
        `;
        tbody.appendChild(tr);
      });
      
      table.appendChild(tbody);
      content.appendChild(table);
    }
  } catch (err) {
    content.textContent = 'Failed to load upcoming appointments.';
  }

  return new Card({
    title: 'Upcoming Appointments',
    content,
    className: 'dashboard-panel dashboard-panel-appointments',
  }).render();
}
