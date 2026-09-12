import { SettingsRepository } from './SettingsRepository.js';

const clone = (value) => structuredClone(value);

const initialSettings = {
  profile: {
    astrologerName: 'Aditi Sharma',
    email: 'aditi@astrobiz.in',
    phone: '+91 98765 43210',
    avatar: 'AS',
    bio: 'Specialist in Vedic guidance, relationship clarity, and life-path consultations.',
  },
  business: {
    practiceName: 'AstroBiz Guidance Studio',
    address: '14 Lotus Lane, Baner',
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    pinCode: '411045',
    phone: '+91 98765 43210',
    email: 'hello@astrobiz.in',
    website: 'https://astrobiz.in',
  },
  astrology: {
    astrologySystem: 'Vedic / Jyotish',
    ayanamsa: 'Lahiri',
    houseSystem: 'Placidus',
    chartStyle: 'Traditional',
    defaultLanguage: 'English',
    timeZone: 'Asia/Kolkata',
  },
  appointments: {
    defaultDuration: '60 minutes',
    workingDays: 'Mon-Fri',
    workingHours: '10:00 AM - 7:00 PM',
    bufferTime: '15 minutes',
    allowCancellation: true,
    cancellationNoticePeriod: '24 hours',
  },
  billing: {
    currency: 'INR',
    taxNumber: '27ABCDE1234F1Z5',
    defaultTaxPercentage: '5%',
    invoicePrefix: 'AB',
    paymentInstructions: 'Payment due within 7 days via UPI, NEFT, or cash.',
    invoiceFooter: 'Thank you for choosing AstroBiz Guidance Studio.',
  },
  notifications: {
    appointmentReminders: true,
    appointmentConfirmations: true,
    paymentReminders: true,
    followUpReminders: true,
    newCustomerNotifications: true,
    emailNotifications: true,
    desktopNotifications: true,
  },
  appearance: {
    themePreference: 'Light',
    layoutPreference: 'Comfortable',
  },
  app: {
    version: '0.1.0',
    environment: 'Frontend (mock/local)',
    dataStorageStatus: 'Local demo data only',
  },
};

export class MockSettingsRepository extends SettingsRepository {
  constructor(initialSettingsData = initialSettings) {
    super();
    this.settings = clone(initialSettingsData);
  }

  async simulateLatency() {
    await new Promise((resolve) => window.setTimeout(resolve, 120));
  }

  async getSettings() {
    await this.simulateLatency();
    return clone(this.settings);
  }

  async updateSection(sectionKey, values) {
    await this.simulateLatency();
    this.settings[sectionKey] = { ...this.settings[sectionKey], ...values };
    return clone(this.settings[sectionKey]);
  }

  async exportData() {
    await this.simulateLatency();
    return {
      success: true,
      message: 'Demo export is ready. Backend integration will enable file generation later.',
    };
  }

  async importData() {
    await this.simulateLatency();
    return {
      success: true,
      message: 'Demo import is ready for future backend synchronization.',
    };
  }

  async clearMockData() {
    await this.simulateLatency();
    return {
      success: true,
      message: 'Demo clear action is informational only; real user data is not touched.',
    };
  }
}
