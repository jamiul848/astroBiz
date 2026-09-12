import { Button } from '../../../shared/components/Button.js';

const presets = [
  { key: 'today', label: 'Today' },
  { key: 'thisWeek', label: 'This week' },
  { key: 'thisMonth', label: 'This month' },
  { key: 'lastMonth', label: 'Last month' },
  { key: 'custom', label: 'Custom range' },
];

export function ReportFilters({ period, startDate, endDate, onPresetChange, onCustomRangeChange }) {
  const wrapper = document.createElement('div');
  wrapper.className = 'reports-filters';

  const presetRow = document.createElement('div');
  presetRow.className = 'report-preset-row';

  presets.forEach((preset) => {
    const isActive = period === preset.key;
    const button = new Button({
      label: preset.label,
      variant: isActive ? 'primary' : 'secondary',
      size: 'sm',
      className: isActive ? 'report-preset active' : 'report-preset',
      onClick: () => onPresetChange(preset.key),
    }).render();
    presetRow.appendChild(button);
  });

  wrapper.appendChild(presetRow);

  const customRange = document.createElement('div');
  customRange.className = 'report-custom-range';

  const startInput = document.createElement('input');
  startInput.type = 'date';
  startInput.value = startDate || '2024-06-01';
  startInput.className = 'report-date-input';

  const endInput = document.createElement('input');
  endInput.type = 'date';
  endInput.value = endDate || '2024-06-30';
  endInput.className = 'report-date-input';

  const applyButton = new Button({
    label: 'Apply range',
    variant: 'secondary',
    size: 'sm',
    onClick: () => onCustomRangeChange(startInput.value, endInput.value),
  }).render();

  customRange.append(startInput, endInput, applyButton);
  wrapper.appendChild(customRange);

  return wrapper;
}
