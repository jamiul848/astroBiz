/**
 * Tabs Component
 * Reusable tabbed interface
 */
export class Tabs {
  constructor(options = {}) {
    this.tabs = options.tabs || []; // [{ id: 'tab1', label: 'Tab 1', content: 'Content 1' }, ...]
    this.activeTab = options.activeTab || this.tabs[0]?.id || '';
    this.onChange = options.onChange || (() => { });
    this.className = options.className || '';
  }

  render() {
    const container = document.createElement('div');
    container.className = `tabs-container ${this.className}`;

    // Tab buttons
    const tabsHeader = document.createElement('div');
    tabsHeader.className = 'tabs';

    this.tabs.forEach((tab) => {
      const button = document.createElement('button');
      button.className = `tab-button ${tab.id === this.activeTab ? 'active' : ''}`;
      button.textContent = tab.label;
      button.addEventListener('click', () => this.switchTab(tab.id, container));
      tabsHeader.appendChild(button);
    });

    container.appendChild(tabsHeader);

    // Tab content
    const tabsContent = document.createElement('div');
    tabsContent.className = 'tabs-content';

    this.tabs.forEach((tab) => {
      const content = document.createElement('div');
      content.className = `tab-content ${tab.id !== this.activeTab ? 'hidden' : ''}`;
      content.id = `tab-content-${tab.id}`;

      if (typeof tab.content === 'string') {
        content.innerHTML = tab.content;
      } else if (tab.content instanceof HTMLElement) {
        content.appendChild(tab.content);
      }

      tabsContent.appendChild(content);
    });

    container.appendChild(tabsContent);

    this.element = container;
    return container;
  }

  switchTab(tabId, container) {
    this.activeTab = tabId;

    // Update buttons
    const buttons = container.querySelectorAll('.tab-button');
    buttons.forEach((btn) => {
      btn.classList.remove('active');
    });
    const activeBtn = container.querySelector(`.tab-button[data-tab="${tabId}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    // Update content
    const contents = container.querySelectorAll('.tab-content');
    contents.forEach((content) => {
      content.classList.add('hidden');
    });
    const activeContent = container.querySelector(`#tab-content-${tabId}`);
    if (activeContent) activeContent.classList.remove('hidden');

    this.onChange(tabId);
  }
}
