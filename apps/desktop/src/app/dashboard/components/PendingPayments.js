import { Card } from '../../../shared/components/Card.js';
import { EmptyState } from '../../../shared/components/States.js';

export async function PendingPayments(repo) {
  let content = document.createElement('div');
  
  try {
    const [invoices, customers] = await Promise.all([
      repo.getInvoices(),
      repo.getCustomers(),
    ]);

    const pendingInvoices = invoices.filter(i => i.paymentStatus === 'Pending' || i.paymentStatus === 'Overdue');
    const today = new Date().toISOString().split('T')[0];

    if (pendingInvoices.length === 0) {
      content = new EmptyState({
        icon: '✓',
        title: 'No pending payments',
        message: 'All invoices are paid up.',
        className: 'dashboard-empty-state',
      }).render();
    } else {
      const table = document.createElement('table');
      table.className = 'dashboard-dense-table';
      
      const thead = document.createElement('thead');
      thead.innerHTML = `
        <tr>
          <th>Customer</th>
          <th>Invoice</th>
          <th>Amount</th>
          <th>Due</th>
        </tr>
      `;
      table.appendChild(thead);
      
      const tbody = document.createElement('tbody');
      
      pendingInvoices.slice(0, 3).forEach(inv => {
        const customer = customers.find(c => c.id === inv.customerId);
        const name = customer ? customer.name : 'Unknown';
        
        let dueDisplay = inv.dueDate;
        if (inv.dueDate === today) dueDisplay = 'Today';
        else if (inv.dueDate < today) dueDisplay = 'Overdue';
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${name}</td>
          <td>${inv.id}</td>
          <td>₹${inv.total ? inv.total.toLocaleString() : '0'}</td>
          <td style="color: ${dueDisplay === 'Overdue' ? 'var(--color-danger)' : 'inherit'}">${dueDisplay}</td>
        `;
        tbody.appendChild(tr);
      });
      
      table.appendChild(tbody);
      content.appendChild(table);
    }
  } catch (err) {
    content.textContent = 'Failed to load pending payments.';
  }

  return new Card({
    title: 'Pending Payments',
    content,
    className: 'dashboard-panel dashboard-panel-pending',
  }).render();
}
