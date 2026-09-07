import { Card } from '../../../shared/components/Card.js';
import { EmptyState } from '../../../shared/components/States.js';
import { Table } from '../../../shared/components/Table.js';
import { recentCustomers } from '../../../data/mock/dashboardData.js';

export function RecentCustomers() {
  const content = recentCustomers.length
    ? new Table({
      columns: [
        { key: 'name', label: 'Customer' },
        { key: 'contact', label: 'Contact' },
        { key: 'lastInteraction', label: 'Last interaction' },
        { key: 'status', label: 'Status' },
      ],
      rows: recentCustomers,
      className: 'dashboard-customer-table',
    }).render()
    : new EmptyState({
      icon: '○',
      title: 'No recent customers',
      message: 'New customer activity will appear here.',
      className: 'dashboard-empty-state',
    }).render();

  return new Card({
    title: 'Recent Customers',
    content,
    className: 'dashboard-panel dashboard-panel-customers',
  }).render();
}
