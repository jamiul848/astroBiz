import { Avatar, StatusBadge } from '../../../shared/components/Badge.js';
import { Button } from '../../../shared/components/Button.js';
import { Card } from '../../../shared/components/Card.js';

const statusTypes = { New: 'primary', Active: 'success', 'Follow-up': 'warning', Inactive: 'neutral', VIP: 'danger' };

function detailItem(label, value) {
  const item = document.createElement('div');
  item.className = 'customer-detail-item';
  const labelElement = document.createElement('span');
  labelElement.textContent = label;
  const valueElement = document.createElement('strong');
  valueElement.textContent = value || 'Not provided';
  item.append(labelElement, valueElement);
  return item;
}

export function CustomerDetails({ customer, relationships = { kundalis: [], appointments: [], invoices: [], activities: [], followUps: [] }, onBack, onEdit, onViewKundali, onViewAppointment, onViewInvoice, onViewCRM }) {
  const content = document.createElement('div');
  content.className = 'customer-details-content';

  const summary = document.createElement('div');
  summary.className = 'customer-details-summary';
  summary.appendChild(new Avatar({ name: customer.name, size: 'lg', color: customer.avatarColor }).render());
  const heading = document.createElement('div');
  heading.className = 'customer-details-heading';
  heading.innerHTML = `<h2>${customer.name}</h2><p>Customer since ${customer.dateAdded}</p>`;
  heading.appendChild(new StatusBadge({ label: customer.status, status: statusTypes[customer.status] }).render());
  summary.appendChild(heading);
  const actions = document.createElement('div');
  actions.className = 'customer-details-actions';
  actions.appendChild(new Button({ label: 'Back to customers', variant: 'secondary', onClick: onBack }).render());
  actions.appendChild(new Button({ label: 'Edit customer', variant: 'primary', onClick: onEdit }).render());
  if (relationships.kundalis.length) {
    actions.appendChild(new Button({ label: 'View Kundali', variant: 'accent', onClick: () => onViewKundali(relationships.kundalis[0].id) }).render());
  }
  actions.appendChild(new Button({ label: 'CRM timeline', variant: 'secondary', onClick: onViewCRM }).render());
  summary.appendChild(actions);
  content.appendChild(summary);

  const detailGrid = document.createElement('div');
  detailGrid.className = 'customer-detail-grid';
  detailGrid.appendChild(new Card({ title: 'Personal and contact', content: (() => { const group = document.createElement('div'); group.className = 'customer-info-list'; group.append(detailItem('Full name', customer.name), detailItem('Phone', customer.phone), detailItem('Email', customer.email), detailItem('Address', customer.address)); return group; })(), className: 'customer-detail-card' }).render());
  detailGrid.appendChild(new Card({ title: 'Birth information', content: (() => { const group = document.createElement('div'); group.className = 'customer-info-list'; group.append(detailItem('Date of birth', customer.dateOfBirth), detailItem('Time of birth', customer.timeOfBirth), detailItem('Birth place', customer.birthPlace)); return group; })(), className: 'customer-detail-card' }).render());
  detailGrid.appendChild(new Card({ title: 'Location', content: (() => { const group = document.createElement('div'); group.className = 'customer-info-list'; group.append(detailItem('Latitude', customer.latitude), detailItem('Longitude', customer.longitude), detailItem('Timezone', customer.timezone)); return group; })(), className: 'customer-detail-card' }).render());
  detailGrid.appendChild(new Card({ title: 'Notes', content: (() => { const note = document.createElement('p'); note.className = 'customer-notes'; note.textContent = customer.notes || 'No notes added yet.'; return note; })(), className: 'customer-detail-card' }).render());
  content.appendChild(detailGrid);

  const relationshipSections = document.createElement('div');
  relationshipSections.className = 'customer-relationship-sections';

  const buildRelationshipList = (items, emptyMessage, keyLabel, onItemClick) => {
    const list = document.createElement('div');
    list.className = 'customer-relationship-list';
    if (!items.length) {
      const empty = document.createElement('p');
      empty.className = 'customer-relationship-empty';
      empty.textContent = emptyMessage;
      list.appendChild(empty);
      return list;
    }

    items.slice(0, 5).forEach((item) => {
      const row = document.createElement('button');
      row.type = 'button';
      row.className = 'customer-relationship-row';
      row.innerHTML = `<span>${item.title || item.name || item.invoiceNumber || item.type || item.id}</span><strong>${item.date || item.invoiceDate || item.status || item.label || item.customerName || keyLabel}</strong>`;
      row.addEventListener('click', () => onItemClick(item));
      list.appendChild(row);
    });
    return list;
  };

  const kundalisSection = new Card({
    title: 'Kundalis',
    content: buildRelationshipList(
      relationships.kundalis,
      'No kundalis linked to this customer yet.',
      'Kundali',
      (item) => onViewKundali(item.id)
    ),
    className: 'customer-detail-card',
  }).render();

  const appointmentsSection = new Card({
    title: 'Appointments',
    content: buildRelationshipList(
      relationships.appointments,
      'No appointments linked to this customer yet.',
      'Appointment',
      (item) => onViewAppointment(item.id)
    ),
    className: 'customer-detail-card',
  }).render();

  const invoicesSection = new Card({
    title: 'Invoices',
    content: buildRelationshipList(
      relationships.invoices,
      'No invoices linked to this customer yet.',
      'Invoice',
      (item) => onViewInvoice(item.id)
    ),
    className: 'customer-detail-card',
  }).render();

  const crmSection = new Card({
    title: 'CRM activities',
    content: buildRelationshipList(
      [...relationships.followUps, ...relationships.activities].slice(0, 6),
      'No CRM history for this customer yet.',
      'CRM',
      () => onViewCRM()
    ),
    className: 'customer-detail-card',
  }).render();

  relationshipSections.append(kundalisSection, appointmentsSection, invoicesSection, crmSection);
  content.appendChild(relationshipSections);

  return content;
}
