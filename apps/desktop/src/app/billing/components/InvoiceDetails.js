import { StatusBadge } from '../../../shared/components/Badge.js';
import { Button } from '../../../shared/components/Button.js';
import { Card } from '../../../shared/components/Card.js';
import { Toast } from '../../../shared/components/States.js';
import { InvoicePreview } from './InvoicePreview.js';

const statusTypes = { Paid: 'success', Pending: 'warning', 'Partially Paid': 'primary', Overdue: 'danger' };
const formatCurrency = (value) => `Rs ${value.toLocaleString('en-IN')}`;

/**
 * Creates a clickable link element styled as an inline text link.
 * Falls back to plain text when no click handler is provided.
 */
function relationshipLink(label, onClick) {
  if (!onClick) {
    const span = document.createElement('strong');
    span.textContent = label;
    return span;
  }
  const link = document.createElement('a');
  link.href = '#';
  link.className = 'invoice-relationship-link';
  link.textContent = label;
  link.addEventListener('click', (event) => { event.preventDefault(); onClick(); });
  return link;
}

export function InvoiceDetails({ invoice, onBack, onEdit, onNavigate }) {
  const content = document.createElement('div'); content.className = 'invoice-details';
  const summary = document.createElement('div'); summary.className = 'invoice-details-summary'; const heading = document.createElement('div'); heading.className = 'invoice-details-heading'; heading.innerHTML = `<p class="billing-eyebrow">Invoice detail</p><h2>${invoice.invoiceNumber}</h2><p>${invoice.customer?.name || 'Unknown customer'} · ${invoice.service?.name || 'Unknown service'}</p>`; summary.appendChild(heading); summary.appendChild(new StatusBadge({ label: invoice.paymentStatus, status: statusTypes[invoice.paymentStatus] || 'neutral' }).render()); const actions = document.createElement('div'); actions.className = 'invoice-details-actions'; actions.appendChild(new Button({ label: 'Back to invoices', variant: 'secondary', onClick: onBack }).render()); actions.appendChild(new Button({ label: 'Edit invoice', variant: 'primary', onClick: onEdit }).render()); summary.appendChild(actions); content.appendChild(summary);

  // --- Invoice information grid with clickable relationships ---
  const values = document.createElement('div'); values.className = 'invoice-detail-value-grid';

  // Static value rows
  const staticRows = [
    ['Invoice date', invoice.invoiceDate],
    ['Payment method', invoice.paymentMethod],
    ['Subtotal', formatCurrency(invoice.subtotal)],
    ['Discount', formatCurrency(invoice.discount)],
    ['Tax', formatCurrency(invoice.tax)],
    ['Total', formatCurrency(invoice.total)],
  ];
  staticRows.forEach(([label, value]) => {
    const item = document.createElement('div'); item.className = 'invoice-detail-value';
    item.innerHTML = `<span>${label}</span>`;
    const strong = document.createElement('strong'); strong.textContent = value || 'Not provided';
    item.appendChild(strong);
    values.appendChild(item);
  });

  // Customer row — clickable
  const customerItem = document.createElement('div'); customerItem.className = 'invoice-detail-value';
  const customerLabel = document.createElement('span'); customerLabel.textContent = 'Customer';
  customerItem.appendChild(customerLabel);
  const customerName = invoice.customer?.name || 'Unknown customer';
  const customerOnClick = invoice.customer && onNavigate
    ? () => onNavigate('customers', { customerId: invoice.customerId })
    : null;
  customerItem.appendChild(relationshipLink(customerName, customerOnClick));
  values.appendChild(customerItem);

  // Service row — clickable
  const serviceItem = document.createElement('div'); serviceItem.className = 'invoice-detail-value';
  const serviceLabel = document.createElement('span'); serviceLabel.textContent = 'Service';
  serviceItem.appendChild(serviceLabel);
  const serviceName = invoice.service?.name || (invoice.serviceId ? 'Unknown service' : 'No service linked');
  const serviceOnClick = invoice.service && onNavigate
    ? () => onNavigate('services', { serviceId: invoice.serviceId })
    : null;
  serviceItem.appendChild(relationshipLink(serviceName, serviceOnClick));
  values.appendChild(serviceItem);

  // Appointment row — clickable when available
  const appointmentItem = document.createElement('div'); appointmentItem.className = 'invoice-detail-value';
  const appointmentLabel = document.createElement('span'); appointmentLabel.textContent = 'Appointment';
  appointmentItem.appendChild(appointmentLabel);
  if (!invoice.appointmentId) {
    const noAppointment = document.createElement('strong');
    noAppointment.textContent = 'No appointment linked';
    noAppointment.className = 'invoice-detail-muted';
    appointmentItem.appendChild(noAppointment);
  } else if (invoice.appointment) {
    const appointmentText = `${invoice.appointment.id} · ${invoice.appointment.date}`;
    const appointmentOnClick = onNavigate
      ? () => onNavigate('appointments', { appointmentId: invoice.appointmentId })
      : null;
    appointmentItem.appendChild(relationshipLink(appointmentText, appointmentOnClick));
  } else {
    const unavailable = document.createElement('strong');
    unavailable.textContent = 'Appointment unavailable';
    unavailable.className = 'invoice-detail-muted';
    appointmentItem.appendChild(unavailable);
  }
  values.appendChild(appointmentItem);

  content.appendChild(new Card({ title: 'Invoice information', content: values, className: 'billing-panel invoice-info-card' }).render());
  const previewActions = document.createElement('div'); previewActions.className = 'invoice-preview-actions'; previewActions.appendChild(new Button({ label: 'Print', variant: 'secondary', onClick: () => Toast.info('Print preview is ready for the invoice. Use the Tauri print command when connected.') }).render()); previewActions.appendChild(new Button({ label: 'Download PDF', variant: 'primary', onClick: () => Toast.info('PDF download will be available when reporting is connected.') }).render()); const previewWrapper = document.createElement('div'); previewWrapper.className = 'invoice-preview-wrapper'; previewWrapper.appendChild(previewActions); previewWrapper.appendChild(InvoicePreview({ invoice })); content.appendChild(previewWrapper); return content;
}
