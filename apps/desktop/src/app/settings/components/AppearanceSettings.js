import { Button } from '../../../shared/components/Button.js';
import { Select } from '../../../shared/components/Select.js';

export function AppearanceSettings({ values, onChange, onSave, onCancel }) {
  const section = document.createElement('section');
  section.className = 'settings-section card';

  const header = document.createElement('div');
  header.className = 'card-header';
  header.innerHTML = '<h3 class="card-title">Appearance</h3>';

  const body = document.createElement('div');
  body.className = 'card-body settings-body';

  const grid = document.createElement('div');
  grid.className = 'settings-form-grid';

  const themePreference = new Select({
    id: 'theme-preference',
    label: 'Theme preference',
    value: values.themePreference,
    options: [
      { value: 'Light', label: 'Light' },
      { value: 'Dark', label: 'Dark' },
      { value: 'System', label: 'System' },
    ],
    onChange: (value) => onChange({ themePreference: value }),
  }).render();

  const layoutPreference = new Select({
    id: 'layout-preference',
    label: 'Layout preference',
    value: values.layoutPreference,
    options: [
      { value: 'Comfortable', label: 'Comfortable' },
      { value: 'Compact', label: 'Compact' },
    ],
    onChange: (value) => onChange({ layoutPreference: value }),
  }).render();

  grid.append(themePreference, layoutPreference);

  const actions = document.createElement('div');
  actions.className = 'settings-actions';
  actions.appendChild(new Button({ label: 'Save changes', variant: 'primary', onClick: () => onSave() }).render());
  actions.appendChild(new Button({ label: 'Cancel', variant: 'secondary', onClick: onCancel }).render());

  body.append(grid, actions);
  section.append(header, body);
  return section;
}
