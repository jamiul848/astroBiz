export class ReportsController {
  constructor(repository) {
    this.repository = repository;
    this.state = {
      period: 'thisMonth',
      startDate: '2024-06-01',
      endDate: '2024-06-30',
      loading: false,
      error: null,
      report: null,
    };
    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((listener) => listener(this.state));
  }

  setState(changes) {
    this.state = { ...this.state, ...changes };
    this.notify();
  }

  async load() {
    this.setState({ loading: true, error: null });
    try {
      const report = await this.repository.getOverview(this.state.period, {
        startDate: this.state.startDate,
        endDate: this.state.endDate,
      });
      this.setState({ report, loading: false });
      return report;
    } catch (error) {
      this.setState({ loading: false, error: error.message });
      return null;
    }
  }

  setPeriod(period) {
    const presets = {
      today: { startDate: '2024-06-14', endDate: '2024-06-14' },
      thisWeek: { startDate: '2024-06-10', endDate: '2024-06-16' },
      thisMonth: { startDate: '2024-06-01', endDate: '2024-06-30' },
      lastMonth: { startDate: '2024-05-01', endDate: '2024-05-31' },
      custom: { startDate: this.state.startDate, endDate: this.state.endDate },
    };

    const nextRange = presets[period] || presets.thisMonth;
    this.setState({
      period,
      startDate: nextRange.startDate,
      endDate: nextRange.endDate,
    });
    this.load();
  }

  applyCustomRange(startDate, endDate) {
    this.setState({ period: 'custom', startDate, endDate });
    this.load();
  }
}
