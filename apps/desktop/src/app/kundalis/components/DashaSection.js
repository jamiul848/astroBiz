import { Card } from '../../../shared/components/Card.js';
import { StatusBadge } from '../../../shared/components/Badge.js';

export function DashaSection(dashas = []) {
  const list = document.createElement('div');
  list.className = 'kundali-dasha-list';
  dashas.forEach((dasha) => {
    const item = document.createElement('div');
    item.className = 'kundali-dasha-item';
    const heading = document.createElement('div');
    heading.className = 'kundali-dasha-heading';
    const title = document.createElement('strong');
    title.textContent = `${dasha.name} dasha`;
    heading.appendChild(title);
    heading.appendChild(new StatusBadge({ label: dasha.status, status: dasha.status === 'Current' ? 'success' : 'neutral' }).render());
    item.appendChild(heading);
    const dates = document.createElement('span');
    dates.textContent = `${dasha.startDate} - ${dasha.endDate}`;
    item.appendChild(dates);
    (dasha.antardashas || []).forEach((period) => {
      const nested = document.createElement('div');
      nested.className = 'kundali-antardasha';
      nested.textContent = `${period.name}: ${period.startDate} - ${period.endDate}`;
      item.appendChild(nested);
    });
    list.appendChild(item);
  });
  return new Card({ title: 'Dasha periods', content: list, className: 'kundali-panel' }).render();
}
