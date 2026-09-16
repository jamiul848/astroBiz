/**
 * Sidebar Component
 * Main navigation sidebar with expandable groups
 */
export class Sidebar {
  constructor(options = {}) {
    this.items = options.items || [
      { icon: '📊', label: 'Dashboard', path: 'dashboard' },
      { 
        icon: '👥', label: 'Customers', path: 'customers', 
        children: [
          { label: 'All Customers', path: 'customers' },
          { label: 'Add Customer', path: 'customers/new' },
          { label: 'Follow-ups', path: 'crm' },
          { label: 'Customer History', path: 'reports/customers' },
        ]
      },
      { 
        icon: '📜', label: 'Kundalis', path: 'kundalis',
        children: [
          { label: 'All Kundalis', path: 'kundalis' },
          { label: 'Create Kundali', path: 'kundalis/new' },
          { label: 'Recent Kundalis', path: 'kundalis/recent' },
          { label: 'Consultation Reports', path: 'kundalis/reports' },
        ]
      },
      { 
        icon: '📅', label: 'Appointments', path: 'appointments',
        children: [
          { label: 'Calendar', path: 'appointments' },
          { label: 'Today\'s Appointments', path: 'appointments/today' },
          { label: 'Upcoming', path: 'appointments/upcoming' },
          { label: 'Completed', path: 'appointments/completed' },
          { label: 'Cancelled', path: 'appointments/cancelled' },
        ]
      },
      { 
        icon: '✨', label: 'Services', path: 'services',
        children: [
          { label: 'All Services', path: 'services' },
          { label: 'Add Service', path: 'services/new' },
          { label: 'Categories', path: 'services/categories' },
          { label: 'Pricing', path: 'services/pricing' },
        ]
      },
      { 
        icon: '💰', label: 'Billing', path: 'billing',
        children: [
          { label: 'New Invoice', path: 'billing' },
          { label: 'Invoice History', path: 'billing/history' },
          { label: 'Pending Payments', path: 'billing/pending' },
          { label: 'Payment History', path: 'billing/payments' },
          { label: 'Receipts', path: 'billing/receipts' },
        ]
      },
      { 
        icon: '📞', label: 'CRM', path: 'crm',
        children: [
          { label: 'Follow-ups', path: 'crm' },
          { label: 'Notes', path: 'crm/notes' },
          { label: 'Reminders', path: 'crm/reminders' },
          { label: 'Customer Activity', path: 'crm/activity' },
        ]
      },
      { 
        icon: '📈', label: 'Reports', path: 'reports',
        children: [
          { label: 'Revenue', path: 'reports/revenue' },
          { label: 'Customers', path: 'reports/customers' },
          { label: 'Appointments', path: 'reports/appointments' },
          { label: 'Services', path: 'reports/services' },
          { label: 'Payments', path: 'reports/payments' },
        ]
      },
      { 
        icon: '⚙️', label: 'Settings', path: 'settings',
        children: [
          { label: 'Business', path: 'settings/business' },
          { label: 'Astrology', path: 'settings/astrology' },
          { label: 'Billing & Invoice', path: 'settings/billing' },
          { label: 'Staff & Access', path: 'settings/staff' },
          { label: 'Notifications', path: 'settings/notifications' },
          { label: 'Data & Backup', path: 'settings/backup' },
        ]
      },
    ];
    this.activeItem = options.activeItem || 'dashboard';
    this.onNavigate = options.onNavigate || (() => { });
    
    // Store expanded state for groups
    this.expandedGroups = new Set();
    // Auto-expand the group containing the active item
    this.items.forEach(item => {
      if (item.children && (item.path === this.activeItem || item.children.some(c => c.path === this.activeItem))) {
        this.expandedGroups.add(item.label);
      }
    });
  }

