/**
 * Button Component
 * Reusable button with support for variants and states
 */
export class Button {
  constructor(options = {}) {
    this.label = options.label || 'Button';
    this.variant = options.variant || 'primary'; // primary, secondary, accent, danger, success
    this.size = options.size || 'md'; // sm, md, lg
    this.disabled = options.disabled || false;
    this.onClick = options.onClick || (() => {});
    this.type = options.type || 'button';
    this.className = options.className || '';
  }

  render() {
    const element = document.createElement('button');
    element.type = this.type;
    element.className = `btn btn-${this.variant} btn-${this.size} ${this.className}`;
    element.textContent = this.label;
    
    if (this.disabled) {
      element.disabled = true;
    }
    
    element.addEventListener('click', this.onClick);
    
    return element;
  }
}
