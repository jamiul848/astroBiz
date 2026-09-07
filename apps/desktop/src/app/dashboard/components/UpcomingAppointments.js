import { Avatar, StatusBadge } from '../../../shared/components/Badge.js';
import { Card } from '../../../shared/components/Card.js';
import { EmptyState } from '../../../shared/components/States.js';
import { upcomingAppointments } from '../../../data/mock/dashboardData.js';

export function UpcomingAppointments() {
  const list = document.createElement('div');
  list.className = 'dashboard-appointment-list';

  if (!upcomingAppointments.length) {
    list.appendChild(new EmptyState({
      icon: '○',
      title: 'No upcoming appointments',
      message: 'Your next consultations will appear here.',
      className: 'dashboard-empty-state',
    }).render());
  } else {
    upcomingAppointments.forEach((appointment) => {
      const row = document.createElement('div');
      row.className = 'dashboard-appointment-row';

      row.appendChild(new Avatar({
        name: appointment.customer,
        size: 'md',
        color: appointment.avatarColor,
      }).render());

      const person = document.createElement('div');
      person.className = 'dashboard-appointment-person';
      person.innerHTML = `<strong>${appointment.customer}</strong><span>${appointment.service}</span>`;
      row.appendChild(person);

      const schedule = document.createElement('div');
      schedule.className = 'dashboard-appointment-schedule';
      schedule.innerHTML = `<strong>${appointment.time}</strong><span>${appointment.date}</span>`;
      row.appendChild(schedule);

      row.appendChild(new StatusBadge({
        label: appointment.status,
        status: appointment.statusType,
      }).render());
      list.appendChild(row);
    });
  }

  return new Card({
    title: 'Upcoming Appointments',
    content: list,
    className: 'dashboard-panel dashboard-panel-appointments',
  }).render();
}
