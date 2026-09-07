import { Card } from '../../../shared/components/Card.js';

export function KundaliChart({ chart }) {
  const chartArea = document.createElement('div');
  chartArea.className = 'kundali-chart-area';
  const grid = document.createElement('div');
  grid.className = 'kundali-chart-grid';
  (chart?.cells || []).forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.className = `kundali-chart-cell kundali-chart-cell-${index + 1}`;
    cellElement.textContent = cell;
    grid.appendChild(cellElement);
  });
  const center = document.createElement('div');
  center.className = 'kundali-chart-center';
  center.textContent = chart?.center || 'Chart data unavailable';
  grid.appendChild(center);
  chartArea.appendChild(grid);

  return new Card({ title: 'Birth chart', content: chartArea, className: 'kundali-panel kundali-chart-panel' }).render();
}
