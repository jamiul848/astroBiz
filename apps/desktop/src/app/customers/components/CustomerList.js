import { Avatar, StatusBadge } from '../../../shared/components/Badge.js';
import { Button } from '../../../shared/components/Button.js';
import { EmptyState } from '../../../shared/components/States.js';
import { Table } from '../../../shared/components/Table.js';

const statusTypes = { New: 'primary', Active: 'success', 'Follow-up': 'warning', Inactive: 'neutral', VIP: 'danger' };

export function CustomerList({ customers, onSelect, onEdit, onClearFilters, hasFilters }) {
  if (!customers.length) {
    return new EmptyState({
      icon: '○',
      title: hasFilters ? 'No matching customers' : 'No customers yet',
      message: hasFilters ? 'Try a different search or clear the filters.' : 'Add your first customer to get started.',
      action: hasFilters ? new Button({ label: 'Clear filters', variant: 'secondary', onClick: onClearFilters }) : null,
      className: 'customer-empty-state',
    }).render();
  }

  const table = new Table({
    columns: [
      { key: 'name', label: 'Customer' },
      { key: 'contact', label: 'Contact' },
      { key: 'status', label: 'Status' },
      { key: 'dateAdded', label: 'Added' },
      { key: 'actions', label: '' },
    ],
    rows: customers.map((customer) => ({ ...customer, contact: `${customer.phone} · ${customer.email}`, actions: 'View' })),
    className: 'customer-table',
  }).render();

  table.querySelectorAll('tbody tr').forEach((row, index) => {
    const customer = customers[index];
    const cells = row.querySelectorAll('td');
    cells[0].textContent = '';
    const identity = document.createElement('div');
    identity.className = 'customer-identity';
    identity.appendChild(new Avatar({ name: customer.name, size: 'sm', color: customer.avatarColor }).render());
    const name = document.createElement('strong');
    name.textContent = customer.name;
    identity.appendChild(name);
    cells[0].appendChild(identity);

    cells[1].textContent = '';
    const contact = document.createElement('div');
    contact.className = 'customer-contact';
    contact.innerHTML = `<span>${customer.phone}</span><span>${customer.email}</span>`;
    cells[1].appendChild(contact);

    cells[2].textContent = '';
    cells[2].appendChild(new StatusBadge({ label: customer.status, status: statusTypes[customer.status] }).render());

    cells[4].textContent = '';
    const actions = document.createElement('div');
    actions.className = 'customer-row-actions';
    actions.appendChild(new Button({ label: 'View', variant: 'secondary', size: 'sm', onClick: () => onSelect(customer.id) }).render());
    actions.appendChild(new Button({ label: 'Edit', variant: 'secondary', size: 'sm', onClick: () => onEdit(customer.id) }).render());
    cells[4].appendChild(actions);
  });

  return table;
}
