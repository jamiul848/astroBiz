import { Button } from '../../shared/components/Button.js';
import { ConfirmDialog, Modal } from '../../shared/components/Modal.js';
import { ErrorState, LoadingState, Toast } from '../../shared/components/States.js';
import { CustomerController } from '../customers/CustomerController.js';
import { MockCustomerRepository } from '../customers/repositories/MockCustomerRepository.js';
import { AppointmentController } from './AppointmentController.js';
import { AppointmentCalendar } from './components/AppointmentCalendar.js';
import { AppointmentDetails } from './components/AppointmentDetails.js';
import { AppointmentForm } from './components/AppointmentForm.js';
import { AppointmentList } from './components/AppointmentList.js';
import { serviceRepository } from '../services/repositories/serviceRepositoryInstance.js';
import { MockAppointmentRepository } from './repositories/MockAppointmentRepository.js';

const parseDate = (value) => new Date(`${value}T00:00:00`);
const formatDate = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const startOfWeek = (date) => { const result = new Date(date); result.setDate(result.getDate() - result.getDay()); return result; };

function shiftDate(value, view, direction) {
  const date = parseDate(value);
  const days = view === 'day' ? 1 : view === 'week' ? 7 : 30;
  date.setDate(date.getDate() + days * direction);
  return formatDate(date);
}

function createAppointmentModal(controller, appointment, onComplete) {
  let modal;
  const form = AppointmentForm({
    appointment,
    customers: controller.state.customers,
    services: controller.state.services.filter((service) => service.active || service.id === appointment?.serviceId),
    onCancel: () => modal.close(),
    onSubmit: async (values) => {
      const submit = form.querySelector('button[type="submit"]');
      submit.disabled = true;
      try {
        if (appointment) {
          await controller.updateAppointment(appointment.id, values);
          Toast.success('Appointment updated successfully.');
        } else {
          await controller.createAppointment(values);
          Toast.success('Appointment created successfully.');
        }
        modal.close();
        onComplete();
      } catch (error) {
        submit.disabled = false;
        form.querySelector('.appointment-form-error').textContent = error.message;
      }
    },
  });
  modal = new Modal({ title: appointment ? 'Edit appointment' : 'New appointment', content: form, className: 'appointment-modal' });
  modal.render();
  modal.show();
}

export function Appointments() {
  const customerController = new CustomerController(new MockCustomerRepository());
  const controller = new AppointmentController(new MockAppointmentRepository(), customerController.repository, serviceRepository);
  const page = document.createElement('div');
  page.className = 'page appointments-page';
  const header = document.createElement('header');
  header.className = 'page-header appointments-header';
  header.innerHTML = '<div><p class="appointment-eyebrow">Practice calendar</p><h1>Appointments</h1><p class="appointment-subtitle">Plan consultations across your day, week, and month.</p></div>';
  header.appendChild(new Button({ label: '+ New appointment', variant: 'primary', onClick: () => createAppointmentModal(controller, null, render) }).render());
  page.appendChild(header);
  const content = document.createElement('div'); content.className = 'page-content appointments-content'; page.appendChild(content);

  function getVisibleAppointments() {
    const appointments = controller.getEnrichedAppointments(); const date = parseDate(controller.state.currentDate);
    if (controller.state.view === 'day') return appointments.filter((appointment) => appointment.date === formatDate(date));
    if (controller.state.view === 'week') { const start = startOfWeek(date); const end = new Date(start); end.setDate(start.getDate() + 6); return appointments.filter((appointment) => { const current = parseDate(appointment.date); return current >= start && current <= end; }); }
    return appointments.filter((appointment) => parseDate(appointment.date).getMonth() === date.getMonth() && parseDate(appointment.date).getFullYear() === date.getFullYear());
  }

  function cancelAppointment(id) {
    new ConfirmDialog({ title: 'Cancel appointment', message: 'Are you sure you want to cancel this appointment?', confirmLabel: 'Cancel appointment', onConfirm: async () => { await controller.cancelAppointment(id); Toast.success('Appointment cancelled.'); render(); } }).show();
  }

  function render() {
    const state = controller.state;
    if (state.loading) { content.replaceChildren(new LoadingState({ message: 'Loading appointments...', className: 'appointments-loading' }).render()); return; }
    if (state.error) { content.replaceChildren(new ErrorState({ title: 'Unable to load appointments', message: state.error, retry: new Button({ label: 'Try again', variant: 'secondary', onClick: () => controller.load() }) }).render()); return; }
    if (state.selectedAppointment) { content.replaceChildren(AppointmentDetails({ appointment: state.selectedAppointment, onBack: () => controller.clearSelection(), onEdit: () => createAppointmentModal(controller, state.selectedAppointment, render), onCancel: () => cancelAppointment(state.selectedAppointment.id) })); return; }

    content.replaceChildren();
    const controls = document.createElement('div'); controls.className = 'appointments-controls';
    const periodActions = document.createElement('div'); periodActions.className = 'appointment-period-actions';
    periodActions.appendChild(new Button({ label: 'Previous', variant: 'secondary', size: 'sm', onClick: () => controller.setCurrentDate(shiftDate(state.currentDate, state.view, -1)) }).render());
    periodActions.appendChild(new Button({ label: 'Today', variant: 'secondary', size: 'sm', onClick: () => controller.setCurrentDate('2024-06-14') }).render());
    periodActions.appendChild(new Button({ label: 'Next', variant: 'secondary', size: 'sm', onClick: () => controller.setCurrentDate(shiftDate(state.currentDate, state.view, 1)) }).render());
    controls.appendChild(periodActions);
    const views = document.createElement('div'); views.className = 'appointment-view-switcher';
    ['day', 'week', 'month'].forEach((view) => { const button = new Button({ label: view.charAt(0).toUpperCase() + view.slice(1), variant: state.view === view ? 'primary' : 'secondary', size: 'sm', onClick: () => controller.setView(view) }).render(); button.dataset.view = view; views.appendChild(button); });
    controls.appendChild(views); content.appendChild(controls);

    const visibleAppointments = getVisibleAppointments();
    content.appendChild(AppointmentCalendar({ view: state.view, currentDate: state.currentDate, appointments: controller.getEnrichedAppointments(), onSelect: (id) => controller.selectAppointment(id) }));
    const listHeading = document.createElement('div'); listHeading.className = 'appointments-list-heading'; listHeading.innerHTML = `<h2>Appointment list</h2><span>${visibleAppointments.length} in this view</span>`; content.appendChild(listHeading);
    content.appendChild(AppointmentList({ appointments: visibleAppointments, onSelect: (id) => controller.selectAppointment(id), onEdit: async (id) => createAppointmentModal(controller, await controller.resolveAppointment(await controller.repository.getById(id)), render), onCancel: cancelAppointment }));
  }

  controller.subscribe(render); render(); controller.load(); return page;
}
