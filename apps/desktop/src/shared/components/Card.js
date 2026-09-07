/**
 * Card Component
 * Reusable card container with optional header and footer
 */
export class Card {
  constructor(options = {}) {
    this.title = options.title || '';
    this.content = options.content || '';
    this.footer = options.footer || '';
    this.className = options.className || '';
  }

  render() {
    const card = document.createElement('div');
    card.className = `card ${this.className}`;

    if (this.title) {
      const header = document.createElement('div');
      header.className = 'card-header';
      
      const titleEl = document.createElement('h3');
      titleEl.className = 'card-title';
      titleEl.textContent = this.title;
      
      header.appendChild(titleEl);
      card.appendChild(header);
    }

    if (this.content) {
      const body = document.createElement('div');
      body.className = 'card-body';
      
      if (typeof this.content === 'string') {
        body.innerHTML = this.content;
      } else {
        body.appendChild(this.content);
      }
      
      card.appendChild(body);
    }

    if (this.footer) {
      const footerEl = document.createElement('div');
      footerEl.className = 'card-footer';
      
      if (typeof this.footer === 'string') {
        footerEl.innerHTML = this.footer;
      } else {
        footerEl.appendChild(this.footer);
      }
      
      card.appendChild(footerEl);
    }

    return card;
  }
}

/**
 * StatCard Component
 * Card for displaying statistics with value and change indicator
 */
export class StatCard {
  constructor(options = {}) {
    this.label = options.label || 'Label';
    this.value = options.value || '0';
    this.change = options.change || null; // { value: 12, direction: 'up' }
    this.className = options.className || '';
  }

  render() {
    const card = document.createElement('div');
    card.className = `stat-card ${this.className}`;

    const label = document.createElement('div');
    label.className = 'stat-label';
    label.textContent = this.label;
    card.appendChild(label);

    const value = document.createElement('div');
    value.className = 'stat-value';
    value.textContent = this.value;
    card.appendChild(value);

    if (this.change) {
      const changeEl = document.createElement('div');
      changeEl.className = `stat-change ${this.change.direction === 'up' ? 'positive' : 'negative'}`;
      
      const direction = this.change.direction === 'up' ? '↑' : '↓';
      changeEl.textContent = `${direction} ${Math.abs(this.change.value)}% from last period`;
      
      card.appendChild(changeEl);
    }

    return card;
  }
}
