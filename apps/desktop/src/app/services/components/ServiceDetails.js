import { StatusBadge } from '../../../shared/components/Badge.js';
import { Button } from '../../../shared/components/Button.js';
import { Card } from '../../../shared/components/Card.js';

export function ServiceDetails({ service, onBack, onEdit }) {
  const content = document.createElement('div'); content.className = 'service-details';
  const summary = document.createElement('div'); summary.className = 'service-details-summary';
  const heading = document.createElement('div'); heading.className = 'service-details-heading'; heading.innerHTML = `<p class="service-eyebrow">Service detail</p><h2>${service.name}</h2><p>${service.description || 'No description provided.'}</p>`; summary.appendChild(heading);
  summary.appendChild(new StatusBadge({ label: service.active ? 'Active' : 'Inactive', status: service.active ? 'success' : 'neutral' }).render());
  const actions = document.createElement('div'); actions.className = 'service-details-actions'; actions.appendChild(new Button({ label: 'Back to services', variant: 'secondary', onClick: onBack }).render()); actions.appendChild(new Button({ label: 'Edit service', variant: 'primary', onClick: onEdit }).render()); summary.appendChild(actions); content.appendChild(summary);
  const info = document.createElement('div'); info.className = 'service-details-grid';
  info.appendChild(new Card({ title: 'Service information', content: (() => { const group = document.createElement('div'); group.className = 'service-info-list'; [['Name', service.name], ['Price', `Rs ${service.price.toLocaleString('en-IN')}`], ['Duration', `${service.duration} minutes`], ['Availability', service.active ? 'Active' : 'Inactive']].forEach(([label, value]) => { const item = document.createElement('div'); item.className = 'service-detail-item'; item.innerHTML = `<span>${label}</span><strong>${value}</strong>`; group.appendChild(item); }); return group; })(), className: 'service-detail-card' }).render());
  info.appendChild(new Card({ title: 'Description', content: (() => { const text = document.createElement('p'); text.className = 'service-detail-description'; text.textContent = service.description || 'No description provided.'; return text; })(), className: 'service-detail-card' }).render()); content.appendChild(info); return content;
}
