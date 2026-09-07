/**
 * Table Component
 * Reusable data table
 */
export class Table {
  constructor(options = {}) {
    this.columns = options.columns || []; // [{ key: 'id', label: 'ID' }, ...]
    this.rows = options.rows || []; // [{ id: 1, name: 'John' }, ...]
    this.className = options.className || '';
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.className = 'table-wrapper';

    const table = document.createElement('table');
    table.className = `table ${this.className}`;

    // Render header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    this.columns.forEach((col) => {
      const th = document.createElement('th');
      th.textContent = col.label;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Render body
    const tbody = document.createElement('tbody');

    this.rows.forEach((row) => {
      const tr = document.createElement('tr');

      this.columns.forEach((col) => {
        const td = document.createElement('td');
        td.textContent = row[col.key] || '';
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    wrapper.appendChild(table);

    return wrapper;
  }
}
