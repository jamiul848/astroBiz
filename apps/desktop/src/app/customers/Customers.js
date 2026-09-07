import { Button } from '../../shared/components/Button.js';
import { Card } from '../../shared/components/Card.js';
import { ErrorState, LoadingState, Toast } from '../../shared/components/States.js';
import { Modal } from '../../shared/components/Modal.js';
import { Input } from '../../shared/components/Input.js';
import { Select } from '../../shared/components/Select.js';
import { CustomerController } from './CustomerController.js';
import { CustomerDetails } from './components/CustomerDetails.js';
import { CustomerForm } from './components/CustomerForm.js';
import { CustomerList } from './components/CustomerList.js';
import { MockCustomerRepository } from './repositories/MockCustomerRepository.js';

const statusOptions = [
  { value: 'all', label: 'All statuses' },
  { value: 'New', label: 'New' },
  { value: 'Active', label: 'Active' },
  { value: 'Follow-up', label: 'Follow-up' },
  { value: 'Inactive', label: 'Inactive' },
  { value: 'VIP', label: 'VIP' },
];

function createCustomerModal(controller, customer, onComplete) {
  let modal;
  const form = CustomerForm({
    customer,
    onCancel: () => modal.close(),
    onSubmit: async (values) => {
      const saveButton = form.querySelector('button[type="submit"]');
      saveButton.disabled = true;
      try {
        if (customer) {
          await controller.updateCustomer(customer.id, values);
          Toast.success('Customer updated successfully.');
        } else {
          await controller.createCustomer(values);
          Toast.success('Customer added successfully.');
        }
        modal.close();
        onComplete();
      } catch (error) {
        saveButton.disabled = false;
        form.querySelector('.customer-form-error').textContent = error.message;
      }
    },
  });
  modal = new Modal({ title: customer ? 'Edit customer' : 'Add customer', content: form, size: 'lg' });
  modal.render();
  modal.show();
}

export function Customers({ onNavigate }) {
  const controller = new CustomerController(new MockCustomerRepository());
  const page = document.createElement('div');
  page.className = 'page customers-page';

  const header = document.createElement('header');
  header.className = 'page-header customers-header';
  header.innerHTML = `
    <div>
      <p class="customers-eyebrow">Customer workspace</p>
      <h1>Customers</h1>
      <p class="customers-subtitle">Keep every relationship and birth detail in one considered place.</p>
    </div>
  `;
  header.appendChild(new Button({ label: '+ Add customer', variant: 'primary', onClick: () => createCustomerModal(controller, null, render) }).render());
  page.appendChild(header);

  const content = document.createElement('div');
  content.className = 'page-content customers-content';
  page.appendChild(content);

  const toolbar = document.createElement('div');
  toolbar.className = 'customers-toolbar';
  const search = new Input({ id: 'customer-search', placeholder: 'Search by name, phone, or email', className: 'customer-search-input' }).render();
  search.querySelector('input').addEventListener('input', (event) => controller.setSearchQuery(event.target.value));
  toolbar.appendChild(search);
  toolbar.appendChild(new Select({ id: 'customer-status', options: statusOptions, value: 'all', className: 'customer-status-select', onChange: (value) => controller.setStatusFilter(value) }).render());
  content.appendChild(toolbar);

  const resultsMeta = document.createElement('div');
  resultsMeta.className = 'customers-results-meta';
  content.appendChild(resultsMeta);
  const listContainer = document.createElement('div');
  listContainer.className = 'customers-list-container';
  content.appendChild(listContainer);

  function render() {
    const state = controller.state;
    if (state.selectedCustomer) {
      toolbar.classList.add('hidden');
      resultsMeta.classList.add('hidden');
      listContainer.replaceChildren(CustomerDetails({
        customer: state.selectedCustomer,
        onBack: () => controller.clearSelection(),
        onEdit: () => createCustomerModal(controller, state.selectedCustomer, render),
        onViewKundali: () => onNavigate('kundalis', state.selectedCustomer.id),
      }));
      return;
    }

    toolbar.classList.remove('hidden');
    resultsMeta.classList.remove('hidden');
    if (state.loading) {
      listContainer.replaceChildren(new LoadingState({ message: 'Loading customers...', className: 'customers-loading' }).render());
      return;
    }
    if (state.error) {
      listContainer.replaceChildren(new ErrorState({
        title: 'Unable to load customers',
        message: state.error,
        retry: new Button({ label: 'Try again', variant: 'secondary', onClick: () => controller.load() }),
      }).render());
      return;
    }

    const visibleCustomers = controller.getVisibleCustomers();
    resultsMeta.textContent = `${visibleCustomers.length} ${visibleCustomers.length === 1 ? 'customer' : 'customers'} shown`;
    listContainer.replaceChildren(CustomerList({
      customers: visibleCustomers,
      hasFilters: Boolean(state.searchQuery || state.statusFilter !== 'all'),
      onSelect: (id) => controller.selectCustomer(id),
      onEdit: async (id) => createCustomerModal(controller, await controller.repository.getById(id), render),
      onClearFilters: () => {
        controller.setSearchQuery('');
        controller.setStatusFilter('all');
        search.querySelector('input').value = '';
        toolbar.querySelector('select').value = 'all';
      },
    }));
  }

  controller.subscribe(render);
  render();
  controller.load();
  return page;
}
