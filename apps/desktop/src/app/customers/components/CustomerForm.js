import { Button } from '../../../shared/components/Button.js';
import { Input } from '../../../shared/components/Input.js';
import { Select } from '../../../shared/components/Select.js';

const statusOptions = [
  { value: 'New', label: 'New' },
  { value: 'Active', label: 'Active' },
  { value: 'Follow-up', label: 'Follow-up' },
  { value: 'Inactive', label: 'Inactive' },
  { value: 'VIP', label: 'VIP' },
];

function textAreaField(id, label, value, required = false) {
  const group = document.createElement('div');
  group.className = 'form-group';
  const labelElement = document.createElement('label');
  labelElement.className = `form-label ${required ? 'required' : ''}`;
  labelElement.htmlFor = id;
  labelElement.textContent = label;
  group.appendChild(labelElement);
  const textarea = document.createElement('textarea');
  textarea.id = id;
  textarea.name = id;
  textarea.className = 'textarea customer-form-textarea';
  textarea.value = value || '';
  group.appendChild(textarea);
  return group;
}

export function CustomerForm({ customer = {}, onSubmit, onCancel }) {
  customer = customer || {};
  const form = document.createElement('form');
  form.className = 'customer-form';
  form.noValidate = true;
  form.innerHTML = '<div class="customer-form-section-title">Personal information</div>';

  const fields = [
    { id: 'name', label: 'Full name', required: true, placeholder: 'e.g. Aanya Mehta' },
    { id: 'phone', label: 'Phone', required: true, placeholder: '+91 90000 00000', type: 'tel' },
    { id: 'email', label: 'Email', required: true, placeholder: 'name@example.test', type: 'email' },
  ];

  const personalGrid = document.createElement('div');
  personalGrid.className = 'customer-form-grid';
  fields.forEach((field) => personalGrid.appendChild(new Input({ ...field, name: field.id, value: customer[field.id] || '', size: 'md' }).render()));
  form.appendChild(personalGrid);
  form.appendChild(textAreaField('address', 'Address', customer.address));

  const birthTitle = document.createElement('div');
  birthTitle.className = 'customer-form-section-title';
  birthTitle.textContent = 'Birth information';
  form.appendChild(birthTitle);
  const birthGrid = document.createElement('div');
  birthGrid.className = 'customer-form-grid';
  birthGrid.appendChild(new Input({ id: 'dateOfBirth', name: 'dateOfBirth', label: 'Date of birth', type: 'date', value: customer.dateOfBirth || '' }).render());
  birthGrid.appendChild(new Input({ id: 'timeOfBirth', name: 'timeOfBirth', label: 'Time of birth', type: 'time', value: customer.timeOfBirth || '' }).render());
  birthGrid.appendChild(new Input({ id: 'birthPlace', name: 'birthPlace', label: 'Birth place', value: customer.birthPlace || '', placeholder: 'City, region' }).render());
  form.appendChild(birthGrid);

  const locationTitle = document.createElement('div');
  locationTitle.className = 'customer-form-section-title';
  locationTitle.textContent = 'Location and status';
  form.appendChild(locationTitle);
  const locationGrid = document.createElement('div');
  locationGrid.className = 'customer-form-grid';
  locationGrid.appendChild(new Input({ id: 'latitude', name: 'latitude', label: 'Latitude', value: customer.latitude || '', placeholder: 'e.g. 18.5204' }).render());
  locationGrid.appendChild(new Input({ id: 'longitude', name: 'longitude', label: 'Longitude', value: customer.longitude || '', placeholder: 'e.g. 73.8567' }).render());
  locationGrid.appendChild(new Input({ id: 'timezone', name: 'timezone', label: 'Timezone', value: customer.timezone || 'Asia/Kolkata' }).render());
  locationGrid.appendChild(new Select({ id: 'status', name: 'status', label: 'Status', value: customer.status || 'New', options: statusOptions }).render());
  form.appendChild(locationGrid);
  form.appendChild(textAreaField('notes', 'Notes', customer.notes));

  const errorSummary = document.createElement('div');
  errorSummary.className = 'customer-form-error';
  errorSummary.setAttribute('role', 'alert');
  form.appendChild(errorSummary);

  const actions = document.createElement('div');
  actions.className = 'customer-form-actions';
  actions.appendChild(new Button({ label: 'Cancel', variant: 'secondary', onClick: onCancel }).render());
  actions.appendChild(new Button({ label: customer.id ? 'Save changes' : 'Add customer', variant: 'primary', type: 'submit' }).render());
  form.appendChild(actions);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(form).entries());
    const errors = [];
    if (!values.name.trim()) errors.push('Full name is required.');
    if (!values.phone.trim()) errors.push('Phone is required.');
    if (!values.email.trim()) errors.push('Email is required.');
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) errors.push('Enter a valid email address.');
    if (errors.length) {
      errorSummary.textContent = errors.join(' ');
      return;
    }
    errorSummary.textContent = '';
    onSubmit({ ...values, name: values.name.trim(), phone: values.phone.trim(), email: values.email.trim() });
  });

  return form;
}
