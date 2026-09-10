/**
 * Dashboard Page (Placeholder)
 */
export function dashboardPage() {
  const page = document.createElement('div');
  page.className = 'page';

  const header = document.createElement('div');
  header.className = 'page-header';
  header.innerHTML = '<h1 style="margin: 0;">Dashboard</h1><p style="margin: var(--space-2) 0 0 0; color: var(--text-secondary);">Overview of your astrology business</p>';

  const content = document.createElement('div');
  content.className = 'page-content';
  content.innerHTML = `
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Dashboard Coming Soon</h3>
      </div>
      <div class="card-body">
        <p>The dashboard will display:</p>
        <ul>
          <li>Today's revenue</li>
          <li>Total customers</li>
          <li>Today's appointments</li>
          <li>Pending payments</li>
          <li>Upcoming appointments</li>
          <li>Recent customers</li>
          <li>Follow-ups due</li>
          <li>Quick actions (Add Customer, Generate Kundali, New Appointment, Create Invoice)</li>
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

/**
 * Customers Page (Placeholder)
 */
export function customersPage() {
  const page = document.createElement('div');
  page.className = 'page';

  const header = document.createElement('div');
  header.className = 'page-header';
  header.innerHTML = '<h1 style="margin: 0;">Customers</h1><p style="margin: var(--space-2) 0 0 0; color: var(--text-secondary);">Manage your customer database</p>';

  const content = document.createElement('div');
  content.className = 'page-content';
  content.innerHTML = `
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Customer Management Coming Soon</h3>
      </div>
      <div class="card-body">
        <p>The Customers module will allow you to:</p>
        <ul>
          <li>View all customers with their details</li>
          <li>Search and filter customers by status</li>
          <li>Add new customers</li>
          <li>Edit customer information</li>
          <li>View customer profiles with birth details, appointments, and invoices</li>
          <li>Track customer status (New, Active, Follow-up, Inactive, VIP)</li>
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

/**
 * Kundalis Page (Placeholder)
 */
export function kundalisPage() {
  const page = document.createElement('div');
  page.className = 'page';

  const header = document.createElement('div');
  header.className = 'page-header';
  header.innerHTML = '<h1 style="margin: 0;">Kundalis</h1><p style="margin: var(--space-2) 0 0 0; color: var(--text-secondary);">Generate and manage Kundali charts</p>';

  const content = document.createElement('div');
  content.className = 'page-content';
  content.innerHTML = `
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Kundali Management Coming Soon</h3>
      </div>
      <div class="card-body">
        <p>The Kundali module will display:</p>
        <ul>
          <li>Customer information and birth details</li>
          <li>Kundali birth charts</li>
          <li>Planetary positions</li>
          <li>Dasha information</li>
          <li>Nakshatra data</li>
          <li>Dosha information</li>
          <li>Saved reports</li>
          <li>PDF download functionality</li>
        </ul>
        <p style="margin-top: var(--space-6); color: var(--text-secondary); font-size: var(--font-size-sm);">
          This module will use mock astrology data for the prototype. Astronomical calculations will be handled by the backend API.
        </p>
      </div>
    </div>
  `;

  page.appendChild(header);
  page.appendChild(content);
  return page;
}

/**
 * Appointments Page (Placeholder)
 */
export function appointmentsPage() {
  return Appointments();
}

/**
 * Services Page (Placeholder)
 */
export function servicesPage() {
  return Services();
}

/**
 * Billing Page (Placeholder)
 */
export function billingPage() {
  return Billing();
}

/**
 * CRM Page (Placeholder)
 */
export function crmPage() {
  const page = document.createElement('div');
  page.className = 'page';

  const header = document.createElement('div');
  header.className = 'page-header';
  header.innerHTML = '<h1 style="margin: 0;">CRM & Follow-ups</h1><p style="margin: var(--space-2) 0 0 0; color: var(--text-secondary);">Track customer interactions and follow-ups</p>';

  const content = document.createElement('div');
  content.className = 'page-content';
  content.innerHTML = `
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">CRM Management Coming Soon</h3>
      </div>
      <div class="card-body">
        <p>The CRM module will provide:</p>
        <ul>
          <li>Customer notes and timeline</li>
          <li>Follow-up date scheduling</li>
          <li>Customer status tracking</li>
          <li>Recent interaction history</li>
          <li>Follow-up statuses (Today, Upcoming, Completed, Overdue)</li>
          <li>Timeline view of customer interactions</li>
          <li>Notification reminders for follow-ups</li>
          <li>Bulk follow-up management</li>
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

/**
 * Reports Page (Placeholder)
 */
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

/**
 * Settings Page (Placeholder)
 */
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
