import { StatCard } from '../../../shared/components/Card.js';
import { dashboardStats } from '../../../data/mock/dashboardData.js';

export function DashboardStats() {
  const container = document.createElement('div');
  container.className = 'dashboard-stats';

  dashboardStats.forEach((stat) => {
    const card = new StatCard({
      label: stat.label,
      value: stat.value,
      change: stat.change,
      className: `dashboard-stat dashboard-stat-${stat.tone}`,
    }).render();

    const detail = document.createElement('span');
    detail.className = 'dashboard-stat-detail';
    detail.textContent = stat.detail;
    card.appendChild(detail);
    container.appendChild(card);
  });

  return container;
}
