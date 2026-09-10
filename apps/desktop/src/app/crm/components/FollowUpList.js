import { Button } from '../../../shared/components/Button.js';
import { StatusBadge } from '../../../shared/components/Badge.js';

export function FollowUpList({ followUps, onEdit, onComplete, onCancel }) {
  const wrapper = document.createElement('div');
  wrapper.className = 'crm-followup-list';

  if (!followUps.length) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.innerHTML = '<div class="empty-state-icon">📌</div><h3 class="empty-state-title">No follow-ups</h3><p>There are no follow-ups for this customer yet.</p>';
    wrapper.appendChild(empty);
    return wrapper;
  }

  followUps.forEach((item) => {
    const row = document.createElement('div');
    row.className = 'crm-followup-item';

    const meta = document.createElement('div');
    meta.className = 'crm-followup-meta';
    meta.innerHTML = `<div><strong>${item.title}</strong><p>${item.customerName || 'Customer'} • ${item.dueDate}${item.dueTime ? ` at ${item.dueTime}` : ''}</p></div>`;
    meta.appendChild(new StatusBadge({ label: item.status, status: item.status === 'Completed' ? 'success' : item.status === 'Cancelled' ? 'neutral' : item.status === 'Due' ? 'warning' : 'primary' }).render());

    const details = document.createElement('div');
    details.className = 'crm-followup-details';
    details.innerHTML = `<p>${item.description || 'No description provided.'}</p><div class="crm-followup-tags"><span>${item.priority}</span><span>${item.status}</span></div>`;

    const actions = document.createElement('div');
    actions.className = 'crm-followup-actions';
    actions.appendChild(new Button({ label: 'Edit', variant: 'secondary', size: 'sm', onClick: () => onEdit(item) }).render());
    if (item.status !== 'Completed' && item.status !== 'Cancelled') {
      actions.appendChild(new Button({ label: 'Complete', variant: 'success', size: 'sm', onClick: () => onComplete(item.id) }).render());
      actions.appendChild(new Button({ label: 'Cancel', variant: 'danger', size: 'sm', onClick: () => onCancel(item.id) }).render());
    }

    row.append(meta, details, actions);
    wrapper.appendChild(row);
  });

  return wrapper;
}
