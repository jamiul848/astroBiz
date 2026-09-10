/**
 * Sidebar Component
 * Main navigation sidebar
 */
export class Sidebar {
  constructor(options = {}) {
    this.items = options.items || []; // [{ icon: '📊', label: 'Dashboard', path: '/dashboard' }, ...]
    this.activeItem = options.activeItem || this.items[0]?.path || '';
    this.onNavigate = options.onNavigate || (() => { });
  }

  render() {
    const sidebar = document.createElement('aside');
    sidebar.className = 'sidebar';

    // Logo/Brand
    const brand = document.createElement('div');
    brand.style.padding = 'var(--space-6)';
    brand.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
    brand.innerHTML = '<h2 style="color: white; font-size: var(--font-size-xl); font-weight: bold; margin: 0;">AstroBiz</h2>';
    sidebar.appendChild(brand);

    // Navigation items
    const nav = document.createElement('nav');
    nav.style.flex = '1';
    nav.style.overflow = 'auto';

    this.items.forEach((item) => {
      const navItem = document.createElement('button');
      navItem.className = `sidebar-item ${item.path === this.activeItem ? 'active' : ''}`;
      navItem.style.cssText = `
        width: 100%;
        display: flex;
        align-items: center;
        gap: var(--space-3);
        padding: var(--space-4) var(--space-6);
        border: none;
        background: none;
        color: rgba(255, 255, 255, 0.7);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
        cursor: pointer;
        transition: all var(--transition-base);
        border-left: 3px solid transparent;
      `;

      navItem.addEventListener('mouseenter', () => {
        navItem.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
      });

      navItem.addEventListener('mouseleave', () => {
        if (item.path !== this.activeItem) {
          navItem.style.backgroundColor = 'transparent';
        }
      });

      if (item.path === this.activeItem) {
        navItem.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        navItem.style.color = 'white';
        navItem.style.borderLeftColor = 'rgba(255, 255, 255, 0.5)';
      }

      navItem.addEventListener('click', () => {
        this.activeItem = item.path;
        this.onNavigate(item.path);
        // Update UI
        const allItems = nav.querySelectorAll('.sidebar-item');
        allItems.forEach((el) => {
          el.style.backgroundColor = 'transparent';
          el.style.color = 'rgba(255, 255, 255, 0.7)';
          el.style.borderLeftColor = 'transparent';
        });
        navItem.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        navItem.style.color = 'white';
        navItem.style.borderLeftColor = 'rgba(255, 255, 255, 0.5)';
      });

      const icon = document.createElement('span');
      icon.textContent = item.icon || '•';
      icon.style.fontSize = 'var(--font-size-lg)';

      const label = document.createElement('span');
      label.textContent = item.label;

      navItem.appendChild(icon);
      navItem.appendChild(label);

      nav.appendChild(navItem);
    });

    sidebar.appendChild(nav);

    // Footer (optional logout)
    const footer = document.createElement('div');
    footer.style.cssText = `
      padding: var(--space-6);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      gap: var(--space-3);
      align-items: center;
    `;

    const userIcon = document.createElement('div');
    userIcon.style.cssText = `
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      flex-shrink: 0;
    `;
    userIcon.textContent = 'U';

    const userInfo = document.createElement('div');
    userInfo.style.flex = '1';
    userInfo.style.minWidth = '0';
    userInfo.innerHTML = '<p style="margin: 0; color: white; font-size: var(--font-size-sm); font-weight: 500;">Astrologer</p><p style="margin: 0; color: rgba(255, 255, 255, 0.6); font-size: var(--font-size-xs);">Profile</p>';

    footer.appendChild(userIcon);
    footer.appendChild(userInfo);
    sidebar.appendChild(footer);

    return sidebar;
  }
}