  render() {
    const sidebar = document.createElement('aside');
    sidebar.className = 'sidebar';

    // Logo/Brand
    const brand = document.createElement('div');
    brand.style.padding = 'var(--space-6)';
    brand.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
    brand.innerHTML = '<h2 style="color: white; font-size: var(--font-size-xl); font-weight: bold; margin: 0;">AstroBiz OS</h2>';
    sidebar.appendChild(brand);

    // Navigation items
    const nav = document.createElement('nav');
    nav.style.flex = '1';
    nav.style.overflow = 'auto';
    nav.style.padding = 'var(--space-2) 0';

    this.items.forEach((item) => {
      const groupContainer = document.createElement('div');
      groupContainer.className = 'sidebar-group';

      const navItem = document.createElement('button');
      const isActive = item.path === this.activeItem || (item.children && item.children.some(c => c.path === this.activeItem));
      navItem.className = `sidebar-item ${isActive ? 'active' : ''}`;
      
      navItem.style.cssText = `
        width: 100%;
        display: flex;
        align-items: center;
        gap: var(--space-3);
        padding: var(--space-2) var(--space-6);
        border: none;
        background: ${isActive && !item.children ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
        color: ${isActive ? 'white' : 'rgba(255, 255, 255, 0.7)'};
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
        cursor: pointer;
        transition: all var(--transition-fast);
        border-left: 3px solid ${isActive && !item.children ? 'rgba(255, 255, 255, 0.5)' : 'transparent'};
      `;

      navItem.addEventListener('mouseenter', () => {
        if (!isActive || item.children) navItem.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
      });

      navItem.addEventListener('mouseleave', () => {
        if (!isActive || item.children) navItem.style.backgroundColor = 'transparent';
      });

      const icon = document.createElement('span');
      icon.textContent = item.icon || '•';
      icon.style.fontSize = 'var(--font-size-base)';

      const label = document.createElement('span');
      label.textContent = item.label;
      label.style.flex = '1';
      label.style.textAlign = 'left';

      navItem.appendChild(icon);
      navItem.appendChild(label);

      // Handle expandable children
      if (item.children && item.children.length > 0) {
        const chevron = document.createElement('span');
        const isExpanded = this.expandedGroups.has(item.label);
        chevron.innerHTML = isExpanded ? '▼' : '▶';
        chevron.style.fontSize = '8px';
        chevron.style.opacity = '0.5';
        navItem.appendChild(chevron);

        const childrenContainer = document.createElement('div');
        childrenContainer.className = 'sidebar-children';
        childrenContainer.style.display = isExpanded ? 'block' : 'none';
        childrenContainer.style.padding = 'var(--space-1) 0 var(--space-2) 0';

        item.children.forEach((child) => {
          const childBtn = document.createElement('button');
          const isChildActive = child.path === this.activeItem;
          childBtn.className = `sidebar-subitem ${isChildActive ? 'active' : ''}`;
          childBtn.style.cssText = `
            width: 100%;
            display: block;
            text-align: left;
            padding: var(--space-1) var(--space-6) var(--space-1) 48px;
            border: none;
            background: transparent;
            color: ${isChildActive ? 'white' : 'rgba(255, 255, 255, 0.5)'};
            font-size: var(--font-size-xs);
            cursor: pointer;
            transition: all var(--transition-fast);
          `;
          
          childBtn.addEventListener('mouseenter', () => {
            childBtn.style.color = 'white';
          });
          childBtn.addEventListener('mouseleave', () => {
            if (!isChildActive) childBtn.style.color = 'rgba(255, 255, 255, 0.5)';
          });
          
          childBtn.textContent = child.label;
          childBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.activeItem = child.path;
            this.onNavigate(child.path);
          });
          
          childrenContainer.appendChild(childBtn);
        });

        navItem.addEventListener('click', () => {
          const currentlyExpanded = this.expandedGroups.has(item.label);
          if (currentlyExpanded) {
            this.expandedGroups.delete(item.label);
            chevron.innerHTML = '▶';
            childrenContainer.style.display = 'none';
          } else {
            this.expandedGroups.add(item.label);
            chevron.innerHTML = '▼';
            childrenContainer.style.display = 'block';
          }
        });

        groupContainer.appendChild(navItem);
        groupContainer.appendChild(childrenContainer);
      } else {
        // Flat item
        navItem.addEventListener('click', () => {
          this.activeItem = item.path;
          this.onNavigate(item.path);
        });
        groupContainer.appendChild(navItem);
      }

      nav.appendChild(groupContainer);
    });

    sidebar.appendChild(nav);

    // Footer
    const footer = document.createElement('div');
    footer.style.cssText = `
      padding: var(--space-4) var(--space-6);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      gap: var(--space-3);
      align-items: center;
    `;

    const userIcon = document.createElement('div');
    userIcon.style.cssText = `
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: var(--font-size-xs);
      font-weight: bold;
      flex-shrink: 0;
    `;
    userIcon.textContent = 'A';

    const userInfo = document.createElement('div');
    userInfo.style.flex = '1';
    userInfo.style.minWidth = '0';
    userInfo.innerHTML = '<p style="margin: 0; color: white; font-size: var(--font-size-xs); font-weight: 500;">Astrologer</p>';

    footer.appendChild(userIcon);
    footer.appendChild(userInfo);
    sidebar.appendChild(footer);

    return sidebar;
  }
}
