import { Button } from '../../../shared/components/Button.js';
import { Input } from '../../../shared/components/Input.js';
import { Select } from '../../../shared/components/Select.js';

const statusOptions = ['Pending', 'Confirmed', 'Completed', 'Cancelled', 'No Show'].map((value) => ({ value, label: value }));

function notesField(value) {
  const group = document.createElement('div');
  group.className = 'form-group';
  group.innerHTML = '<label class="form-label" for="appointment-notes">Notes</label>';
  const textarea = document.createElement('textarea');
  textarea.id = 'appointment-notes';
  textarea.name = 'notes';
  textarea.className = 'textarea appointment-notes';
  textarea.value = value || '';
  group.appendChild(textarea);
  return group;
}

export function AppointmentForm({ appointment = {}, customers, services, onSubmit, onCancel }) {
  appointment = appointment || {};
  const form = document.createElement('form');
  form.className = 'appointment-form';
  form.noValidate = true;
  form.innerHTML = '<div class="appointment-form-section-title">Consultation details</div>';
  const grid = document.createElement('div');
  grid.className = 'appointment-form-grid';
  grid.appendChild(new Select({ id: 'appointment-customer', name: 'customerId', label: 'Customer', required: true, value: appointment.customerId || '', options: [{ value: '', label: 'Select a customer' }, ...customers.map((customer) => ({ value: customer.id, label: customer.name }))] }).render());
  grid.appendChild(new Select({ id: 'appointment-service', name: 'serviceId', label: 'Service', required: true, value: appointment.serviceId || '', options: [{ value: '', label: 'Select a service' }, ...services.map((service) => ({ value: service.id, label: `${service.name} (${service.duration} min)` }))] }).render());
  grid.appendChild(new Input({ id: 'appointment-date', name: 'date', label: 'Date', type: 'date', required: true, value: appointment.date || '' }).render());
  grid.appendChild(new Input({ id: 'appointment-start', name: 'startTime', label: 'Start time', type: 'time', required: true, value: appointment.startTime || '' }).render());
  grid.appendChild(new Input({ id: 'appointment-end', name: 'endTime', label: 'End time', type: 'time', required: true, value: appointment.endTime || '' }).render());
  grid.appendChild(new Select({ id: 'appointment-status', name: 'status', label: 'Status', value: appointment.status || 'Pending', options: statusOptions }).render());
  form.appendChild(grid);
  form.appendChild(notesField(appointment.notes));
  const error = document.createElement('div');
  error.className = 'appointment-form-error';
  error.setAttribute('role', 'alert');
  form.appendChild(error);
  const actions = document.createElement('div');
  actions.className = 'appointment-form-actions';
  actions.appendChild(new Button({ label: 'Cancel', variant: 'secondary', onClick: onCancel }).render());
  actions.appendChild(new Button({ label: appointment.id ? 'Save changes' : 'Create appointment', variant: 'primary', type: 'submit' }).render());
  form.appendChild(actions);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(form).entries());
    const errors = [];
    if (!values.customerId) errors.push('Customer is required.');
    if (!values.serviceId) errors.push('Service is required.');
    if (!values.date) errors.push('Date is required.');
    if (!values.startTime) errors.push('Start time is required.');
    if (!values.endTime) errors.push('End time is required.');
    if (values.startTime && values.endTime && values.endTime <= values.startTime) errors.push('End time must be after start time.');
    error.textContent = errors.join(' ');
    if (!errors.length) onSubmit(values);
  });
  return form;
}
