import { StatCard } from '../../../shared/components/Card.js';
import { Button } from '../../../shared/components/Button.js';
import { Toast } from '../../../shared/components/States.js';

export function ReportsDashboard({ summary, onExport, onDownloadPdf }) {
  const wrapper = document.createElement('div');
  wrapper.className = 'reports-dashboard';

  const summaryCards = [
    { label: 'Total revenue', value: `₹${summary.totalRevenue.toLocaleString()}` },
    { label: 'Total customers', value: summary.totalCustomers },
    { label: 'Total appointments', value: summary.totalAppointments },
    { label: 'Completed appointments', value: summary.completedAppointments },
    { label: 'Pending payments', value: `₹${summary.pendingPayments.toLocaleString()}` },
    { label: 'Follow-ups completed', value: summary.followUpsCompleted },
  ];

  const grid = document.createElement('div');
  grid.className = 'reports-summary-grid';

  summaryCards.forEach((card) => {
    grid.appendChild(new StatCard({ label: card.label, value: String(card.value) }).render());
  });

  const actions = document.createElement('div');
  actions.className = 'reports-actions';
  actions.appendChild(new Button({
    label: 'Export report',
    variant: 'primary',
    onClick: () => {
      onExport?.();
      Toast.info('Report export will be available when backend reporting is connected.');
    },
  }).render());
  actions.appendChild(new Button({
    label: 'Download PDF',
    variant: 'secondary',
    onClick: () => {
      onDownloadPdf?.();
      Toast.info('PDF download will be available when backend reporting is connected.');
    },
  }).render());

  wrapper.append(grid, actions);
  return wrapper;
}
