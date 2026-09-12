import { Button } from '../../../shared/components/Button.js';
import { Input } from '../../../shared/components/Input.js';
import { Select } from '../../../shared/components/Select.js';

export function AstrologySettings({ values, onChange, onSave, onCancel }) {
  const section = document.createElement('section');
  section.className = 'settings-section card';

  const header = document.createElement('div');
  header.className = 'card-header';
  header.innerHTML = '<h3 class="card-title">Astrology preferences</h3>';

  const body = document.createElement('div');
  body.className = 'card-body settings-body';

  const grid = document.createElement('div');
  grid.className = 'settings-form-grid';

  const astrologySystem = new Select({
    id: 'astrology-system',
    label: 'Astrology system',
    value: values.astrologySystem,
    options: [
      { value: 'Vedic / Jyotish', label: 'Vedic / Jyotish' },
      { value: 'Western', label: 'Western' },
      { value: 'Karmic', label: 'Karmic' },
    ],
    onChange: (value) => onChange({ astrologySystem: value }),
  }).render();

  const ayanamsa = new Select({
    id: 'ayanamsa',
    label: 'Ayanamsa',
    value: values.ayanamsa,
    options: [
      { value: 'Lahiri', label: 'Lahiri' },
      { value: 'Raman', label: 'Raman' },
      { value: 'Fagan-Bradley', label: 'Fagan-Bradley' },
    ],
    onChange: (value) => onChange({ ayanamsa: value }),
  }).render();

  const houseSystem = new Select({
    id: 'house-system',
    label: 'House system',
    value: values.houseSystem,
    options: [
      { value: 'Placidus', label: 'Placidus' },
      { value: 'Koch', label: 'Koch' },
      { value: 'Whole Sign', label: 'Whole Sign' },
    ],
    onChange: (value) => onChange({ houseSystem: value }),
  }).render();

  const chartStyle = new Select({
    id: 'chart-style',
    label: 'Default chart style',
    value: values.chartStyle,
    options: [
      { value: 'Traditional', label: 'Traditional' },
      { value: 'Modern', label: 'Modern' },
      { value: 'Minimal', label: 'Minimal' },
    ],
    onChange: (value) => onChange({ chartStyle: value }),
  }).render();

  const defaultLanguage = new Select({
    id: 'default-language',
    label: 'Default language',
    value: values.defaultLanguage,
    options: [
      { value: 'English', label: 'English' },
      { value: 'Hindi', label: 'Hindi' },
      { value: 'Marathi', label: 'Marathi' },
    ],
    onChange: (value) => onChange({ defaultLanguage: value }),
  }).render();

  const timeZone = new Input({
    id: 'time-zone',
    label: 'Time zone',
    value: values.timeZone,
    onChange: (value) => onChange({ timeZone: value }),
  }).render();

  grid.append(astrologySystem, ayanamsa, houseSystem, chartStyle, defaultLanguage, timeZone);

  const actions = document.createElement('div');
  actions.className = 'settings-actions';
  actions.appendChild(new Button({ label: 'Save changes', variant: 'primary', onClick: () => onSave() }).render());
  actions.appendChild(new Button({ label: 'Cancel', variant: 'secondary', onClick: onCancel }).render());

  body.append(grid, actions);
  section.append(header, body);
  return section;
}
