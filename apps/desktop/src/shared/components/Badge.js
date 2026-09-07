/**
 * StatusBadge Component
 * Reusable badge for displaying status
 */
export class StatusBadge {
  constructor(options = {}) {
    this.label = options.label || 'Status';
    this.status = options.status || 'primary'; // primary, success, danger, warning, neutral
    this.icon = options.icon || '';
    this.className = options.className || '';
  }

  render() {
    const badge = document.createElement('span');
    badge.className = `badge badge-${this.status} ${this.className}`;

    if (this.icon) {
      const icon = document.createElement('span');
      icon.textContent = this.icon;
      badge.appendChild(icon);
    }

    const label = document.createElement('span');
    label.textContent = this.label;
    badge.appendChild(label);

    return badge;
  }
}

/**
 * Avatar Component
 * Reusable user avatar with initials or image
 */
export class Avatar {
  constructor(options = {}) {
    this.name = options.name || 'U';
    this.size = options.size || 'md'; // sm, md, lg
    this.color = options.color || 'primary';
    this.className = options.className || '';
  }

  getInitials() {
    return this.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  render() {
    const avatar = document.createElement('div');
    avatar.className = `avatar avatar-${this.size} ${this.className}`;
    avatar.style.backgroundColor = this.getBackgroundColor();
    avatar.style.color = 'white';
    avatar.textContent = this.getInitials();

    return avatar;
  }

  getBackgroundColor() {
    const colors = {
      primary: '#2c3e50',
      accent: '#3498db',
      success: '#27ae60',
      danger: '#e74c3c',
      warning: '#f39c12',
    };
    return colors[this.color] || colors.primary;
  }
}
