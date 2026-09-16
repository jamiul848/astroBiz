import { Card } from '../../../shared/components/Card.js';
import { EmptyState } from '../../../shared/components/States.js';

export async function RecentCustomers(repo) {
  let content = document.createElement('div');

  try {
    const customers = await repo.getCustomers();
    const recent = [...customers].reverse().slice(0, 4).map(c => ({
      name: c.name,
      contact: c.email || c.phone || 'N/A',
      lastInteraction: c.dateAdded,
      status: c.status || 'Active',
    }));

    if (!recent.length) {
      content = new EmptyState({
        icon: '○',
        title: 'No recent customers',
        message: 'New customer activity will appear here.',
        className: 'dashboard-empty-state',
      }).render();
    } else {
      const table = document.createElement('table');
      table.className = 'dashboard-dense-table';
      
      const thead = document.createElement('thead');
      thead.innerHTML = `
        <tr>
          <th>Customer</th>
          <th>Contact</th>
          <th>Last Visit</th>
        </tr>
      `;
      table.appendChild(thead);
      
      const tbody = document.createElement('tbody');
      recent.forEach((c) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${c.name}</strong></td>
          <td>${c.contact}</td>
          <td>${c.lastInteraction}</td>
        `;
        // Make row clickable
        tr.style.cursor = 'pointer';
        tr.addEventListener('click', () => {
          // If we had onNavigate injected, we could route. 
          // For now, it just shows intent.
        });
        tbody.appendChild(tr);
      });
      
      table.appendChild(tbody);
      content.appendChild(table);
    }
  } catch (err) {
    content.textContent = 'Failed to load recent customers.';
  }

  return new Card({
    title: 'Recent Customers',
    content,
    className: 'dashboard-panel dashboard-panel-customers',
  }).render();
}
