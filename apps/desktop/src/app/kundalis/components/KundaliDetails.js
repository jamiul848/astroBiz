import { Avatar, StatusBadge } from '../../../shared/components/Badge.js';
import { Button } from '../../../shared/components/Button.js';
import { Card } from '../../../shared/components/Card.js';
import { Toast } from '../../../shared/components/States.js';
import { DashaSection } from './DashaSection.js';
import { KundaliChart } from './KundaliChart.js';
import { PlanetaryPositions } from './PlanetaryPositions.js';

function detail(label, value) {
  const item = document.createElement('div');
  item.className = 'kundali-detail-item';
  item.innerHTML = `<span>${label}</span><strong>${value || 'Not provided'}</strong>`;
  return item;
}

export function KundaliDetails({ kundali, onBack }) {
  const page = document.createElement('div');
  page.className = 'kundali-details-content';
  const summary = document.createElement('div');
  summary.className = 'kundali-summary';
  summary.appendChild(new Avatar({ name: kundali.customerName, size: 'lg', color: kundali.avatarColor || 'accent' }).render());
  const heading = document.createElement('div');
  heading.className = 'kundali-summary-heading';
  heading.innerHTML = `<p class="kundali-eyebrow">Kundali detail</p><h2>${kundali.customerName}</h2><p>Updated ${kundali.updatedAt}</p>`;
  summary.appendChild(heading);
  summary.appendChild(new StatusBadge({ label: 'Ready', status: 'success' }).render());
  const actions = document.createElement('div');
  actions.className = 'kundali-summary-actions';
  actions.appendChild(new Button({ label: 'Back to Kundalis', variant: 'secondary', onClick: onBack }).render());
  actions.appendChild(new Button({ label: 'Download PDF', variant: 'primary', onClick: () => Toast.info('PDF download will be available when reporting is connected.') }).render());
  summary.appendChild(actions);
  page.appendChild(summary);

  const birthInfo = document.createElement('div');
  birthInfo.className = 'kundali-birth-info kundali-panel';
  birthInfo.appendChild(new Card({ title: 'Birth information', content: (() => { const group = document.createElement('div'); group.className = 'kundali-detail-grid'; const info = kundali.birthInformation; group.append(detail('Date of birth', info.dateOfBirth), detail('Time of birth', info.timeOfBirth), detail('Birth place', info.birthPlace), detail('Latitude', info.latitude), detail('Longitude', info.longitude), detail('Timezone', info.timezone)); return group; })(), className: 'kundali-inner-card' }).render());
  page.appendChild(birthInfo);

  const visualGrid = document.createElement('div');
  visualGrid.className = 'kundali-visual-grid';
  visualGrid.appendChild(KundaliChart({ chart: kundali.chart }));
  const nakshatra = new Card({ title: 'Nakshatra', content: (() => { const group = document.createElement('div'); group.className = 'kundali-detail-grid kundali-detail-grid-single'; group.append(detail('Nakshatra', kundali.nakshatra.name), detail('Pada', kundali.nakshatra.pada), detail('Lord', kundali.nakshatra.lord), detail('Moon sign / Rashi', kundali.nakshatra.moonSign)); return group; })(), className: 'kundali-panel' }).render();
  visualGrid.appendChild(nakshatra);
  page.appendChild(visualGrid);
  page.appendChild(PlanetaryPositions(kundali.planetaryPositions));

  const insightGrid = document.createElement('div');
  insightGrid.className = 'kundali-insight-grid';
  insightGrid.appendChild(DashaSection(kundali.dashas));
  insightGrid.appendChild(new Card({ title: 'Dosha review', content: (() => { const list = document.createElement('div'); list.className = 'kundali-dosha-list'; kundali.doshas.forEach((dosha) => { const item = document.createElement('div'); item.className = 'kundali-dosha-item'; item.innerHTML = `<div class="kundali-dosha-heading"><strong>${dosha.name}</strong><span>${dosha.severity}</span></div><p>${dosha.description}</p>`; item.querySelector('.kundali-dosha-heading').appendChild(new StatusBadge({ label: dosha.status, status: dosha.severity === 'Medium' ? 'warning' : 'success' }).render()); list.appendChild(item); }); return list; })(), className: 'kundali-panel' }).render());
  page.appendChild(insightGrid);

  const reportContent = document.createElement('div');
  reportContent.className = 'kundali-report-content';
  const reportSummary = document.createElement('p');
  reportSummary.textContent = kundali.report.summary;
  reportContent.appendChild(reportSummary);
  const highlights = document.createElement('ul');
  kundali.report.highlights.forEach((highlight) => { const item = document.createElement('li'); item.textContent = highlight; highlights.appendChild(item); });
  reportContent.appendChild(highlights);
  page.appendChild(new Card({ title: kundali.report.title, content: reportContent, className: 'kundali-panel kundali-report-panel' }).render());
  return page;
}
