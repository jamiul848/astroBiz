import { Button } from '../../../shared/components/Button.js';
import { Input } from '../../../shared/components/Input.js';
import { Select } from '../../../shared/components/Select.js';

const statusOptions = ['Pending', 'Paid', 'Partially Paid', 'Overdue'].map((value) => ({ value, label: value }));
const paymentOptions = ['UPI', 'Cash', 'Bank Transfer', 'Other'].map((value) => ({ value, label: value }));

export function InvoiceForm({ invoice = {}, customers, services, onSubmit, onCancel }) {
  invoice = invoice || {};
  const form = document.createElement('form'); form.className = 'invoice-form'; form.noValidate = true;
  form.innerHTML = '<div class="invoice-form-section-title">Invoice details</div>';
  const grid = document.createElement('div'); grid.className = 'invoice-form-grid';
  grid.appendChild(new Select({ id: 'invoice-customer', name: 'customerId', label: 'Customer', required: true, value: invoice.customerId || '', options: [{ value: '', label: 'Select a customer' }, ...customers.map((customer) => ({ value: customer.id, label: customer.name }))] }).render());
  grid.appendChild(new Select({ id: 'invoice-service', name: 'serviceId', label: 'Service', required: true, value: invoice.serviceId || '', options: [{ value: '', label: 'Select a service' }, ...services.map((service) => ({ value: service.id, label: service.name }))] }).render());
  grid.appendChild(new Input({ id: 'invoice-subtotal', name: 'subtotal', label: 'Subtotal', required: true, type: 'number', value: invoice.subtotal ?? '', placeholder: '0' }).render());
  grid.appendChild(new Input({ id: 'invoice-discount', name: 'discount', label: 'Discount', type: 'number', value: invoice.discount ?? 0, placeholder: '0' }).render());
  grid.appendChild(new Input({ id: 'invoice-tax', name: 'tax', label: 'Tax', type: 'number', value: invoice.tax ?? 0, placeholder: '0' }).render());
  grid.appendChild(new Input({ id: 'invoice-date', name: 'invoiceDate', label: 'Invoice date', required: true, type: 'date', value: invoice.invoiceDate || '2024-06-14' }).render());
  grid.appendChild(new Select({ id: 'invoice-status', name: 'paymentStatus', label: 'Payment status', value: invoice.paymentStatus || 'Pending', options: statusOptions }).render());
  grid.appendChild(new Select({ id: 'invoice-method', name: 'paymentMethod', label: 'Payment method', value: invoice.paymentMethod || 'UPI', options: paymentOptions }).render());
  form.appendChild(grid);
  const total = document.createElement('div'); total.className = 'invoice-form-total'; total.innerHTML = '<span>Demo total preview</span><strong>Rs 0</strong>'; form.appendChild(total);
  const updateTotal = () => { const subtotal = Number(form.querySelector('#invoice-subtotal').value) || 0; const discount = Number(form.querySelector('#invoice-discount').value) || 0; const tax = Number(form.querySelector('#invoice-tax').value) || 0; total.querySelector('strong').textContent = `Rs ${Math.max(0, subtotal - discount + tax).toLocaleString('en-IN')}`; };
  form.querySelectorAll('input[type="number"]').forEach((input) => input.addEventListener('input', updateTotal)); updateTotal();
  const error = document.createElement('div'); error.className = 'invoice-form-error'; error.setAttribute('role', 'alert'); form.appendChild(error);
  const actions = document.createElement('div'); actions.className = 'invoice-form-actions'; actions.appendChild(new Button({ label: 'Cancel', variant: 'secondary', onClick: onCancel }).render()); actions.appendChild(new Button({ label: invoice.id ? 'Save changes' : 'Create invoice', variant: 'primary', type: 'submit' }).render()); form.appendChild(actions);
  form.addEventListener('submit', (event) => { event.preventDefault(); const values = Object.fromEntries(new FormData(form).entries()); const errors = []; if (!values.customerId) errors.push('Customer is required.'); if (!values.serviceId) errors.push('Service is required.'); if (!values.invoiceDate) errors.push('Invoice date is required.'); ['subtotal', 'discount', 'tax'].forEach((field) => { if (values[field] === '' || Number.isNaN(Number(values[field])) || Number(values[field]) < 0) errors.push(`${field.charAt(0).toUpperCase() + field.slice(1)} must be a valid non-negative number.`); }); error.textContent = errors.join(' '); if (errors.length) return; onSubmit({ ...values, subtotal: Number(values.subtotal), discount: Number(values.discount), tax: Number(values.tax), total: Number(values.subtotal) - Number(values.discount) + Number(values.tax) }); });
  return form;
}
