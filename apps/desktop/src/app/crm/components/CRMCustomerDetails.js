import { StatusBadge } from '../../../shared/components/Badge.js';
import { Button } from '../../../shared/components/Button.js';
import { Card } from '../../../shared/components/Card.js';

function detailItem(label, value) {
  const item = document.createElement('div');
  item.className = 'crm-detail-item';
  item.innerHTML = `<span>${label}</span><strong>${value || 'Not provided'}</strong>`;
  return item;
}

export function CRMCustomerDetails({ customer, followUps, activities, onBack, onViewCustomer, onViewKundali, onViewAppointments, onViewInvoices, onCreateFollowUp }) {
  const container = document.createElement('div');
  container.className = 'crm-customer-details';

  const summary = document.createElement('div');
  summary.className = 'crm-customer-summary';
  summary.innerHTML = `
    <div>
      <p class="crm-eyebrow">Customer relationship</p>
      <h2>${customer.name}</h2>
      <p>${customer.phone} • ${customer.email}</p>
    </div>
  `;
  summary.appendChild(new StatusBadge({ label: customer.status || 'Active', status: customer.status === 'VIP' ? 'danger' : customer.status === 'New' ? 'primary' : 'success' }).render());

  const actions = document.createElement('div');
  actions.className = 'crm-detail-actions';
  actions.appendChild(new Button({ label: 'Back', variant: 'secondary', onClick: onBack }).render());
  actions.appendChild(new Button({ label: 'View customer', variant: 'primary', onClick: onViewCustomer }).render());
  actions.appendChild(new Button({ label: 'View Kundali', variant: 'accent', onClick: onViewKundali }).render());
  actions.appendChild(new Button({ label: 'Appointments', variant: 'secondary', onClick: onViewAppointments }).render());
  actions.appendChild(new Button({ label: 'Invoices', variant: 'secondary', onClick: onViewInvoices }).render());
  actions.appendChild(new Button({ label: 'Add follow-up', variant: 'primary', onClick: onCreateFollowUp }).render());
  summary.appendChild(actions);
  container.appendChild(summary);

  const metrics = document.createElement('div');
  metrics.className = 'crm-metrics-grid';
  const openFollowUps = followUps.filter((item) => item.status !== 'Completed' && item.status !== 'Cancelled').length;
  const completedFollowUps = followUps.filter((item) => item.status === 'Completed').length;
  const nextFollowUp = followUps.filter((item) => item.status !== 'Completed' && item.status !== 'Cancelled').sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0];
  metrics.appendChild(new Card({ title: 'Last interaction', content: detailItem('Latest note', customer.dateAdded || 'Recently'), className: 'crm-mini-card' }).render());
  metrics.appendChild(new Card({ title: 'Next follow-up', content: detailItem('Upcoming', nextFollowUp ? `${nextFollowUp.dueDate} • ${nextFollowUp.title}` : 'No upcoming follow-up'), className: 'crm-mini-card' }).render());
  metrics.appendChild(new Card({ title: 'Open follow-ups', content: detailItem('Open', String(openFollowUps)), className: 'crm-mini-card' }).render());
  metrics.appendChild(new Card({ title: 'Completed follow-ups', content: detailItem('Completed', String(completedFollowUps)), className: 'crm-mini-card' }).render());
  container.appendChild(metrics);

  const info = document.createElement('div');
  info.className = 'crm-info-grid';
  const personal = new Card({ title: 'Customer information', content: (() => {
    const group = document.createElement('div');
    group.className = 'crm-detail-list';
    group.appendChild(detailItem('Name', customer.name));
    group.appendChild(detailItem('Phone', customer.phone));
    group.appendChild(detailItem('Email', customer.email));
    group.appendChild(detailItem('Status', customer.status));
    return group;
  })() }).render();

  const timeline = new Card({ title: 'Activity timeline', content: (() => {
    const list = document.createElement('div');
    list.className = 'crm-activity-list';
    (activities.length ? activities : [{ type: 'Note', title: 'No activity yet', description: 'No CRM interactions recorded for this customer.', date: new Date().toISOString() }]).forEach((activity) => {
      const item = document.createElement('div');
      item.className = 'crm-activity-item';
      item.innerHTML = `
        <div class="crm-activity-bullet"></div>
        <div>
          <div class="crm-activity-meta"><strong>${activity.type}</strong><span>${new Date(activity.date).toLocaleDateString()}</span></div>
          <h4>${activity.title}</h4>
          <p>${activity.description}</p>
        </div>
      `;
      list.appendChild(item);
    });
    return list;
  })() }).render();

  info.appendChild(personal);
  info.appendChild(timeline);
  container.appendChild(info);

  return container;
}
