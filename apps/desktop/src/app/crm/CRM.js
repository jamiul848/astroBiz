import { ConfirmDialog, Modal } from '../../shared/components/Modal.js';
import { Button } from '../../shared/components/Button.js';
import { Card } from '../../shared/components/Card.js';
import { ErrorState, LoadingState, Toast } from '../../shared/components/States.js';
import { Input } from '../../shared/components/Input.js';
import { Select } from '../../shared/components/Select.js';
import { CRMController } from './CRMController.js';
import { MockCRMRepository } from './repositories/MockCRMRepository.js';
import { CRMDashboard } from './components/CRMDashboard.js';
import { CRMCustomerList } from './components/CRMCustomerList.js';
import { CRMCustomerDetails } from './components/CRMCustomerDetails.js';
import { FollowUpList } from './components/FollowUpList.js';
import { FollowUpForm } from './components/FollowUpForm.js';
import { ActivityTimeline } from './components/ActivityTimeline.js';

const statusOptions = [
  { value: 'all', label: 'All statuses' },
  { value: 'New', label: 'New' },
  { value: 'Follow-up', label: 'Follow-up' },
  { value: 'VIP', label: 'VIP' },
  { value: 'Active', label: 'Active' },
];

function formatDate(date) {
  if (!date) return 'Unknown';
  return new Date(date).toLocaleDateString();
}

export function CRM({ onNavigate = () => {} }) {
  const controller = new CRMController(new MockCRMRepository());
  const page = document.createElement('div');
  page.className = 'page crm-page';

  const header = document.createElement('header');
  header.className = 'page-header crm-header';
  header.innerHTML = `
    <div>
      <p class="crm-eyebrow">Relationship management</p>
      <h1>CRM</h1>
      <p class="crm-subtitle">Track customer health, interactions, and follow-up activity.</p>
    </div>
  `;

  const addButton = new Button({ label: '+ Add follow-up', variant: 'primary', onClick: () => createFollowUpModal() });
  header.appendChild(addButton.render());
  page.appendChild(header);

  const content = document.createElement('div');
  content.className = 'page-content crm-content';
  page.appendChild(content);

  function openCustomerView(customerId) {
    controller.selectCustomer(customerId);
  }

  function createFollowUpModal(initialFollowUp = null, customerIdOverride = null) {
    let modal;
    const followUp = initialFollowUp || {};
    const form = FollowUpForm({
      followUp: {
        ...followUp,
        customerId: customerIdOverride || followUp.customerId || '',
      },
      customers: controller.state.customers,
      onCancel: () => modal.close(),
      onSubmit: async (values) => {
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        try {
          if (initialFollowUp) {
            await controller.updateFollowUp(initialFollowUp.id, values);
            Toast.success('Follow-up updated successfully.');
          } else {
            await controller.createFollowUp(values);
            Toast.success('Follow-up created successfully.');
          }
          modal.close();
          render();
        } catch (error) {
          submitButton.disabled = false;
          form.querySelector('.form-error').textContent = error.message;
        }
      },
    });

    modal = new Modal({ title: initialFollowUp ? 'Edit follow-up' : 'Add follow-up', content: form, size: 'lg', className: 'crm-modal' });
    modal.render();
    modal.show();
  }

  function render() {
    const state = controller.state;

    if (state.loading) {
      content.replaceChildren(new LoadingState({ message: 'Loading CRM...', className: 'crm-loading' }).render());
      return;
    }

    if (state.error) {
      content.replaceChildren(new ErrorState({ title: 'Unable to load CRM data', message: state.error, retry: new Button({ label: 'Try again', variant: 'secondary', onClick: () => controller.load() }) }).render());
      return;
    }

    if (state.selectedCustomer) {
      const customerFollowUps = state.followUps.filter((item) => item.customerId === state.selectedCustomer.id);
      const activities = state.customerActivities.length ? state.customerActivities : [
        { type: 'Note', title: 'Customer profile opened', description: 'Customer CRM profile was opened in the relationship workspace.', date: new Date().toISOString(), relatedRecord: state.selectedCustomer.id },
      ];

      content.replaceChildren(CRMCustomerDetails({
        customer: state.selectedCustomer,
        followUps: customerFollowUps,
        activities,
        onBack: () => controller.clearSelection(),
        onViewCustomer: () => onNavigate('customers'),
        onViewKundali: () => onNavigate('kundalis', state.selectedCustomer.id),
        onViewAppointments: () => onNavigate('appointments'),
        onViewInvoices: () => onNavigate('billing'),
        onCreateFollowUp: () => createFollowUpModal(null, state.selectedCustomer.id),
      }));

      const followUpSection = document.createElement('div');
      followUpSection.className = 'crm-followup-section';
      followUpSection.appendChild(new Button({ label: 'Add follow-up', variant: 'primary', onClick: () => createFollowUpModal(null, state.selectedCustomer.id) }).render());
      const list = FollowUpList({
        followUps: customerFollowUps,
        onEdit: (item) => createFollowUpModal(item),
        onComplete: async (id) => {
          await controller.completeFollowUp(id);
          Toast.success('Follow-up marked as completed.');
          render();
        },
        onCancel: async (id) => {
          new ConfirmDialog({
            title: 'Cancel follow-up',
            message: 'This follow-up will be marked as cancelled.',
            confirmLabel: 'Cancel',
            onConfirm: async () => {
              await controller.cancelFollowUp(id);
              Toast.success('Follow-up cancelled.');
              render();
            },
          }).show();
        },
      });
      followUpSection.appendChild(list);
      content.appendChild(followUpSection);

      const timeline = document.createElement('div');
      timeline.className = 'crm-panel';
      timeline.appendChild(new Card({ title: 'Customer activity timeline', content: ActivityTimeline({ activities }).render(), className: 'crm-timeline-card' }).render());
      content.appendChild(timeline);
      return;
    }

    const toolbar = document.createElement('div');
    toolbar.className = 'crm-toolbar';
    const searchInput = new Input({ id: 'crm-search', placeholder: 'Search customers by name, phone, or email', className: 'crm-search-input' }).render();
    searchInput.querySelector('input').addEventListener('input', (event) => controller.setSearchQuery(event.target.value));
    toolbar.appendChild(searchInput);
    toolbar.appendChild(new Select({ id: 'crm-status', options: statusOptions, value: state.statusFilter, className: 'crm-status-select', onChange: (value) => controller.setStatusFilter(value) }).render());
    content.appendChild(toolbar);

    const visibleCustomers = controller.getVisibleCustomers();
    const stats = controller.getDashboardStats();

    content.appendChild(CRMDashboard({
      stats,
      customers: state.customers,
      followUps: state.followUps,
      onNavigate,
      onOpenFollowUpForm: () => createFollowUpModal(),
    }));

    const listSection = document.createElement('div');
    listSection.className = 'crm-list-section';
    listSection.appendChild(new Card({
      title: `${visibleCustomers.length} customers in CRM`,
      content: CRMCustomerList({
        customers: visibleCustomers,
        followUps: state.followUps,
        onSelect: openCustomerView,
        onAddFollowUp: (customerId) => createFollowUpModal(null, customerId),
      }),
      className: 'crm-table-card',
    }).render());
    content.appendChild(listSection);
  }

  controller.subscribe(render);
  render();
  controller.load();
  return page;
}
