import { Card } from '../../../shared/components/Card.js';
import { StatusBadge } from '../../../shared/components/Badge.js';

export function PlanetaryPositions(positions = []) {
  const content = document.createElement('div');
  content.className = 'kundali-table-wrap';
  const table = document.createElement('table');
  table.className = 'table kundali-data-table';
  table.innerHTML = '<thead><tr><th>Planet</th><th>Sign</th><th>Degree</th><th>House</th><th>Nakshatra</th><th>Status</th></tr></thead>';
  const body = document.createElement('tbody');
  positions.forEach((position) => {
    const row = document.createElement('tr');
    [position.planet, position.sign, position.degree, position.house, position.nakshatra].forEach((value) => {
      const cell = document.createElement('td');
      cell.textContent = value;
      row.appendChild(cell);
    });
    const statusCell = document.createElement('td');
    statusCell.appendChild(new StatusBadge({ label: position.status, status: position.status === 'Retrograde' ? 'warning' : 'success' }).render());
    row.appendChild(statusCell);
    body.appendChild(row);
  });
  table.appendChild(body);
  content.appendChild(table);
  return new Card({ title: 'Planetary positions', content, className: 'kundali-panel kundali-positions-panel' }).render();
}
