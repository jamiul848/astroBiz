import { Avatar, StatusBadge } from '../../../shared/components/Badge.js';
import { Button } from '../../../shared/components/Button.js';
import { EmptyState } from '../../../shared/components/States.js';
import { Table } from '../../../shared/components/Table.js';

export function KundaliList({ kundalis, onSelect }) {
  if (!kundalis.length) {
    return new EmptyState({ icon: '○', title: 'No Kundalis available', message: 'Kundali records supplied by the astrology service will appear here.' }).render();
  }
  const table = new Table({
    columns: [
      { key: 'customerName', label: 'Customer' },
      { key: 'title', label: 'Title' },
      { key: 'birthDate', label: 'Birth date' },
      { key: 'birthPlace', label: 'Birth place' },
      { key: 'createdAt', label: 'Created' },
      { key: 'status', label: 'Availability' },
      { key: 'action', label: '' },
    ],
    rows: kundalis.map((kundali) => ({ ...kundali, title: kundali.title || 'Kundali', birthDate: kundali.birthInformation.dateOfBirth, birthPlace: kundali.birthInformation.birthPlace, status: 'Ready', action: 'Open' })),
    className: 'kundali-list-table',
  }).render();
  table.querySelectorAll('tbody tr').forEach((row, index) => {
    const kundali = kundalis[index];
    const cells = row.querySelectorAll('td');
    cells[0].textContent = '';
    const identity = document.createElement('div');
    identity.className = 'kundali-customer-identity';
    identity.appendChild(new Avatar({ name: kundali.customerName, size: 'sm', color: kundali.avatarColor || 'accent' }).render());
    const name = document.createElement('strong');
    name.textContent = kundali.customerName;
    identity.appendChild(name);
    cells[0].appendChild(identity);
    cells[5].textContent = '';
    cells[5].appendChild(new StatusBadge({ label: 'Ready', status: 'success' }).render());
    cells[6].textContent = '';
    cells[6].appendChild(new Button({ label: 'Open', variant: 'secondary', size: 'sm', onClick: () => onSelect(kundali.id) }).render());
  });
  return table;
}
