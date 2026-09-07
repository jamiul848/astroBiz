import { StatusBadge } from '../../../shared/components/Badge.js';
import { Button } from '../../../shared/components/Button.js';
import { EmptyState } from '../../../shared/components/States.js';
import { Table } from '../../../shared/components/Table.js';

const statusTypes = { Pending: 'warning', Confirmed: 'success', Completed: 'success', Cancelled: 'danger', 'No Show': 'neutral' };

export function AppointmentList({ appointments, onSelect, onEdit, onCancel }) {
  if (!appointments.length) return new EmptyState({ icon: '○', title: 'No appointments in this period', message: 'Try another date or create a new appointment.' }).render();
  const table = new Table({ columns: [{ key: 'customerName', label: 'Customer' }, { key: 'serviceName', label: 'Service' }, { key: 'date', label: 'Date' }, { key: 'time', label: 'Time' }, { key: 'status', label: 'Status' }, { key: 'actions', label: '' }], rows: appointments.map((appointment) => ({ ...appointment, time: `${appointment.startTime} - ${appointment.endTime}`, actions: 'View' })), className: 'appointment-list-table' }).render();
  table.querySelectorAll('tbody tr').forEach((row, index) => {
    const appointment = appointments[index];
    const cells = row.querySelectorAll('td');
    cells[4].textContent = '';
    cells[4].appendChild(new StatusBadge({ label: appointment.status, status: statusTypes[appointment.status] }).render());
    cells[5].textContent = '';
    const actions = document.createElement('div');
    actions.className = 'appointment-row-actions';
    actions.appendChild(new Button({ label: 'View', variant: 'secondary', size: 'sm', onClick: () => onSelect(appointment.id) }).render());
    actions.appendChild(new Button({ label: 'Edit', variant: 'secondary', size: 'sm', onClick: () => onEdit(appointment.id) }).render());
    if (appointment.status !== 'Cancelled') actions.appendChild(new Button({ label: 'Cancel', variant: 'danger', size: 'sm', onClick: () => onCancel(appointment.id) }).render());
    cells[5].appendChild(actions);
  });
  return table;
}
