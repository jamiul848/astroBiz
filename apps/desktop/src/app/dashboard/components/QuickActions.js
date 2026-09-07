import { Button } from '../../../shared/components/Button.js';
import { Card } from '../../../shared/components/Card.js';
import { quickActions } from '../../../data/mock/dashboardData.js';

export function QuickActions({ onNavigate }) {
  const actions = document.createElement('div');
  actions.className = 'dashboard-quick-actions';

  quickActions.forEach((action) => {
    const button = new Button({
      label: `${action.icon}  ${action.label}`,
      variant: action.variant,
      size: 'md',
      className: 'dashboard-action-button',
      onClick: () => onNavigate(action.path),
    });
    actions.appendChild(button.render());
  });

  return new Card({
    title: 'Quick Actions',
    content: actions,
    className: 'dashboard-panel dashboard-panel-actions',
  }).render();
}
