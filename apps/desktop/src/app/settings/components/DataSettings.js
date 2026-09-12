import { Button } from '../../../shared/components/Button.js';

export function DataSettings({ values, onExport, onImport, onClear }) {
  const section = document.createElement('section');
  section.className = 'settings-section card';

  const header = document.createElement('div');
  header.className = 'card-header';
  header.innerHTML = '<h3 class="card-title">Data / Application</h3>';

  const body = document.createElement('div');
  body.className = 'card-body settings-body';

  const meta = document.createElement('div');
  meta.className = 'settings-data-grid';
  meta.innerHTML = `
    <div><strong>Application version</strong><span>${values.version}</span></div>
    <div><strong>Frontend environment</strong><span>${values.environment}</span></div>
    <div><strong>Data storage status</strong><span>${values.dataStorageStatus}</span></div>
  `;

  const actions = document.createElement('div');
  actions.className = 'settings-actions';
  actions.appendChild(new Button({ label: 'Export application data', variant: 'secondary', onClick: onExport }).render());
  actions.appendChild(new Button({ label: 'Import application data', variant: 'secondary', onClick: onImport }).render());
  actions.appendChild(new Button({ label: 'Clear mock data', variant: 'danger', onClick: onClear }).render());

  body.append(meta, actions);
  section.append(header, body);
  return section;
}
