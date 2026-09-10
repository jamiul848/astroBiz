/**
 * Modal Component
 * Reusable modal dialog
 */
export class Modal {
  constructor(options = {}) {
    this.title = options.title || 'Modal';
    this.content = options.content || '';
    this.onClose = options.onClose || (() => { });
    this.size = options.size || 'md'; // sm, md, lg
    this.className = options.className || '';
    this.footer = options.footer || null;
  }

  render() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    const content = document.createElement('div');
    content.className = `modal-content ${this.className}`;

    // Header
    const header = document.createElement('div');
    header.className = 'modal-header';

    const title = document.createElement('h2');
    title.className = 'modal-title';
    title.textContent = this.title;
    header.appendChild(title);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close';
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', () => this.close());
    header.appendChild(closeBtn);

    content.appendChild(header);

    // Body
    const body = document.createElement('div');
    body.className = 'modal-body';

    if (typeof this.content === 'string') {
      body.innerHTML = this.content;
    } else if (this.content instanceof HTMLElement) {
      body.appendChild(this.content);
    }

    content.appendChild(body);

    // Footer
    if (this.footer) {
      const footerEl = document.createElement('div');
      footerEl.className = 'modal-footer';

      if (typeof this.footer === 'string') {
        footerEl.innerHTML = this.footer;
      } else if (this.footer instanceof HTMLElement) {
        footerEl.appendChild(this.footer);
      }

      content.appendChild(footerEl);
    }

    overlay.appendChild(content);

    // Close on overlay click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.close();
    });

    this.element = overlay;
    return overlay;
  }

  show() {
    if (this.element) {
      this.element.classList.remove('hidden');
      document.body.appendChild(this.element);
    }
  }

  close() {
    if (this.element) {
      this.element.remove();
      this.onClose();
    }
  }
}

/**
 * Confirmation Dialog Component
 * Modal specialized for confirmations
 */
export class ConfirmDialog {
  constructor(options = {}) {
    this.title = options.title || 'Confirm';
    this.message = options.message || 'Are you sure?';
    this.confirmLabel = options.confirmLabel || 'Confirm';
    this.cancelLabel = options.cancelLabel || 'Cancel';
    this.onConfirm = options.onConfirm || (() => { });
    this.onCancel = options.onCancel || (() => { });
  }

  show() {
    const { Button } = require('./Button');

    const content = document.createElement('div');
    content.innerHTML = `<p>${this.message}</p>`;

    const footer = document.createElement('div');
    footer.className = 'flex gap-4';

    const cancelBtn = new Button({
      label: this.cancelLabel,
      variant: 'secondary',
      onClick: () => {
        this.modal.close();
        this.onCancel();
      },
    });
    footer.appendChild(cancelBtn.render());

    const confirmBtn = new Button({
      label: this.confirmLabel,
      variant: 'danger',
      onClick: () => {
        this.modal.close();
        this.onConfirm();
      },
    });
    footer.appendChild(confirmBtn.render());

    this.modal = new Modal({
      title: this.title,
      content,
      footer,
    });

    this.modal.show();
  }
}
