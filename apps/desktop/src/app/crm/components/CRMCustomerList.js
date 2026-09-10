import { Button } from '../../../shared/components/Button.js';
import { StatusBadge } from '../../../shared/components/Badge.js';

export function CRMCustomerList({ customers, followUps, onSelect, onAddFollowUp }) {
  const wrapper = document.createElement('div');
  wrapper.className = 'crm-table-wrapper';

  const table = document.createElement('table');
  table.className = 'crm-table';

  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th>Customer</th>
      <th>Phone</th>
      <th>Last interaction</th>
      <th>Next follow-up</th>
      <th>Relationship status</th>
      <th>Actions</th>
    </tr>
  `;
  table.appendChild(thead);

  const tbody = document.createElement('tbody');

  customers.forEach((customer) => {
    const row = document.createElement('tr');
    const customerFollowUps = followUps.filter((followUp) => followUp.customerId === customer.id && followUp.status !== 'Completed' && followUp.status !== 'Cancelled');
    const nextFollowUp = [...customerFollowUps].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0];
    const relationStatus = customer.status === 'VIP' ? 'VIP' : customerFollowUps.length ? 'Follow-up' : customer.status;

    const customerCell = document.createElement('td');
    const customerInfo = document.createElement('div');
    customerInfo.className = 'crm-customer-cell';
    const avatar = document.createElement('div');
    avatar.className = 'crm-customer-avatar';
    avatar.textContent = customer.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
    const detailWrap = document.createElement('div');
    const name = document.createElement('strong');
    name.textContent = customer.name;
    const email = document.createElement('span');
    email.textContent = customer.email;
    detailWrap.append(name, document.createElement('br'), email);
    customerInfo.append(avatar, detailWrap);
    customerCell.appendChild(customerInfo);
    row.appendChild(customerCell);

    const phoneCell = document.createElement('td');
    phoneCell.textContent = customer.phone;
    row.appendChild(phoneCell);

    const lastInteractionCell = document.createElement('td');
    lastInteractionCell.textContent = customer.dateAdded || 'Recently';
    row.appendChild(lastInteractionCell);

    const nextFollowUpCell = document.createElement('td');
    nextFollowUpCell.textContent = nextFollowUp ? `${nextFollowUp.dueDate} • ${nextFollowUp.title}` : 'No upcoming follow-up';
    row.appendChild(nextFollowUpCell);

    const statusCell = document.createElement('td');
    statusCell.appendChild(new StatusBadge({
      label: relationStatus,
      status: relationStatus === 'VIP' ? 'danger' : relationStatus === 'Follow-up' ? 'warning' : relationStatus === 'New' ? 'primary' : 'success',
    }).render());
    row.appendChild(statusCell);

    const actionsCell = document.createElement('td');
    const actions = document.createElement('div');
    actions.className = 'crm-row-actions';
    const viewBtn = new Button({ label: 'View', variant: 'secondary', size: 'sm', onClick: () => onSelect(customer.id) }).render();
    const followUpBtn = new Button({ label: 'Follow-up', variant: 'primary', size: 'sm', onClick: () => onAddFollowUp(customer.id) }).render();
    actions.append(viewBtn, followUpBtn);
    actionsCell.appendChild(actions);
    row.appendChild(actionsCell);

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  wrapper.appendChild(table);
  return wrapper;
}
