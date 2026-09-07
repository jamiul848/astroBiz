import { StatusBadge } from '../../../shared/components/Badge.js';
import { Button } from '../../../shared/components/Button.js';
import { Card } from '../../../shared/components/Card.js';

const statusTypes = { Pending: 'warning', Confirmed: 'success', Completed: 'success', Cancelled: 'danger', 'No Show': 'neutral' };

function detail(label, value) {
  const item = document.createElement('div');
  item.className = 'appointment-detail-item';
  const labelElement = document.createElement('span');
  labelElement.textContent = label;
  const valueElement = document.createElement('strong');
  valueElement.textContent = value || 'Not provided';
  item.append(labelElement, valueElement);
  return item;
}

export function AppointmentDetails({ appointment, onBack, onEdit, onCancel }) {
  const content = document.createElement('div');
  content.className = 'appointment-details';
  const summary = document.createElement('div');
  summary.className = 'appointment-details-summary';
  const heading = document.createElement('div');
  heading.className = 'appointment-details-heading';
  heading.innerHTML = `<p class="appointment-eyebrow">Appointment detail</p><h2>${appointment.customerName}</h2><p>${appointment.serviceName}</p>`;
  summary.appendChild(heading);
  summary.appendChild(new StatusBadge({ label: appointment.status, status: statusTypes[appointment.status] }).render());
  const actions = document.createElement('div');
  actions.className = 'appointment-details-actions';
  actions.appendChild(new Button({ label: 'Back to calendar', variant: 'secondary', onClick: onBack }).render());
  actions.appendChild(new Button({ label: 'Edit appointment', variant: 'primary', onClick: onEdit }).render());
  if (appointment.status !== 'Cancelled') actions.appendChild(new Button({ label: 'Cancel appointment', variant: 'danger', onClick: onCancel }).render());
  summary.appendChild(actions);
  content.appendChild(summary);
  const information = document.createElement('div');
  information.className = 'appointment-details-grid';
  information.appendChild(new Card({ title: 'Schedule', content: (() => { const group = document.createElement('div'); group.className = 'appointment-info-list'; group.append(detail('Date', appointment.date), detail('Start time', appointment.startTime), detail('End time', appointment.endTime)); return group; })(), className: 'appointment-detail-card' }).render());
  information.appendChild(new Card({ title: 'Consultation', content: (() => { const group = document.createElement('div'); group.className = 'appointment-info-list'; group.append(detail('Customer', appointment.customerName), detail('Service', appointment.serviceName), detail('Status', appointment.status)); return group; })(), className: 'appointment-detail-card' }).render());
  information.appendChild(new Card({ title: 'Notes', content: (() => { const note = document.createElement('p'); note.className = 'appointment-notes-display'; note.textContent = appointment.notes || 'No notes added.'; return note; })(), className: 'appointment-detail-card' }).render());
  content.appendChild(information);
  return content;
}
