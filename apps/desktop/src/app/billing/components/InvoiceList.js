import { Avatar, StatusBadge } from '../../../shared/components/Badge.js';
import { Button } from '../../../shared/components/Button.js';
import { EmptyState } from '../../../shared/components/States.js';
import { Table } from '../../../shared/components/Table.js';

const statusTypes = { Paid: 'success', Pending: 'warning', 'Partially Paid': 'primary', Overdue: 'danger' };
const formatCurrency = (value) => `Rs ${value.toLocaleString('en-IN')}`;

export function InvoiceList({ invoices, onSelect, onEdit }) {
  if (!invoices.length) return new EmptyState({ icon: '○', title: 'No invoices yet', message: 'Create your first invoice to begin tracking revenue.' }).render();
  const table = new Table({ columns: [{ key: 'invoiceNumber', label: 'Invoice' }, { key: 'customerName', label: 'Customer' }, { key: 'serviceName', label: 'Service' }, { key: 'appointmentRef', label: 'Appointment' }, { key: 'invoiceDate', label: 'Date' }, { key: 'totalLabel', label: 'Total' }, { key: 'paymentStatus', label: 'Payment' }, { key: 'actions', label: '' }], rows: invoices.map((invoice) => ({ ...invoice, customerName: invoice.customer?.name || 'Unknown customer', serviceName: invoice.service?.name || 'Unknown service', appointmentRef: invoice.appointmentId || '—', totalLabel: formatCurrency(invoice.total), actions: 'View' })), className: 'invoice-list-table' }).render();
  table.querySelectorAll('tbody tr').forEach((row, index) => { const invoice = invoices[index]; const cells = row.querySelectorAll('td'); cells[0].textContent = ''; const identity = document.createElement('div'); identity.className = 'invoice-number-cell'; identity.appendChild(new Avatar({ name: invoice.invoiceNumber, size: 'sm', color: 'accent' }).render()); const number = document.createElement('strong'); number.textContent = invoice.invoiceNumber; identity.appendChild(number); cells[0].appendChild(identity); if (!invoice.appointmentId) { cells[3].textContent = ''; const muted = document.createElement('span'); muted.className = 'invoice-list-no-apt'; muted.textContent = '—'; cells[3].appendChild(muted); } cells[6].textContent = ''; cells[6].appendChild(new StatusBadge({ label: invoice.paymentStatus, status: statusTypes[invoice.paymentStatus] || 'neutral' }).render()); cells[7].textContent = ''; const actions = document.createElement('div'); actions.className = 'invoice-row-actions'; actions.appendChild(new Button({ label: 'View', variant: 'secondary', size: 'sm', onClick: () => onSelect(invoice.id) }).render()); actions.appendChild(new Button({ label: 'Edit', variant: 'secondary', size: 'sm', onClick: () => onEdit(invoice.id) }).render()); cells[7].appendChild(actions); }); return table;
}

