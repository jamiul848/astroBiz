import { DashboardStats } from './components/DashboardStats.js';
import { FollowUps } from './components/FollowUps.js';
import { QuickActions } from './components/QuickActions.js';
import { RecentCustomers } from './components/RecentCustomers.js';
import { UpcomingAppointments } from './components/UpcomingAppointments.js';
import { LoadingState } from '../../shared/components/States.js';

function renderDashboardContent(content, onNavigate) {
  content.replaceChildren(new LoadingState({
    message: 'Preparing your daily overview...',
    className: 'dashboard-loading',
  }).render());

  window.setTimeout(() => {
    content.replaceChildren(DashboardStats());

    const mainGrid = document.createElement('div');
    mainGrid.className = 'dashboard-main-grid';
    mainGrid.appendChild(UpcomingAppointments());
    mainGrid.appendChild(FollowUps());
    content.appendChild(mainGrid);

    const lowerGrid = document.createElement('div');
    lowerGrid.className = 'dashboard-lower-grid';
    lowerGrid.appendChild(RecentCustomers());
    lowerGrid.appendChild(QuickActions({ onNavigate }));
    content.appendChild(lowerGrid);
  }, 300);
}

export function Dashboard({ onNavigate }) {
  const page = document.createElement('div');
  page.className = 'page dashboard-page';

  const header = document.createElement('header');
  header.className = 'page-header dashboard-header';
  header.innerHTML = `
    <div>
      <p class="dashboard-eyebrow">Sunday, 14 June 2024</p>
      <h1>Good morning, Astrologer</h1>
      <p class="dashboard-subtitle">Here is what is happening across your practice today.</p>
    </div>
    <div class="dashboard-header-meta">
      <span class="dashboard-live-dot"></span>
      <span>All systems operational</span>
    </div>
  `;

  const content = document.createElement('div');
  content.className = 'page-content dashboard-content';
  renderDashboardContent(content, onNavigate);

  page.appendChild(header);
  page.appendChild(content);
  return page;
}
