/**
 * LoadingState Component
 * Display loading spinner
 */
export class LoadingState {
  constructor(options = {}) {
    this.message = options.message || 'Loading...';
    this.className = options.className || '';
  }

  render() {
    const container = document.createElement('div');
    container.className = `loading-state ${this.className}`;

    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';

    const message = document.createElement('p');
    message.textContent = this.message;

    container.appendChild(spinner);
    container.appendChild(message);

    return container;
  }
}

/**
 * EmptyState Component
 * Display empty state message
 */
export class EmptyState {
  constructor(options = {}) {
    this.icon = options.icon || '📭';
    this.title = options.title || 'No data';
    this.message = options.message || 'There is nothing to display here.';
    this.action = options.action || null;
    this.className = options.className || '';
  }

  render() {
    const container = document.createElement('div');
    container.className = `empty-state ${this.className}`;

    const icon = document.createElement('div');
    icon.className = 'empty-state-icon';
    icon.textContent = this.icon;
    container.appendChild(icon);

    const title = document.createElement('h3');
    title.className = 'empty-state-title';
    title.textContent = this.title;
    container.appendChild(title);

    const message = document.createElement('p');
    message.textContent = this.message;
    container.appendChild(message);

    if (this.action) {
      const action = document.createElement('div');
      action.style.marginTop = 'var(--space-6)';
      action.appendChild(this.action.render());
      container.appendChild(action);
    }

    return container;
  }
}

/**
 * ErrorState Component
 * Display error message
 */
export class ErrorState {
  constructor(options = {}) {
    this.icon = options.icon || '⚠️';
    this.title = options.title || 'Error';
    this.message = options.message || 'Something went wrong.';
    this.retry = options.retry || null;
    this.className = options.className || '';
  }

  render() {
    const container = document.createElement('div');
    container.className = `error-state ${this.className}`;

    const icon = document.createElement('div');
    icon.className = 'error-state-icon';
    icon.textContent = this.icon;
    container.appendChild(icon);

    const title = document.createElement('h3');
    title.className = 'error-state-title';
    title.textContent = this.title;
    container.appendChild(title);

    const message = document.createElement('p');
    message.textContent = this.message;
    container.appendChild(message);

    if (this.retry) {
      const retryBtn = document.createElement('div');
      retryBtn.style.marginTop = 'var(--space-6)';
      retryBtn.appendChild(this.retry.render());
      container.appendChild(retryBtn);
    }

    return container;
  }
}

/**
 * Toast Component
 * Display toast notification
 */
export class Toast {
  constructor(options = {}) {
    this.message = options.message || 'Notification';
    this.type = options.type || 'info'; // success, error, warning, info
    this.duration = options.duration || 4000;
    this.icon = options.icon || this.getIcon();
  }

  getIcon() {
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ',
    };
    return icons[this.type] || icons.info;
  }

  show() {
    const toast = document.createElement('div');
    toast.className = `toast ${this.type}`;

    const icon = document.createElement('span');
    icon.textContent = this.icon;
    icon.style.fontWeight = 'bold';

    const message = document.createElement('span');
    message.textContent = this.message;

    toast.appendChild(icon);
    toast.appendChild(message);

    document.body.appendChild(toast);

    if (this.duration > 0) {
      setTimeout(() => {
        toast.remove();
      }, this.duration);
    }

    return toast;
  }

  static success(message, duration = 4000) {
    return new Toast({ message, type: 'success', duration }).show();
  }

  static error(message, duration = 4000) {
    return new Toast({ message, type: 'error', duration }).show();
  }

  static warning(message, duration = 4000) {
    return new Toast({ message, type: 'warning', duration }).show();
  }

  static info(message, duration = 4000) {
    return new Toast({ message, type: 'info', duration }).show();
  }
}
