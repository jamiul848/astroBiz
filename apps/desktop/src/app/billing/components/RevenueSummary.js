import { StatCard } from '../../../shared/components/Card.js';

const formatCurrency = (value) => `Rs ${value.toLocaleString('en-IN')}`;

export function RevenueSummary(summary) {
  const container = document.createElement('div'); container.className = 'billing-summary-grid';
  [
    ['Total revenue', formatCurrency(summary.totalRevenue), 'All mock invoices'],
    ['Paid amount', formatCurrency(summary.paidAmount), 'Completed payments'],
    ['Pending amount', formatCurrency(summary.pendingAmount), 'Needs follow-up'],
    ['Invoices', String(summary.invoiceCount), 'Across this workspace'],
  ].forEach(([label, value, detail]) => { const card = new StatCard({ label, value, className: 'billing-summary-card' }).render(); const note = document.createElement('span'); note.className = 'billing-summary-detail'; note.textContent = detail; card.appendChild(note); container.appendChild(card); });
  return container;
}
