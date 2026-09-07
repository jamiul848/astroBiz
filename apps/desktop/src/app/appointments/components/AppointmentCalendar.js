import { StatusBadge } from '../../../shared/components/Badge.js';
import { Card } from '../../../shared/components/Card.js';
import { EmptyState } from '../../../shared/components/States.js';

const statusTypes = { Pending: 'warning', Confirmed: 'success', Completed: 'success', Cancelled: 'danger', 'No Show': 'neutral' };
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const parseDate = (value) => new Date(`${value}T00:00:00`);
const dateKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const displayDate = (date) => date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
const startOfWeek = (date) => { const result = new Date(date); result.setDate(result.getDate() - result.getDay()); return result; };

function appointmentElement(appointment, onSelect, compact = false) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `appointment-calendar-item appointment-status-${appointment.status.toLowerCase().replaceAll(' ', '-')}`;
  button.innerHTML = `<strong>${appointment.startTime}</strong><span>${appointment.customerName}</span>${compact ? '' : `<small>${appointment.serviceName}</small>`}`;
  button.addEventListener('click', () => onSelect(appointment.id));
  return button;
}

function dayView(date, appointments, onSelect) {
  const dayAppointments = appointments.filter((appointment) => appointment.date === dateKey(date));
  const wrapper = document.createElement('div');
  wrapper.className = 'appointment-day-view';
  if (!dayAppointments.length) { wrapper.appendChild(new EmptyState({ icon: '○', title: 'No appointments today', message: 'Your schedule is open for this day.' }).render()); return wrapper; }
  for (let hour = 8; hour <= 18; hour += 1) {
    const slot = document.createElement('div');
    slot.className = 'appointment-time-slot';
    slot.innerHTML = `<span>${String(hour).padStart(2, '0')}:00</span><div class="appointment-slot-content"></div>`;
    dayAppointments.filter((appointment) => Number(appointment.startTime.slice(0, 2)) === hour).forEach((appointment) => slot.querySelector('.appointment-slot-content').appendChild(appointmentElement(appointment, onSelect)));
    wrapper.appendChild(slot);
  }
  return wrapper;
}

function weekView(date, appointments, onSelect) {
  const week = startOfWeek(date);
  const grid = document.createElement('div');
  grid.className = 'appointment-week-view';
  for (let index = 0; index < 7; index += 1) {
    const current = new Date(week); current.setDate(week.getDate() + index);
    const column = document.createElement('div'); column.className = 'appointment-week-column';
    column.innerHTML = `<div class="appointment-week-heading"><strong>${dayNames[current.getDay()]}</strong><span>${current.getDate()}</span></div>`;
    appointments.filter((appointment) => appointment.date === dateKey(current)).forEach((appointment) => column.appendChild(appointmentElement(appointment, onSelect, true)));
    if (!column.querySelector('.appointment-calendar-item')) { const empty = document.createElement('span'); empty.className = 'appointment-week-empty'; empty.textContent = 'Open'; column.appendChild(empty); }
    grid.appendChild(column);
  }
  return grid;
}

function monthView(date, appointments, onSelect) {
  const first = new Date(date.getFullYear(), date.getMonth(), 1); const start = startOfWeek(first); const grid = document.createElement('div'); grid.className = 'appointment-month-view';
  dayNames.forEach((name) => { const label = document.createElement('div'); label.className = 'appointment-month-day-label'; label.textContent = name; grid.appendChild(label); });
  for (let index = 0; index < 42; index += 1) {
    const current = new Date(start); current.setDate(start.getDate() + index); const cell = document.createElement('div'); cell.className = `appointment-month-cell ${current.getMonth() !== date.getMonth() ? 'is-outside-month' : ''}`; cell.innerHTML = `<span class="appointment-month-date">${current.getDate()}</span>`;
    appointments.filter((appointment) => appointment.date === dateKey(current)).slice(0, 3).forEach((appointment) => cell.appendChild(appointmentElement(appointment, onSelect, true)));
    grid.appendChild(cell);
  }
  return grid;
}

export function AppointmentCalendar({ view, currentDate, appointments, onSelect }) {
  const date = parseDate(currentDate); let calendarContent;
  if (view === 'day') calendarContent = dayView(date, appointments, onSelect);
  if (view === 'week') calendarContent = weekView(date, appointments, onSelect);
  if (view === 'month') calendarContent = monthView(date, appointments, onSelect);
  const title = view === 'day' ? displayDate(date) : view === 'week' ? `Week of ${displayDate(startOfWeek(date))}` : date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
  const card = new Card({ title, content: calendarContent, className: `appointment-calendar-card appointment-calendar-${view}` }).render();
  const legend = document.createElement('div'); legend.className = 'appointment-calendar-legend'; Object.keys(statusTypes).forEach((status) => legend.appendChild(new StatusBadge({ label: status, status: statusTypes[status] }).render())); card.querySelector('.card-body').appendChild(legend);
  return card;
}
