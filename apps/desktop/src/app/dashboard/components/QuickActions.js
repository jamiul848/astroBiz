import { Button } from '../../../shared/components/Button.js';
import { Card } from '../../../shared/components/Card.js';

export function QuickActions({ onNavigate }) {
  const actions = document.createElement('div');
  actions.className = 'dashboard-quick-actions';

  const quickActions = [
    { label: 'Add Customer', icon: '+', path: 'customers', variant: 'primary' },
    { label: 'Generate Kundali', icon: '*', path: 'kundalis', variant: 'secondary' },
    { label: 'New Appointment', icon: '+', path: 'appointments', variant: 'accent' },
    { label: 'Create Invoice', icon: '+', path: 'billing', variant: 'secondary' },
  ];

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

  return actions;
}
