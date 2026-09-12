import { Button } from '../../../shared/components/Button.js';
import { Input } from '../../../shared/components/Input.js';

export function BillingSettings({ values, onChange, onSave, onCancel }) {
  const section = document.createElement('section');
  section.className = 'settings-section card';

  const header = document.createElement('div');
  header.className = 'card-header';
  header.innerHTML = '<h3 class="card-title">Invoice / Billing settings</h3>';

  const body = document.createElement('div');
  body.className = 'card-body settings-body';

  const grid = document.createElement('div');
  grid.className = 'settings-form-grid';

  const fields = [
    new Input({ id: 'billing-currency', label: 'Currency', value: values.currency, onChange: (value) => onChange({ currency: value }) }).render(),
    new Input({ id: 'billing-tax-number', label: 'Tax/GST number', value: values.taxNumber, onChange: (value) => onChange({ taxNumber: value }) }).render(),
    new Input({ id: 'billing-tax-percent', label: 'Default tax percentage', value: values.defaultTaxPercentage, onChange: (value) => onChange({ defaultTaxPercentage: value }) }).render(),
    new Input({ id: 'billing-prefix', label: 'Invoice prefix', value: values.invoicePrefix, onChange: (value) => onChange({ invoicePrefix: value }) }).render(),
  ];

  fields.forEach((field) => grid.appendChild(field));

  const instructions = document.createElement('div');
  instructions.className = 'form-group';
  const instructionsLabel = document.createElement('label');
  instructionsLabel.className = 'form-label';
  instructionsLabel.textContent = 'Payment instructions';
  const instructionsText = document.createElement('textarea');
  instructionsText.className = 'input settings-textarea';
  instructionsText.value = values.paymentInstructions;
  instructionsText.addEventListener('input', (event) => onChange({ paymentInstructions: event.target.value }));
  instructions.append(instructionsLabel, instructionsText);

  const footer = document.createElement('div');
  footer.className = 'form-group';
  const footerLabel = document.createElement('label');
  footerLabel.className = 'form-label';
  footerLabel.textContent = 'Invoice footer';
  const footerText = document.createElement('textarea');
  footerText.className = 'input settings-textarea';
  footerText.value = values.invoiceFooter;
  footerText.addEventListener('input', (event) => onChange({ invoiceFooter: event.target.value }));
  footer.append(footerLabel, footerText);

  const actions = document.createElement('div');
  actions.className = 'settings-actions';
  actions.appendChild(new Button({ label: 'Save changes', variant: 'primary', onClick: () => onSave() }).render());
  actions.appendChild(new Button({ label: 'Cancel', variant: 'secondary', onClick: onCancel }).render());

  body.append(grid, instructions, footer, actions);
  section.append(header, body);
  return section;
}
