/**
 * AstroBiz OS - Desktop Application Entry Point
 * Main application shell with navigation and routing
 */

import { Router } from './router/router.js';
import { Sidebar } from '../shared/shell/Sidebar.js';
import { Topbar } from '../shared/shell/Topbar.js';
import {
  dashboardPage,
  customersPage,
  kundalisPage,
  appointmentsPage,
  servicesPage,
  billingPage,
  crmPage,
  reportsPage,
  settingsPage,
} from './pages/pages.js';

class App {
  constructor() {
    this.currentPage = 'dashboard';
    this.router = new Router({
      defaultRoute: 'dashboard',
      rootSelector: '#workspace',
      onRouteChange: (route) => this.onRouteChanged(route),
    });
    this.init();
  }

  init() {
    this.setupRouter();
    this.setupShell();
    this.router.start();
  }

  setupRouter() {
    // Register all routes
    this.router
      .register('dashboard', () => dashboardPage())
      .register('customers', () => customersPage())
      .register('kundalis', () => kundalisPage())
      .register('appointments', () => appointmentsPage())
      .register('services', () => servicesPage())
      .register('billing', () => billingPage())
      .register('crm', () => crmPage())
      .register('reports', () => reportsPage())
      .register('settings', () => settingsPage());
  }

  setupShell() {
    // Sidebar with all navigation items
    const sidebarContainer = document.getElementById('sidebar');
    const sidebar = new Sidebar({
      items: [
        { icon: '📊', label: 'Dashboard', path: 'dashboard' },
        { icon: '👥', label: 'Customers', path: 'customers' },
        { icon: '✨', label: 'Kundalis', path: 'kundalis' },
        { icon: '📅', label: 'Appointments', path: 'appointments' },
        { icon: '🛎️', label: 'Services', path: 'services' },
        { icon: '💰', label: 'Billing', path: 'billing' },
        { icon: '📞', label: 'CRM', path: 'crm' },
        { icon: '📈', label: 'Reports', path: 'reports' },
        { icon: '⚙️', label: 'Settings', path: 'settings' },
      ],
      activeItem: 'dashboard',
      onNavigate: (path) => this.router.navigate(path),
    });
    sidebarContainer.appendChild(sidebar.render());

    // Topbar
    const topbarContainer = document.getElementById('topbar');
    const topbar = new Topbar({
      title: 'AstroBiz OS',
      showSearch: true,
      onSearch: (query) => console.log('Search:', query),
      actions: [
        { label: 'Help', onClick: () => console.log('Help clicked') },
        { label: 'Profile', onClick: () => console.log('Profile clicked') },
      ],
    });
    topbarContainer.appendChild(topbar.render());

    this.sidebar = sidebar;
  }

  onRouteChanged(route) {
    this.currentPage = route;
    // Update sidebar active state
    const navItems = document.querySelectorAll('.sidebar-item');
    navItems.forEach((item) => {
      const isActive = item.textContent.toLowerCase().includes(
        this.getPageLabel(route).toLowerCase()
      );
      if (isActive) {
        item.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        item.style.color = 'white';
        item.style.borderLeftColor = 'rgba(255, 255, 255, 0.5)';
      } else {
        item.style.backgroundColor = 'transparent';
        item.style.color = 'rgba(255, 255, 255, 0.7)';
        item.style.borderLeftColor = 'transparent';
      }
    });
  }

  getPageLabel(route) {
    const labels = {
      dashboard: 'Dashboard',
      customers: 'Customers',
      kundalis: 'Kundalis',
      appointments: 'Appointments',
      services: 'Services',
      billing: 'Billing',
      crm: 'CRM',
      reports: 'Reports',
      settings: 'Settings',
    };
    return labels[route] || 'Dashboard';
  }

}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new App();
  });
} else {
  new App();
}
