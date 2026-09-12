import { Button } from '../../shared/components/Button.js';
import { Toast } from '../../shared/components/States.js';
import { SettingsController } from './SettingsController.js';
import { MockSettingsRepository } from './repositories/MockSettingsRepository.js';
import { ProfileSettings } from './components/ProfileSettings.js';
import { PracticeSettings } from './components/PracticeSettings.js';
import { AstrologySettings } from './components/AstrologySettings.js';
import { AppointmentSettings } from './components/AppointmentSettings.js';
import { BillingSettings } from './components/BillingSettings.js';
import { NotificationSettings } from './components/NotificationSettings.js';
import { AppearanceSettings } from './components/AppearanceSettings.js';
import { DataSettings } from './components/DataSettings.js';

const sectionLabels = {
  profile: 'Profile',
  business: 'Practice information',
  astrology: 'Astrology preferences',
  appointments: 'Appointment settings',
  billing: 'Billing settings',
  notifications: 'Notification preferences',
  appearance: 'Appearance',
  app: 'Application settings',
};

export class Settings {
  constructor() {
    this.repository = new MockSettingsRepository();
    this.controller = new SettingsController(this.repository);
    this.root = document.createElement('div');
    this.root.className = 'page settings-page';
    this.draftSettings = null;
    this.handleState = this.handleState.bind(this);
    this.controller.subscribe(this.handleState);
  }

  async init() {
    await this.controller.load();
    return this.root;
  }

  updateDraftSection(sectionKey, values) {
    if (!this.draftSettings || !this.draftSettings[sectionKey]) return;
    this.draftSettings[sectionKey] = { ...this.draftSettings[sectionKey], ...values };
  }

  async saveSection(sectionKey, values) {
    const updated = await this.controller.updateSection(sectionKey, values);
    if (updated) {
      Toast.success(`${sectionLabels[sectionKey]} saved successfully.`);
    }
    return updated;
  }

  resetSection(sectionKey, fallback) {
    this.draftSettings[sectionKey] = structuredClone(fallback);
    this.handleState(this.controller.state);
  }

  handleState(state) {
    if (!state.settings) {
      this.draftSettings = null;
      this.root.innerHTML = '';
      const loading = document.createElement('div');
      loading.className = 'loading-state';
      loading.textContent = 'Loading settings...';
      this.root.appendChild(loading);
      return;
    }

    this.draftSettings = structuredClone(state.settings);

    const page = document.createElement('div');
    page.className = 'settings-shell';

    const header = document.createElement('header');
    header.className = 'page-header settings-header';
    header.innerHTML = `
      <div>
        <p class="settings-eyebrow">Practice settings</p>
        <h1>Settings Management</h1>
        <p class="settings-subtitle">Configure your astrologer profile, practice configuration, and business preferences.</p>
      </div>
    `;
    page.appendChild(header);

    const content = document.createElement('div');
    content.className = 'page-content settings-content';

    const sections = [
      ProfileSettings({
        values: this.draftSettings.profile,
        onChange: (value) => this.updateDraftSection('profile', value),
        onSave: async () => this.saveSection('profile', this.draftSettings.profile),
        onCancel: () => this.resetSection('profile', state.settings.profile),
        onEdit: () => Toast.info('Profile editing is enabled. Save your changes when ready.'),
      }),
      PracticeSettings({
        values: this.draftSettings.business,
        onChange: (value) => this.updateDraftSection('business', value),
        onSave: async () => this.saveSection('business', this.draftSettings.business),
        onCancel: () => this.resetSection('business', state.settings.business),
      }),
      AstrologySettings({
        values: this.draftSettings.astrology,
        onChange: (value) => this.updateDraftSection('astrology', value),
        onSave: async () => this.saveSection('astrology', this.draftSettings.astrology),
        onCancel: () => this.resetSection('astrology', state.settings.astrology),
      }),
      AppointmentSettings({
        values: this.draftSettings.appointments,
        onChange: (value) => this.updateDraftSection('appointments', value),
        onSave: async () => this.saveSection('appointments', this.draftSettings.appointments),
        onCancel: () => this.resetSection('appointments', state.settings.appointments),
      }),
      BillingSettings({
        values: this.draftSettings.billing,
        onChange: (value) => this.updateDraftSection('billing', value),
        onSave: async () => this.saveSection('billing', this.draftSettings.billing),
        onCancel: () => this.resetSection('billing', state.settings.billing),
      }),
      NotificationSettings({
        values: this.draftSettings.notifications,
        onChange: (value) => this.updateDraftSection('notifications', value),
        onSave: async () => this.saveSection('notifications', this.draftSettings.notifications),
        onCancel: () => this.resetSection('notifications', state.settings.notifications),
      }),
      AppearanceSettings({
        values: this.draftSettings.appearance,
        onChange: (value) => this.updateDraftSection('appearance', value),
        onSave: async () => this.saveSection('appearance', this.draftSettings.appearance),
        onCancel: () => this.resetSection('appearance', state.settings.appearance),
      }),
      DataSettings({
        values: this.draftSettings.app,
        onExport: async () => {
          const result = await this.controller.exportData();
          Toast.info(result.message);
        },
        onImport: async () => {
          const result = await this.controller.importData();
          Toast.info(result.message);
        },
        onClear: async () => {
          const result = await this.controller.clearMockData();
          Toast.info(result.message);
        },
      }),
    ];

    sections.forEach((section) => content.appendChild(section));
    page.appendChild(content);
    this.root.innerHTML = '';
    this.root.appendChild(page);
  }
}

export default Settings;
