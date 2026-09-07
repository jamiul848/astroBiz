/**
 * Input Component
 * Reusable text input with validation and states
 */
export class Input {
  constructor(options = {}) {
    this.id = options.id || '';
    this.name = options.name || '';
    this.type = options.type || 'text'; // text, email, password, number, date, time
    this.placeholder = options.placeholder || '';
    this.value = options.value || '';
    this.disabled = options.disabled || false;
    this.required = options.required || false;
    this.size = options.size || 'md'; // sm, md, lg
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

    const input = document.createElement('input');
    input.id = this.id;
    input.name = this.name;
    input.type = this.type;
    input.placeholder = this.placeholder;
    input.value = this.value;
    input.className = `input input-${this.size} ${this.className}`;
    
    if (this.disabled) input.disabled = true;
    if (this.required) input.required = true;
    
    input.addEventListener('change', (e) => this.onChange(e.target.value));
    
    container.appendChild(input);

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
