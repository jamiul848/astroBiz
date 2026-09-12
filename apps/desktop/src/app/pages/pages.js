import { Dashboard } from '../dashboard/Dashboard.js';
import { Customers } from '../customers/Customers.js';
import { Kundalis } from '../kundalis/Kundalis.js';
import { Appointments } from '../appointments/Appointments.js';
import { Services } from '../services/Services.js';
import { Billing } from '../billing/Billing.js';
import { CRM } from '../crm/CRM.js';
import { Reports } from '../reports/Reports.js';
import { Settings } from '../settings/Settings.js';

function defaultNavigation(path, state) {
  if (typeof window !== 'undefined' && window.appRouter) {
    return window.appRouter.navigate(path, state);
  }
  return false;
}

export function dashboardPage({ onNavigate = defaultNavigation } = {}) {
  return Dashboard({
    onNavigate: (path, state) => onNavigate(path, state),
  });
}

export function customersPage({ onNavigate = defaultNavigation } = {}) {
  return Customers({
    onNavigate: (path, state) => onNavigate(path, state),
  });
}

export function kundalisPage({ customerId = null, onNavigate = defaultNavigation } = {}) {
  return Kundalis({
    customerId,
    onNavigate: (path, state) => onNavigate(path, state),
  });
}

export function appointmentsPage() {
  return Appointments();
}

export function servicesPage() {
  return Services();
}

export function billingPage() {
  return Billing();
}

export function crmPage({ onNavigate = defaultNavigation } = {}) {
  return CRM({
    onNavigate: (path, state) => onNavigate(path, state),
  });
}

export function reportsPage() {
  const reports = new Reports();
  reports.init();
  return reports.root;
}

export function settingsPage() {
  const settings = new Settings();
  settings.init();
  return settings.root;
}
