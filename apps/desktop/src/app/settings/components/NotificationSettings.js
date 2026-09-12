import { Button } from '../../../shared/components/Button.js';

export function NotificationSettings({ values, onChange, onSave, onCancel }) {
  const section = document.createElement('section');
  section.className = 'settings-section card';

  const header = document.createElement('div');
  header.className = 'card-header';
  header.innerHTML = '<h3 class="card-title">Notification preferences</h3>';

  const body = document.createElement('div');
  body.className = 'card-body settings-body';

  const list = document.createElement('div');
  list.className = 'settings-toggle-list';

  const toggles = [
    ['Appointment reminders', 'appointmentReminders'],
    ['Appointment confirmations', 'appointmentConfirmations'],
    ['Payment reminders', 'paymentReminders'],
    ['Follow-up reminders', 'followUpReminders'],
    ['New customer notifications', 'newCustomerNotifications'],
    ['Email notifications', 'emailNotifications'],
    ['Desktop notifications', 'desktopNotifications'],
  ];

  toggles.forEach(([label, key]) => {
    const row = document.createElement('label');
    row.className = 'settings-toggle-row';
    const text = document.createElement('span');
    text.textContent = label;
    const toggle = document.createElement('input');
    toggle.type = 'checkbox';
    toggle.checked = Boolean(values[key]);
    toggle.addEventListener('change', (event) => onChange({ [key]: event.target.checked }));
    row.append(text, toggle);
    list.appendChild(row);
  });

  const actions = document.createElement('div');
  actions.className = 'settings-actions';
  actions.appendChild(new Button({ label: 'Save changes', variant: 'primary', onClick: () => onSave() }).render());
  actions.appendChild(new Button({ label: 'Cancel', variant: 'secondary', onClick: onCancel }).render());

  body.append(list, actions);
  section.append(header, body);
  return section;
}
