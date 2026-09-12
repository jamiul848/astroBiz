import { ReportsController } from './ReportsController.js';
import { MockReportsRepository } from './repositories/MockReportsRepository.js';
import { ReportFilters } from './components/ReportFilters.js';
import { ReportsDashboard } from './components/ReportsDashboard.js';
import { RevenueReport } from './components/RevenueReport.js';
import { CustomerReport } from './components/CustomerReport.js';
import { AppointmentReport } from './components/AppointmentReport.js';
import { ServicePerformanceReport } from './components/ServicePerformanceReport.js';

export class Reports {
  constructor() {
    this.repository = new MockReportsRepository();
    this.controller = new ReportsController(this.repository);
    this.root = document.createElement('div');
    this.root.className = 'reports-page';
    this.handleState = this.handleState.bind(this);
    this.controller.subscribe(this.handleState);
  }

  async init() {
    await this.controller.load();
    return this.root;
  }

  handleState(state) {
    const { loading, error, report } = state;
    this.root.innerHTML = '';

    const page = document.createElement('div');
    page.className = 'page-shell reports-shell';

    const heading = document.createElement('div');
    heading.className = 'page-heading';
    heading.innerHTML = '<div><p class="eyebrow">Analytics</p><h1>Reports Management</h1></div>';

    const filters = ReportFilters({
      period: state.period,
      startDate: state.startDate,
      endDate: state.endDate,
      onPresetChange: (value) => this.controller.setPeriod(value),
      onCustomRangeChange: (startDate, endDate) => this.controller.applyCustomRange(startDate, endDate),
    });

    const content = document.createElement('div');
    content.className = 'reports-content';

    if (loading) {
      const loadingState = document.createElement('div');
      loadingState.className = 'loading-state';
      loadingState.textContent = 'Loading analytics…';
      content.appendChild(loadingState);
      page.append(heading, filters, content);
      this.root.appendChild(page);
      return;
    }

    if (error) {
      const errorCard = document.createElement('div');
      errorCard.className = 'status-card error';
      errorCard.textContent = error;
      content.appendChild(errorCard);
      page.append(heading, filters, content);
      this.root.appendChild(page);
      return;
    }

    if (!report) {
      const empty = document.createElement('div');
      empty.className = 'status-card';
      empty.textContent = 'No report data available.';
      page.append(heading, filters, empty);
      this.root.appendChild(page);
      return;
    }

    const dashboard = ReportsDashboard({
      summary: report.summary,
      onExport: () => console.log('Exporting report'),
      onDownloadPdf: () => console.log('Downloading report PDF'),
    });

    const sections = document.createElement('div');
    sections.className = 'reports-sections';

    sections.append(
      RevenueReport({ revenue: report.revenue }),
      CustomerReport({ customers: report.customers }),
      AppointmentReport({ appointments: report.appointments }),
      ServicePerformanceReport({ services: report.services }),
    );

    page.append(heading, filters, dashboard, content, sections);
    this.root.appendChild(page);
  }
}

export default Reports;
