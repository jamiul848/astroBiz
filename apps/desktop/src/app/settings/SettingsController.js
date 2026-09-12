export class SettingsController {
  constructor(repository) {
    this.repository = repository;
    this.state = {
      settings: null,
      loading: false,
      error: null,
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
      const settings = await this.repository.getSettings();
      this.setState({ settings, loading: false });
      return settings;
    } catch (error) {
      this.setState({ loading: false, error: error.message });
      return null;
    }
  }

  async updateSection(sectionKey, values) {
    if (!this.state.settings) return null;
    try {
      const updated = await this.repository.updateSection(sectionKey, values);
      this.setState({
        settings: {
          ...this.state.settings,
          [sectionKey]: { ...this.state.settings[sectionKey], ...updated },
        },
      });
      return updated;
    } catch (error) {
      this.setState({ error: error.message });
      return null;
    }
  }

  async exportData() {
    return this.repository.exportData();
  }

  async importData() {
    return this.repository.importData();
  }

  async clearMockData() {
    return this.repository.clearMockData();
  }
}
