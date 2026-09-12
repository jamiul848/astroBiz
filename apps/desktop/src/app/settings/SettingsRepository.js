export class SettingsRepository {
  async getSettings() {
    throw new Error('SettingsRepository.getSettings must be implemented by a concrete repository.');
  }

  async updateSection(sectionKey, values) {
    throw new Error('SettingsRepository.updateSection must be implemented by a concrete repository.');
  }

  async exportData() {
    throw new Error('SettingsRepository.exportData must be implemented by a concrete repository.');
  }

  async importData() {
    throw new Error('SettingsRepository.importData must be implemented by a concrete repository.');
  }

  async clearMockData() {
    throw new Error('SettingsRepository.clearMockData must be implemented by a concrete repository.');
  }
}
