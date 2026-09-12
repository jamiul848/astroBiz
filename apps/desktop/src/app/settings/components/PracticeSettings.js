import { Button } from '../../../shared/components/Button.js';
import { Input } from '../../../shared/components/Input.js';

export function PracticeSettings({ values, onChange, onSave, onCancel }) {
  const section = document.createElement('section');
  section.className = 'settings-section card';

  const header = document.createElement('div');
  header.className = 'card-header';
  header.innerHTML = '<h3 class="card-title">Practice / Business information</h3>';

  const body = document.createElement('div');
  body.className = 'card-body settings-body';

  const grid = document.createElement('div');
  grid.className = 'settings-form-grid';

  const fields = [
    new Input({ id: 'practice-name', label: 'Practice name', value: values.practiceName, onChange: (value) => onChange({ practiceName: value }) }).render(),
    new Input({ id: 'practice-address', label: 'Address', value: values.address, onChange: (value) => onChange({ address: value }) }).render(),
    new Input({ id: 'practice-city', label: 'City', value: values.city, onChange: (value) => onChange({ city: value }) }).render(),
    new Input({ id: 'practice-state', label: 'State', value: values.state, onChange: (value) => onChange({ state: value }) }).render(),
    new Input({ id: 'practice-country', label: 'Country', value: values.country, onChange: (value) => onChange({ country: value }) }).render(),
    new Input({ id: 'practice-pin', label: 'PIN code', value: values.pinCode, onChange: (value) => onChange({ pinCode: value }) }).render(),
    new Input({ id: 'practice-phone', label: 'Phone', value: values.phone, onChange: (value) => onChange({ phone: value }) }).render(),
    new Input({ id: 'practice-email', label: 'Email', type: 'email', value: values.email, onChange: (value) => onChange({ email: value }) }).render(),
    new Input({ id: 'practice-website', label: 'Website', value: values.website, onChange: (value) => onChange({ website: value }) }).render(),
  ];

  fields.forEach((field) => grid.appendChild(field));

  const actions = document.createElement('div');
  actions.className = 'settings-actions';
  actions.appendChild(new Button({ label: 'Save changes', variant: 'primary', onClick: () => onSave() }).render());
  actions.appendChild(new Button({ label: 'Cancel', variant: 'secondary', onClick: onCancel }).render());

  body.append(grid, actions);
  section.append(header, body);
  return section;
}
