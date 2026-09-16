import { DashboardStats } from './components/DashboardStats.js';
import { FollowUps } from './components/FollowUps.js';
import { QuickActions } from './components/QuickActions.js';
import { RecentCustomers } from './components/RecentCustomers.js';
import { UpcomingAppointments } from './components/UpcomingAppointments.js';
import { BusinessSummary } from './components/BusinessSummary.js';
import { PendingPayments } from './components/PendingPayments.js';
import { LoadingState } from '../../shared/components/States.js';
import { AstroBizMockRepository } from '../shared/repositories/AstroBizMockRepository.js';

async function renderDashboardContent(content, onNavigate) {
  content.replaceChildren(new LoadingState({
    message: 'Preparing your daily overview...',
    className: 'dashboard-loading',
  }).render());

  const repo = new AstroBizMockRepository();

  try {
    const statsNode = await DashboardStats(repo);
    const appointmentsNode = await UpcomingAppointments(repo);
    const followUpsNode = await FollowUps(repo);
    const customersNode = await RecentCustomers(repo);
    const summaryNode = await BusinessSummary(repo);
    const pendingNode = await PendingPayments(repo);

    content.replaceChildren(QuickActions({ onNavigate }));
    content.appendChild(statsNode);

    const splitGrid = document.createElement('div');
    splitGrid.className = 'dashboard-split-grid';
    
    const leftCol = document.createElement('div');
    leftCol.className = 'dashboard-col dashboard-col-left';
    leftCol.appendChild(summaryNode);
    leftCol.appendChild(pendingNode);
    leftCol.appendChild(followUpsNode);

    const rightCol = document.createElement('div');
    rightCol.className = 'dashboard-col dashboard-col-right';
    rightCol.appendChild(appointmentsNode);
    rightCol.appendChild(customersNode);

    splitGrid.appendChild(leftCol);
    splitGrid.appendChild(rightCol);
    
    content.appendChild(splitGrid);
  } catch (err) {
    const errorState = document.createElement('div');
    errorState.className = 'dashboard-error';
    errorState.textContent = 'Failed to load dashboard data.';
    content.replaceChildren(errorState);
  }
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
