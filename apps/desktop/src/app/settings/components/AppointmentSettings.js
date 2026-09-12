import { Button } from '../../../shared/components/Button.js';
import { Input } from '../../../shared/components/Input.js';
import { Select } from '../../../shared/components/Select.js';

export function AppointmentSettings({ values, onChange, onSave, onCancel }) {
  const section = document.createElement('section');
  section.className = 'settings-section card';

  const header = document.createElement('div');
  header.className = 'card-header';
  header.innerHTML = '<h3 class="card-title">Appointment settings</h3>';

  const body = document.createElement('div');
  body.className = 'card-body settings-body';

  const grid = document.createElement('div');
  grid.className = 'settings-form-grid';

  const defaultDuration = new Input({
    id: 'default-duration',
    label: 'Default appointment duration',
    value: values.defaultDuration,
    onChange: (value) => onChange({ defaultDuration: value }),
  }).render();

  const workingDays = new Input({
    id: 'working-days',
    label: 'Working days',
    value: values.workingDays,
    onChange: (value) => onChange({ workingDays: value }),
  }).render();

  const workingHours = new Input({
    id: 'working-hours',
    label: 'Working hours',
    value: values.workingHours,
    onChange: (value) => onChange({ workingHours: value }),
  }).render();

  const bufferTime = new Input({
    id: 'buffer-time',
    label: 'Appointment buffer time',
    value: values.bufferTime,
    onChange: (value) => onChange({ bufferTime: value }),
  }).render();

  const allowCancellation = new Select({
    id: 'allow-cancellation',
    label: 'Allow cancellation',
    value: String(values.allowCancellation),
    options: [
      { value: 'true', label: 'Yes' },
      { value: 'false', label: 'No' },
    ],
    onChange: (value) => onChange({ allowCancellation: value === 'true' }),
  }).render();

  const cancellationNoticePeriod = new Input({
    id: 'cancellation-notice-period',
    label: 'Cancellation notice period',
    value: values.cancellationNoticePeriod,
    onChange: (value) => onChange({ cancellationNoticePeriod: value }),
  }).render();

  grid.append(defaultDuration, workingDays, workingHours, bufferTime, allowCancellation, cancellationNoticePeriod);

  const actions = document.createElement('div');
  actions.className = 'settings-actions';
  actions.appendChild(new Button({ label: 'Save changes', variant: 'primary', onClick: () => onSave() }).render());
  actions.appendChild(new Button({ label: 'Cancel', variant: 'secondary', onClick: onCancel }).render());

  body.append(grid, actions);
  section.append(header, body);
  return section;
}
