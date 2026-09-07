import { StatusBadge } from '../../../shared/components/Badge.js';
import { Button } from '../../../shared/components/Button.js';
import { EmptyState } from '../../../shared/components/States.js';
import { Table } from '../../../shared/components/Table.js';

export function ServiceList({ services, onSelect, onEdit, onToggle }) {
  if (!services.length) return new EmptyState({ icon: '○', title: 'No services yet', message: 'Add your first service to start offering consultations.' }).render();
  const table = new Table({ columns: [{ key: 'name', label: 'Service' }, { key: 'description', label: 'Description' }, { key: 'priceLabel', label: 'Price' }, { key: 'durationLabel', label: 'Duration' }, { key: 'status', label: 'Status' }, { key: 'actions', label: '' }], rows: services.map((service) => ({ ...service, priceLabel: `Rs ${service.price.toLocaleString('en-IN')}`, durationLabel: `${service.duration} min`, status: service.active ? 'Active' : 'Inactive', actions: 'View' })), className: 'service-list-table' }).render();
  table.querySelectorAll('tbody tr').forEach((row, index) => {
    const service = services[index]; const cells = row.querySelectorAll('td');
    cells[0].textContent = ''; const title = document.createElement('div'); title.className = 'service-name-cell'; const name = document.createElement('strong'); name.textContent = service.name; title.appendChild(name); cells[0].appendChild(title);
    cells[1].textContent = service.description || 'No description'; cells[1].className = 'service-description-cell';
    cells[4].textContent = ''; cells[4].appendChild(new StatusBadge({ label: service.active ? 'Active' : 'Inactive', status: service.active ? 'success' : 'neutral' }).render());
    cells[5].textContent = ''; const actions = document.createElement('div'); actions.className = 'service-row-actions';
    actions.appendChild(new Button({ label: 'View', variant: 'secondary', size: 'sm', onClick: () => onSelect(service.id) }).render());
    actions.appendChild(new Button({ label: 'Edit', variant: 'secondary', size: 'sm', onClick: () => onEdit(service.id) }).render());
    actions.appendChild(new Button({ label: service.active ? 'Deactivate' : 'Activate', variant: service.active ? 'danger' : 'success', size: 'sm', onClick: () => onToggle(service) }).render()); cells[5].appendChild(actions);
  }); return table;
}
