import { Dashboard } from '../dashboard/Dashboard.js';
import { Customers } from '../customers/Customers.js';
import { Kundalis } from '../kundalis/Kundalis.js';
import { Appointments } from '../appointments/Appointments.js';
import { Services } from '../services/Services.js';
import { Billing } from '../billing/Billing.js';
import { CRM } from '../crm/CRM.js';

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
  const page = document.createElement('div');
  page.className = 'page';

  const header = document.createElement('div');
  header.className = 'page-header';
  header.innerHTML = '<h1 style="margin: 0;">Reports</h1><p style="margin: var(--space-2) 0 0 0; color: var(--text-secondary);">Analyze business performance</p>';

  const content = document.createElement('div');
  content.className = 'page-content';
  content.innerHTML = `
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Reports Coming Soon</h3>
      </div>
      <div class="card-body">
        <p>The Reports module will include:</p>
        <ul>
          <li>Revenue reports and trends</li>
          <li>Customer count analytics</li>
          <li>Appointment statistics</li>
          <li>Consultation completion rates</li>
          <li>Pending payment reports</li>
          <li>Date range filtering</li>
          <li>Export to PDF/CSV functionality</li>
          <li>Visual charts and graphs</li>
        </ul>
        <p style="margin-top: var(--space-6); color: var(--text-secondary); font-size: var(--font-size-sm);">
          Reports will initially use mock data. Integration with backend APIs will happen in later phases.
        </p>
      </div>
    </div>
  `;

  page.appendChild(header);
  page.appendChild(content);
  return page;
}

export function settingsPage() {
  const page = document.createElement('div');
  page.className = 'page';

  const header = document.createElement('div');
  header.className = 'page-header';
  header.innerHTML = '<h1 style="margin: 0;">Settings</h1><p style="margin: var(--space-2) 0 0 0; color: var(--text-secondary);">Configure your AstroBiz account</p>';

  const content = document.createElement('div');
  content.className = 'page-content';
  content.innerHTML = `
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Settings Coming Soon</h3>
      </div>
      <div class="card-body">
        <p>The Settings module will provide:</p>
        <ul>
          <li>Astrologer profile information</li>
          <li>Business information and branding</li>
          <li>Service configuration</li>
          <li>Notification preferences</li>
          <li>Appearance/theme settings</li>
          <li>Security settings</li>
          <li>Account management</li>
          <li>Logout functionality</li>
        </ul>
        <p style="margin-top: var(--space-6); color: var(--text-secondary); font-size: var(--font-size-sm);">
          This module will be implemented in the next phase.
        </p>
      </div>
    </div>
  `;

  page.appendChild(header);
  page.appendChild(content);
  return page;
}
