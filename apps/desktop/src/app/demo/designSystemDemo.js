/**
 * Design System Demo
 * Demonstrates all reusable components
 */

import { Button } from '../../shared/components/Button.js';
import { Input } from '../../shared/components/Input.js';
import { Select } from '../../shared/components/Select.js';
import { Card, StatCard } from '../../shared/components/Card.js';
import { StatusBadge, Avatar } from '../../shared/components/Badge.js';
import { Table } from '../../shared/components/Table.js';
import { Modal, ConfirmDialog } from '../../shared/components/Modal.js';
import { Tabs } from '../../shared/components/Tabs.js';
import { LoadingState, EmptyState, ErrorState, Toast } from '../../shared/components/States.js';

export function renderDesignSystemDemo(container) {
  // Buttons Section
  const buttonsSection = document.createElement('div');
  buttonsSection.className = 'section';
  buttonsSection.innerHTML = '<h2 class="section-title">Buttons</h2>';

  const buttonContainer = document.createElement('div');
  buttonContainer.style.display = 'flex';
  buttonContainer.style.gap = 'var(--space-4)';
  buttonContainer.style.flexWrap = 'wrap';

  [
    { label: 'Primary', variant: 'primary' },
    { label: 'Secondary', variant: 'secondary' },
    { label: 'Accent', variant: 'accent' },
    { label: 'Success', variant: 'success' },
    { label: 'Danger', variant: 'danger' },
    { label: 'Disabled', variant: 'primary', disabled: true },
  ].forEach(({ label, variant, disabled }) => {
    const btn = new Button({
      label,
      variant,
      disabled,
      onClick: () => Toast.info(`${label} clicked`),
    });
    buttonContainer.appendChild(btn.render());
  });

  buttonsSection.appendChild(buttonContainer);
  container.appendChild(buttonsSection);

  // Inputs Section
  const inputsSection = document.createElement('div');
  inputsSection.className = 'section';
  inputsSection.innerHTML = '<h2 class="section-title">Form Inputs</h2>';

  const inputExample = new Input({
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email',
    hint: 'We will never share your email',
    onChange: (value) => console.log('Email:', value),
  });
  inputsSection.appendChild(inputExample.render());

  const selectExample = new Select({
    label: 'Choose Option',
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ],
    onChange: (value) => console.log('Selected:', value),
  });
  inputsSection.appendChild(selectExample.render());

  container.appendChild(inputsSection);

  // Cards Section
  const cardsSection = document.createElement('div');
  cardsSection.className = 'section';
  cardsSection.innerHTML = '<h2 class="section-title">Cards & Stat Cards</h2>';

  const cardsGrid = document.createElement('div');
  cardsGrid.className = 'grid grid-cols-2';

  const exampleCard = new Card({
    title: 'Example Card',
    content: 'This is a reusable card component with header and content.',
    footer: 'Card Footer',
  });
  cardsGrid.appendChild(exampleCard.render());

  const statCard = new StatCard({
    label: 'Total Revenue',
    value: '$12,450',
    change: { value: 12, direction: 'up' },
  });
  cardsGrid.appendChild(statCard.render());

  cardsSection.appendChild(cardsGrid);
  container.appendChild(cardsSection);

  // Status Badges Section
  const badgesSection = document.createElement('div');
  badgesSection.className = 'section';
  badgesSection.innerHTML = '<h2 class="section-title">Status Badges</h2>';

  const badgesContainer = document.createElement('div');
  badgesContainer.style.display = 'flex';
  badgesContainer.style.gap = 'var(--space-4)';
  badgesContainer.style.flexWrap = 'wrap';

  ['primary', 'success', 'danger', 'warning', 'neutral'].forEach((status) => {
    const badge = new StatusBadge({
      label: status.charAt(0).toUpperCase() + status.slice(1),
      status,
      icon: '●',
    });
    badgesContainer.appendChild(badge.render());
  });

  badgesSection.appendChild(badgesContainer);
  container.appendChild(badgesSection);

  // Avatar Section
  const avatarSection = document.createElement('div');
  avatarSection.className = 'section';
  avatarSection.innerHTML = '<h2 class="section-title">Avatars</h2>';

  const avatarContainer = document.createElement('div');
  avatarContainer.style.display = 'flex';
  avatarContainer.style.gap = 'var(--space-6)';
  avatarContainer.style.alignItems = 'center';

  ['sm', 'md', 'lg'].forEach((size) => {
    const avatar = new Avatar({
      name: 'John Doe',
      size,
      color: 'accent',
    });
    avatarContainer.appendChild(avatar.render());
  });

  avatarSection.appendChild(avatarContainer);
  container.appendChild(avatarSection);

  // Table Section
  const tableSection = document.createElement('div');
  tableSection.className = 'section';
  tableSection.innerHTML = '<h2 class="section-title">Data Table</h2>';

  const table = new Table({
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
      { key: 'status', label: 'Status' },
      { key: 'date', label: 'Date' },
    ],
    rows: [
      { id: '1', name: 'John Doe', status: 'Active', date: '2026-09-01' },
      { id: '2', name: 'Jane Smith', status: 'Pending', date: '2026-09-02' },
      { id: '3', name: 'Bob Johnson', status: 'Completed', date: '2026-09-03' },
    ],
  });
  tableSection.appendChild(table.render());
  container.appendChild(tableSection);

  // Modal Section
  const modalSection = document.createElement('div');
  modalSection.className = 'section';
  modalSection.innerHTML = '<h2 class="section-title">Modal & Dialog</h2>';

  const modalBtnContainer = document.createElement('div');
  modalBtnContainer.style.display = 'flex';
  modalBtnContainer.style.gap = 'var(--space-4)';

  const modalBtn = new Button({
    label: 'Open Modal',
    onClick: () => {
      const modal = new Modal({
        title: 'Example Modal',
        content: 'This is a reusable modal component.',
        footer: '<button class="btn btn-primary">Save</button> <button class="btn btn-secondary">Cancel</button>',
      });
      modal.show();
    },
  });
  modalBtnContainer.appendChild(modalBtn.render());

  const confirmBtn = new Button({
    label: 'Show Confirmation',
    variant: 'danger',
    onClick: () => {
      const dialog = new ConfirmDialog({
        title: 'Confirm Action',
        message: 'Are you sure you want to proceed?',
        onConfirm: () => Toast.success('Confirmed!'),
        onCancel: () => Toast.warning('Cancelled'),
      });
      dialog.show();
    },
  });
  modalBtnContainer.appendChild(confirmBtn.render());

  modalSection.appendChild(modalBtnContainer);
  container.appendChild(modalSection);

  // Tabs Section
  const tabsSection = document.createElement('div');
  tabsSection.className = 'section';
  tabsSection.innerHTML = '<h2 class="section-title">Tabs</h2>';

  const tabs = new Tabs({
    tabs: [
      { id: 'tab1', label: 'Tab 1', content: '<p>Content for Tab 1</p>' },
      { id: 'tab2', label: 'Tab 2', content: '<p>Content for Tab 2</p>' },
      { id: 'tab3', label: 'Tab 3', content: '<p>Content for Tab 3</p>' },
    ],
  });
  tabsSection.appendChild(tabs.render());
  container.appendChild(tabsSection);

  // States Section
  const statesSection = document.createElement('div');
  statesSection.className = 'section';
  statesSection.innerHTML = '<h2 class="section-title">State Components</h2>';

  const statesGrid = document.createElement('div');
  statesGrid.className = 'grid grid-cols-3';

  const loadingState = new LoadingState({
    message: 'Loading your data...',
  });
  statesGrid.appendChild(loadingState.render());

  const emptyState = new EmptyState({
    icon: '📭',
    title: 'No Data',
    message: 'There is nothing to display yet.',
  });
  statesGrid.appendChild(emptyState.render());

  const errorState = new ErrorState({
    icon: '⚠️',
    title: 'Error',
    message: 'Something went wrong. Please try again.',
  });
  statesGrid.appendChild(errorState.render());

  statesSection.appendChild(statesGrid);
  container.appendChild(statesSection);

  // Toast Messages
  const toastSection = document.createElement('div');
  toastSection.className = 'section';
  toastSection.innerHTML = '<h2 class="section-title">Toast Notifications</h2>';

  const toastContainer = document.createElement('div');
  toastContainer.style.display = 'flex';
  toastContainer.style.gap = 'var(--space-4)';
  toastContainer.style.flexWrap = 'wrap';

  ['success', 'error', 'warning', 'info'].forEach((type) => {
    const btn = new Button({
      label: `Show ${type.charAt(0).toUpperCase() + type.slice(1)} Toast`,
      onClick: () => Toast[type](`This is a ${type} message!`),
    });
    toastContainer.appendChild(btn.render());
  });

  toastSection.appendChild(toastContainer);
  container.appendChild(toastSection);
}
