import { Avatar, StatusBadge } from '../../../shared/components/Badge.js';
import { Card } from '../../../shared/components/Card.js';
import { EmptyState } from '../../../shared/components/States.js';
import { followUps } from '../../../data/mock/dashboardData.js';

export function FollowUps() {
  const list = document.createElement('div');
  list.className = 'dashboard-follow-up-list';

  if (!followUps.length) {
    list.appendChild(new EmptyState({
      icon: '✓',
      title: 'No follow-ups due',
      message: 'You are all caught up for now.',
      className: 'dashboard-empty-state',
    }).render());
  } else {
    followUps.forEach((followUp) => {
      const row = document.createElement('div');
      row.className = 'dashboard-follow-up-row';
      row.appendChild(new Avatar({ name: followUp.customer, size: 'sm', color: followUp.avatarColor }).render());

      const details = document.createElement('div');
      details.className = 'dashboard-follow-up-details';
      details.innerHTML = `<strong>${followUp.customer}</strong><span>${followUp.reason}</span>`;
      row.appendChild(details);

      const due = document.createElement('span');
      due.className = 'dashboard-follow-up-due';
      due.textContent = followUp.due;
      row.appendChild(due);

      row.appendChild(new StatusBadge({ label: followUp.priority, status: followUp.priorityType }).render());
      list.appendChild(row);
    });
  }

  return new Card({
    title: 'Follow-ups Due',
    content: list,
    className: 'dashboard-panel dashboard-panel-follow-ups',
  }).render();
}
