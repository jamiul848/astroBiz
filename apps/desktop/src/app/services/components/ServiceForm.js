import { Button } from '../../../shared/components/Button.js';
import { Input } from '../../../shared/components/Input.js';
import { Select } from '../../../shared/components/Select.js';

function descriptionField(value) {
  const group = document.createElement('div');
  group.className = 'form-group';
  group.innerHTML = '<label class="form-label" for="service-description">Description</label>';
  const textarea = document.createElement('textarea');
  textarea.id = 'service-description'; textarea.name = 'description'; textarea.className = 'textarea service-description'; textarea.value = value || '';
  group.appendChild(textarea); return group;
}

export function ServiceForm({ service = {}, onSubmit, onCancel }) {
  service = service || {};
  const form = document.createElement('form'); form.className = 'service-form'; form.noValidate = true;
  form.innerHTML = '<div class="service-form-section-title">Service details</div>';
  const grid = document.createElement('div'); grid.className = 'service-form-grid';
  grid.appendChild(new Input({ id: 'service-name', name: 'name', label: 'Service name', required: true, value: service.name || '', placeholder: 'e.g. Birth Chart Consultation' }).render());
  grid.appendChild(new Input({ id: 'service-price', name: 'price', label: 'Price', required: true, type: 'number', value: service.price ?? '', placeholder: '0', hint: 'Use a non-negative amount.' }).render());
  grid.appendChild(new Input({ id: 'service-duration', name: 'duration', label: 'Duration (minutes)', required: true, type: 'number', value: service.duration ?? '', placeholder: '60' }).render());
  grid.appendChild(new Select({ id: 'service-active', name: 'active', label: 'Availability', value: service.active === false ? 'false' : 'true', options: [{ value: 'true', label: 'Active' }, { value: 'false', label: 'Inactive' }] }).render());
  form.appendChild(grid); form.appendChild(descriptionField(service.description));
  const error = document.createElement('div'); error.className = 'service-form-error'; error.setAttribute('role', 'alert'); form.appendChild(error);
  const actions = document.createElement('div'); actions.className = 'service-form-actions';
  actions.appendChild(new Button({ label: 'Cancel', variant: 'secondary', onClick: onCancel }).render());
  actions.appendChild(new Button({ label: service.id ? 'Save changes' : 'Add service', variant: 'primary', type: 'submit' }).render()); form.appendChild(actions);
  form.addEventListener('submit', (event) => {
    event.preventDefault(); const values = Object.fromEntries(new FormData(form).entries()); const errors = [];
    if (!values.name.trim()) errors.push('Service name is required.');
    if (values.price === '' || Number.isNaN(Number(values.price)) || Number(values.price) < 0) errors.push('Price must be a valid non-negative number.');
    if (values.duration === '' || Number.isNaN(Number(values.duration)) || Number(values.duration) <= 0) errors.push('Duration must be a valid positive value.');
    error.textContent = errors.join(' '); if (errors.length) return;
    onSubmit({ ...values, name: values.name.trim(), price: Number(values.price), duration: Number(values.duration), active: values.active === 'true' });
  });
  return form;
}
