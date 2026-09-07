/**
 * Select Component
 * Reusable dropdown select with options
 */
export class Select {
  constructor(options = {}) {
    this.id = options.id || '';
    this.name = options.name || '';
    this.options = options.options || [];
    this.value = options.value || '';
    this.disabled = options.disabled || false;
    this.required = options.required || false;
    this.label = options.label || '';
    this.hint = options.hint || '';
    this.error = options.error || '';
    this.onChange = options.onChange || (() => {});
    this.className = options.className || '';
  }

  render() {
    const container = document.createElement('div');
    container.className = 'form-group';

    if (this.label) {
      const label = document.createElement('label');
      label.className = `form-label ${this.required ? 'required' : ''}`;
      label.htmlFor = this.id;
      label.textContent = this.label;
      container.appendChild(label);
    }

    const select = document.createElement('select');
    select.id = this.id;
    select.name = this.name;
    select.className = `select ${this.className}`;

    this.options.forEach((opt) => {
      const option = document.createElement('option');
      option.value = opt.value;
      option.textContent = opt.label;
      if (opt.value === this.value) option.selected = true;
      select.appendChild(option);
    });

    if (this.disabled) select.disabled = true;
    if (this.required) select.required = true;
    
    select.addEventListener('change', (e) => this.onChange(e.target.value));
    
    container.appendChild(select);

    if (this.error) {
      const error = document.createElement('div');
      error.className = 'form-error';
      error.textContent = this.error;
      container.appendChild(error);
    }

    if (this.hint) {
      const hint = document.createElement('div');
      hint.className = 'form-hint';
      hint.textContent = this.hint;
      container.appendChild(hint);
    }

    return container;
  }
}
