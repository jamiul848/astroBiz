import { Button } from '../../shared/components/Button.js';
import { ConfirmDialog, Modal } from '../../shared/components/Modal.js';
import { EmptyState, ErrorState, LoadingState, Toast } from '../../shared/components/States.js';
import { ServiceController } from './ServiceController.js';
import { ServiceDetails } from './components/ServiceDetails.js';
import { ServiceForm } from './components/ServiceForm.js';
import { ServiceList } from './components/ServiceList.js';
import { serviceRepository } from './repositories/serviceRepositoryInstance.js';

function createServiceModal(controller, service, onComplete) {
  let modal;
  const form = ServiceForm({ service, onCancel: () => modal.close(), onSubmit: async (values) => { const submit = form.querySelector('button[type="submit"]'); submit.disabled = true; try { if (service) { await controller.updateService(service.id, values); Toast.success('Service updated successfully.'); } else { await controller.createService(values); Toast.success('Service added successfully.'); } modal.close(); onComplete(); } catch (error) { submit.disabled = false; form.querySelector('.service-form-error').textContent = error.message; } } });
  modal = new Modal({ title: service ? 'Edit service' : 'Add service', content: form, className: 'service-modal' }); modal.render(); modal.show();
}

export function Services() {
  const controller = new ServiceController(serviceRepository); const page = document.createElement('div'); page.className = 'page services-page';
  const header = document.createElement('header'); header.className = 'page-header services-header'; header.innerHTML = '<div><p class="service-eyebrow">Service catalog</p><h1>Services</h1><p class="service-subtitle">Shape a clear, flexible menu for every consultation you offer.</p></div>'; header.appendChild(new Button({ label: '+ Add service', variant: 'primary', onClick: () => createServiceModal(controller, null, render) }).render()); page.appendChild(header);
  const content = document.createElement('div'); content.className = 'page-content services-content'; page.appendChild(content);
  function toggleService(service) { const action = service.active ? 'Deactivate' : 'Activate'; new ConfirmDialog({ title: `${action} service`, message: `${action} ${service.name}?`, confirmLabel: action, onConfirm: async () => { await controller.setActive(service.id, !service.active); Toast.success(`Service ${service.active ? 'deactivated' : 'activated'}.`); render(); } }).show(); }
  function render() { const state = controller.state; if (state.loading) { content.replaceChildren(new LoadingState({ message: 'Loading services...', className: 'services-loading' }).render()); return; } if (state.error) { content.replaceChildren(new ErrorState({ title: 'Unable to load services', message: state.error, retry: new Button({ label: 'Try again', variant: 'secondary', onClick: () => controller.load() }) }).render()); return; } if (state.selectedService) { content.replaceChildren(ServiceDetails({ service: state.selectedService, onBack: () => controller.clearSelection(), onEdit: () => createServiceModal(controller, state.selectedService, render) })); return; } content.replaceChildren(ServiceList({ services: state.services, onSelect: (id) => controller.selectService(id), onEdit: async (id) => createServiceModal(controller, await controller.repository.getById(id), render), onToggle: toggleService })); }
  controller.subscribe(render); render(); controller.load(); return page;
}
