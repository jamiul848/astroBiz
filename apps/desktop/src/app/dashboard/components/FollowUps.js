import { StatusBadge } from '../../../shared/components/Badge.js';
import { Card } from '../../../shared/components/Card.js';
import { EmptyState } from '../../../shared/components/States.js';

export async function FollowUps(repo) {
  let content = document.createElement('div');

  try {
    const [followUps, customers] = await Promise.all([
      repo.getFollowUps(),
      repo.getCustomers()
    ]);

    const priorityMap = {
      'High': 'danger',
      'Medium': 'warning',
      'Low': 'neutral',
    };

    const pendingFollowUps = followUps
      .filter(f => f.status !== 'Completed')
      .slice(0, 3); // show top 3

    if (!pendingFollowUps.length) {
      content = new EmptyState({
        icon: '✓',
        title: 'No follow-ups due',
        message: 'You are all caught up for now.',
        className: 'dashboard-empty-state',
      }).render();
    } else {
      const table = document.createElement('table');
      table.className = 'dashboard-dense-table';
      
      const thead = document.createElement('thead');
      thead.innerHTML = `
        <tr>
          <th>Customer</th>
          <th>Follow-up</th>
          <th>Priority</th>
        </tr>
      `;
      table.appendChild(thead);
      
      const tbody = document.createElement('tbody');
      pendingFollowUps.forEach((followUp) => {
        const priorityType = priorityMap[followUp.priority] || 'neutral';
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
          <td><strong>${followUp.customerName}</strong></td>
          <td>${followUp.title}</td>
        `;
        
        const tdPriority = document.createElement('td');
        tdPriority.appendChild(new StatusBadge({ label: followUp.priority, status: priorityType }).render());
        tr.appendChild(tdPriority);
        
        tbody.appendChild(tr);
      });
      
      table.appendChild(tbody);
      content.appendChild(table);
    }
  } catch (err) {
    content.textContent = 'Failed to load follow-ups.';
  }

  return new Card({
    title: 'Follow-ups Due',
    content,
    className: 'dashboard-panel dashboard-panel-follow-ups',
  }).render();
}
