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
    window.appRouter = this.router;
    this.init();
  }

  init() {
    this.setupRouter();
    this.setupShell();
    this.router.start();
  }

  setupRouter() {
    const navigate = (path, state) => this.router.navigate(path, state);

    // Register all routes
    this.router
      .register('dashboard', (state) => dashboardPage({
        onNavigate: (path, routeState) => navigate(path, routeState),
      }))
      .register('customers', (state) => customersPage({
        onNavigate: (path, routeState) => navigate(path, routeState),
      }))
      .register('kundalis', (state) => kundalisPage({
        customerId: state?.customerId ?? state ?? null,
        kundaliId: state?.kundaliId ?? null,
        onNavigate: (path, routeState) => navigate(path, routeState),
      }))
      .register('appointments', (state) => appointmentsPage({
        customerId: state?.customerId ?? null,
        appointmentId: state?.appointmentId ?? null,
        onNavigate: (path, routeState) => navigate(path, routeState),
      }))
      .register('services', (state) => servicesPage({
        serviceId: state?.serviceId ?? null,
        onNavigate: (path, routeState) => navigate(path, routeState),
      }))
      .register('billing', (state) => billingPage({
        customerId: state?.customerId ?? null,
        invoiceId: state?.invoiceId ?? null,
        onNavigate: (path, routeState) => navigate(path, routeState),
      }))
      .register('crm', (state) => crmPage({
        customerId: state?.customerId ?? null,
        onNavigate: (path, routeState) => navigate(path, routeState),
      }))
      .register('reports', (state) => reportsPage())
      .register('settings', (state) => settingsPage());
  }

  setupShell() {
    // Sidebar with all navigation items
    const sidebarContainer = document.getElementById('sidebar');
    const sidebar = new Sidebar({
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
        { label: '+ New', onClick: () => console.log('New action clicked') },
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
