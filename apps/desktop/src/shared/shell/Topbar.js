/**
 * Topbar Component
 * Top navigation bar
 */
export class Topbar {
  constructor(options = {}) {
    this.title = options.title || 'AstroBiz OS';
    this.actions = options.actions || []; // [{ label: 'Action', onClick: () => {} }, ...]
    this.showSearch = options.showSearch !== false;
    this.onSearch = options.onSearch || (() => {});
  }

  render() {
    const topbar = document.createElement('header');
    topbar.className = 'topbar';

    // Left side - Title
    const left = document.createElement('div');
    left.style.display = 'flex';
    left.style.alignItems = 'center';
    left.style.gap = 'var(--space-4)';

    const title = document.createElement('h1');
    title.style.cssText = `
      margin: 0;
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-semibold);
      color: var(--text-primary);
    `;
    title.textContent = this.title;

    left.appendChild(title);
    topbar.appendChild(left);

    // Right side - Search, Actions
    const right = document.createElement('div');
    right.style.display = 'flex';
    right.style.alignItems = 'center';
    right.style.gap = 'var(--space-4)';

    if (this.showSearch) {
      const searchContainer = document.createElement('div');
      searchContainer.style.cssText = `
        display: flex;
        align-items: center;
        background-color: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-md);
        padding: 0 var(--space-3);
        width: 250px;
      `;

      const searchIcon = document.createElement('span');
      searchIcon.textContent = '🔍';
      searchIcon.style.marginRight = 'var(--space-2)';

      const searchInput = document.createElement('input');
      searchInput.type = 'text';
      searchInput.placeholder = 'Search...';
      searchInput.style.cssText = `
        border: none;
        background: none;
        outline: none;
        flex: 1;
        padding: var(--space-2) 0;
        font-size: var(--font-size-sm);
      `;

      searchInput.addEventListener('input', (e) => this.onSearch(e.target.value));

      searchContainer.appendChild(searchIcon);
      searchContainer.appendChild(searchInput);
      right.appendChild(searchContainer);
    }

    // Action buttons
    this.actions.forEach((action) => {
      const button = document.createElement('button');
      button.style.cssText = `
        padding: var(--space-2) var(--space-4);
        background-color: transparent;
        border: 1px solid var(--border-color);
        border-radius: var(--radius-md);
        cursor: pointer;
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
        color: var(--text-primary);
        transition: all var(--transition-base);
      `;

      button.textContent = action.label;
      button.addEventListener('click', action.onClick);
      button.addEventListener('mouseenter', () => {
        button.style.backgroundColor = 'var(--bg-secondary)';
      });
      button.addEventListener('mouseleave', () => {
        button.style.backgroundColor = 'transparent';
      });

      right.appendChild(button);
    });

    topbar.appendChild(right);

    return topbar;
  }
}
