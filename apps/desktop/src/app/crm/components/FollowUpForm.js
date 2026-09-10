import { Button } from '../../../shared/components/Button.js';
import { Input } from '../../../shared/components/Input.js';
import { Select } from '../../../shared/components/Select.js';

const priorityOptions = [
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
];

const statusOptions = [
  { value: 'Pending', label: 'Pending' },
  { value: 'Due', label: 'Due' },
  { value: 'Completed', label: 'Completed' },
  { value: 'Cancelled', label: 'Cancelled' },
];

export function FollowUpForm({ followUp = {}, customers = [], onSubmit, onCancel }) {
  const form = document.createElement('form');
  form.className = 'crm-form';
  form.noValidate = true;

  const grid = document.createElement('div');
  grid.className = 'crm-form-grid';

  const customerOptions = [{ value: '', label: 'Select a customer' }, ...customers.map((customer) => ({ value: customer.id, label: customer.name }))];

  grid.appendChild(new Select({ id: 'followup-customer', name: 'customerId', label: 'Customer', required: true, value: followUp.customerId || '', options: customerOptions }).render());
  grid.appendChild(new Input({ id: 'followup-title', name: 'title', label: 'Title', required: true, value: followUp.title || '', placeholder: 'Follow-up title' }).render());
  grid.appendChild(new Input({ id: 'followup-date', name: 'dueDate', label: 'Due date', type: 'date', required: true, value: followUp.dueDate || '' }).render());
  grid.appendChild(new Input({ id: 'followup-time', name: 'dueTime', label: 'Due time', type: 'time', value: followUp.dueTime || '' }).render());
  grid.appendChild(new Select({ id: 'followup-priority', name: 'priority', label: 'Priority', value: followUp.priority || 'Medium', options: priorityOptions }).render());
  grid.appendChild(new Select({ id: 'followup-status', name: 'status', label: 'Status', value: followUp.status || 'Pending', options: statusOptions }).render());

  const descriptionField = document.createElement('div');
  descriptionField.className = 'form-group';
  descriptionField.innerHTML = '<label class="form-label" for="followup-description">Description</label>';

  const textarea = document.createElement('textarea');
  textarea.id = 'followup-description';
  textarea.name = 'description';
  textarea.className = 'textarea';
  textarea.value = followUp.description || '';
  textarea.placeholder = 'Add details for this follow-up...';
  descriptionField.appendChild(textarea);
  form.appendChild(grid);
  form.appendChild(descriptionField);

  const noteField = document.createElement('div');
  noteField.className = 'form-group';
  noteField.innerHTML = '<label class="form-label" for="followup-notes">CRM notes</label>';
  const notes = document.createElement('textarea');
  notes.id = 'followup-notes';
  notes.name = 'notes';
  notes.className = 'textarea';
  notes.value = followUp.notes || '';
  noteField.appendChild(notes);
  form.appendChild(noteField);

  const error = document.createElement('div');
  error.className = 'form-error';
  form.appendChild(error);

  const actions = document.createElement('div');
  actions.className = 'crm-form-actions';
  actions.appendChild(new Button({ label: 'Cancel', variant: 'secondary', onClick: onCancel }).render());
  actions.appendChild(new Button({ label: followUp.id ? 'Save changes' : 'Create follow-up', variant: 'primary', type: 'submit' }).render());
  form.appendChild(actions);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(form).entries());
    const errors = [];

    if (!values.customerId) errors.push('Customer is required.');
    if (!values.title || !String(values.title).trim()) errors.push('Title is required.');
    if (!values.dueDate) errors.push('Due date is required.');

    if (errors.length) {
      error.textContent = errors.join(' ');
      return;
    }

    error.textContent = '';
    onSubmit({
      ...followUp,
      ...values,
      title: String(values.title).trim(),
      description: String(values.description || '').trim(),
      notes: String(values.notes || '').trim(),
      status: values.status || 'Pending',
      priority: values.priority || 'Medium',
    });
  });

  return form;
}
