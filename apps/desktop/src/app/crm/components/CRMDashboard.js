import { Button } from '../../../shared/components/Button.js';
import { Card } from '../../../shared/components/Card.js';
import { StatusBadge } from '../../../shared/components/Badge.js';

export function CRMDashboard({ stats, customers, followUps, onNavigate, onOpenFollowUpForm }) {
  const container = document.createElement('div');
  container.className = 'crm-dashboard';

  const cards = document.createElement('div');
  cards.className = 'crm-stat-grid';

  const statItems = [
    { label: 'Total CRM customers', value: stats.totalCustomers },
    { label: 'Due today', value: stats.followUpsDueToday },
    { label: 'Upcoming', value: stats.upcomingFollowUps },
    { label: 'Overdue', value: stats.overdueFollowUps },
  ];

  statItems.forEach((item) => {
    cards.appendChild(new Card({
      title: item.label,
      content: (() => {
        const value = document.createElement('div');
        value.className = 'crm-stat-value';
        value.textContent = item.value;
        return value;
      })(),
      className: 'crm-stat-card',
    }).render());
  });

  const content = document.createElement('div');
  content.className = 'crm-dashboard-grid';

  const recent = document.createElement('div');
  recent.className = 'crm-panel';
  recent.appendChild(new Card({
    title: 'Recent interactions',
    content: (() => {
      const list = document.createElement('div');
      list.className = 'crm-list';
      const items = [
        { title: 'Aarav Malhotra', description: 'Career reading follow-up due today', type: 'Due' },
        { title: 'Mira Srinivasan', description: 'VIP relationship noted with priority review', type: 'VIP' },
        { title: 'Tara Menon', description: 'Marriage consultation notes added', type: 'Note' },
      ];

      items.forEach((item) => {
        const row = document.createElement('div');
        row.className = 'crm-list-item';
        row.innerHTML = `<div><strong>${item.title}</strong><p>${item.description}</p></div>`;
        row.appendChild(new StatusBadge({ label: item.type, status: item.type === 'Due' ? 'warning' : item.type === 'VIP' ? 'danger' : 'primary' }).render());
        list.appendChild(row);
      });
      return list;
    })(),
  }).render());

  const attention = document.createElement('div');
  attention.className = 'crm-panel';
  attention.appendChild(new Card({
    title: 'Customers needing attention',
    content: (() => {
      const list = document.createElement('div');
      list.className = 'crm-list';
      const attentionList = customers.filter((customer) => customer.status === 'New' || customer.status === 'Follow-up' || customer.status === 'VIP').slice(0, 4);
      attentionList.forEach((customer) => {
        const row = document.createElement('div');
        row.className = 'crm-list-item';
        row.innerHTML = `<div><strong>${customer.name}</strong><p>${customer.phone}</p></div>`;
        row.appendChild(new StatusBadge({ label: customer.status, status: customer.status === 'VIP' ? 'danger' : customer.status === 'Follow-up' ? 'warning' : 'primary' }).render());
        list.appendChild(row);
      });
      if (!attentionList.length) {
        const empty = document.createElement('p');
        empty.textContent = 'No customers currently need follow-up attention.';
        list.appendChild(empty);
      }
      return list;
    })(),
  }).render());

  const actions = document.createElement('div');
  actions.className = 'crm-panel';
  const actionButtons = document.createElement('div');
  actionButtons.className = 'crm-action-buttons';
  actionButtons.appendChild(new Button({ label: 'Add follow-up', variant: 'primary', onClick: onOpenFollowUpForm }).render());
  actionButtons.appendChild(new Button({ label: 'View customers', variant: 'secondary', onClick: () => onNavigate('customers') }).render());
  actionButtons.appendChild(new Button({ label: 'View appointments', variant: 'accent', onClick: () => onNavigate('appointments') }).render());
  actions.appendChild(new Card({
    title: 'Quick actions',
    content: actionButtons,
  }).render());

  const followUpsSection = document.createElement('div');
  followUpsSection.className = 'crm-panel';
  followUpsSection.appendChild(new Card({
    title: 'Upcoming follow-ups',
    content: (() => {
      const list = document.createElement('div');
      list.className = 'crm-list';
      const relevant = followUps.filter((item) => item.status !== 'Completed' && item.status !== 'Cancelled').slice(0, 4);
      relevant.forEach((item) => {
        const row = document.createElement('div');
        row.className = 'crm-list-item';
        row.innerHTML = `<div><strong>${item.customerName}</strong><p>${item.title} • ${item.dueDate}</p></div>`;
        row.appendChild(new StatusBadge({ label: item.priority, status: item.priority === 'High' ? 'danger' : item.priority === 'Medium' ? 'warning' : 'primary' }).render());
        list.appendChild(row);
      });
      return list;
    })(),
  }).render());

  content.appendChild(recent);
  content.appendChild(attention);
  content.appendChild(actions);
  content.appendChild(followUpsSection);

  container.appendChild(cards);
  container.appendChild(content);
  return container;
}
