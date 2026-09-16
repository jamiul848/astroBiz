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

export function kundalisPage({ customerId = null, kundaliId = null, onNavigate = defaultNavigation } = {}) {
  return Kundalis({
    customerId,
    kundaliId,
    onNavigate: (path, state) => onNavigate(path, state),
  });
}

export function appointmentsPage({ customerId = null, appointmentId = null, onNavigate = defaultNavigation } = {}) {
  return Appointments({ customerId, appointmentId, onNavigate: (path, state) => onNavigate(path, state) });
}

export function servicesPage({ serviceId = null, onNavigate = defaultNavigation } = {}) {
  return Services({ serviceId, onNavigate: (path, state) => onNavigate(path, state) });
}

export function billingPage({ customerId = null, invoiceId = null, onNavigate = defaultNavigation } = {}) {
  return Billing({ customerId, invoiceId, onNavigate });
}

export function crmPage({ customerId = null, onNavigate = defaultNavigation } = {}) {
  return CRM({
    customerId,
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
