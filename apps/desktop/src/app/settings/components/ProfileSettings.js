import { Button } from '../../../shared/components/Button.js';
import { Input } from '../../../shared/components/Input.js';

export function ProfileSettings({ values, onChange, onSave, onCancel, onEdit }) {
  const section = document.createElement('section');
  section.className = 'settings-section card';

  const header = document.createElement('div');
  header.className = 'card-header';
  header.innerHTML = '<h3 class="card-title">Profile</h3>';

  const body = document.createElement('div');
  body.className = 'card-body settings-body';

  const form = document.createElement('div');
  form.className = 'settings-form-grid';

  const avatar = document.createElement('div');
  avatar.className = 'settings-avatar';
  avatar.textContent = values.avatar || 'AS';

  const nameField = new Input({
    id: 'settings-profile-name',
    name: 'astrologerName',
    label: 'Astrologer name',
    value: values.astrologerName,
    onChange: (value) => onChange({ astrologerName: value }),
  }).render();

  const emailField = new Input({
    id: 'settings-profile-email',
    name: 'email',
    label: 'Email',
    type: 'email',
    value: values.email,
    onChange: (value) => onChange({ email: value }),
  }).render();

  const phoneField = new Input({
    id: 'settings-profile-phone',
    name: 'phone',
    label: 'Phone',
    value: values.phone,
    onChange: (value) => onChange({ phone: value }),
  }).render();

  const bioField = document.createElement('div');
  bioField.className = 'form-group';
  const bioLabel = document.createElement('label');
  bioLabel.className = 'form-label';
  bioLabel.textContent = 'Bio';
  const bioText = document.createElement('textarea');
  bioText.className = 'input settings-textarea';
  bioText.value = values.bio;
  bioText.addEventListener('input', (event) => onChange({ bio: event.target.value }));
  bioField.append(bioLabel, bioText);

  const actions = document.createElement('div');
  actions.className = 'settings-actions';
  actions.appendChild(new Button({ label: 'Edit profile', variant: 'secondary', onClick: onEdit }).render());
  actions.appendChild(new Button({ label: 'Save changes', variant: 'primary', onClick: () => onSave() }).render());
  actions.appendChild(new Button({ label: 'Cancel', variant: 'secondary', onClick: onCancel }).render());

  form.append(avatar, nameField, emailField, phoneField, bioField);
  body.appendChild(form);
  body.appendChild(actions);
  section.append(header, body);
  return section;
}
