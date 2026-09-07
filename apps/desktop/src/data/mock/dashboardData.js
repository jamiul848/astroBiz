export const dashboardStats = [
  {
    label: "Today's Revenue",
    value: 'Rs 24,850',
    change: { value: 12, direction: 'up' },
    detail: 'vs. Rs 22,180 yesterday',
    tone: 'revenue',
  },
  {
    label: 'Total Customers',
    value: '1,248',
    change: { value: 8, direction: 'up' },
    detail: '96 added this month',
    tone: 'customers',
  },
  {
    label: "Today's Appointments",
    value: '12',
    change: { value: 3, direction: 'up' },
    detail: '4 consultations remaining',
    tone: 'appointments',
  },
  {
    label: 'Pending Payments',
    value: 'Rs 18,420',
    change: { value: 5, direction: 'down' },
    detail: '7 invoices need attention',
    tone: 'payments',
  },
];

export const upcomingAppointments = [
  {
    id: 'apt-1',
    customer: 'Ananya Mehta',
    date: 'Today, 14 Jun',
    time: '10:30 AM',
    service: 'Career Consultation',
    status: 'Confirmed',
    statusType: 'success',
    avatarColor: 'accent',
  },
  {
    id: 'apt-2',
    customer: 'Rohan Kapoor',
    date: 'Today, 14 Jun',
    time: '1:00 PM',
    service: 'Kundali Reading',
    status: 'Pending',
    statusType: 'warning',
    avatarColor: 'primary',
  },
  {
    id: 'apt-3',
    customer: 'Priya Sharma',
    date: 'Tomorrow, 15 Jun',
    time: '11:15 AM',
    service: 'Marriage Consultation',
    status: 'Confirmed',
    statusType: 'success',
    avatarColor: 'success',
  },
  {
    id: 'apt-4',
    customer: 'Vikram Joshi',
    date: 'Tomorrow, 15 Jun',
    time: '4:30 PM',
    service: 'Full Horoscope',
    status: 'Pending',
    statusType: 'warning',
    avatarColor: 'warning',
  },
];

export const recentCustomers = [
  { name: 'Meera Iyer', contact: 'meera.iyer@example.com', lastInteraction: 'Today, 9:42 AM', status: 'Active' },
  { name: 'Arjun Rao', contact: '+91 98765 43210', lastInteraction: 'Yesterday', status: 'New' },
  { name: 'Kavya Nair', contact: 'kavya.nair@example.com', lastInteraction: '12 Jun 2024', status: 'Follow-up' },
  { name: 'Sahil Malhotra', contact: '+91 99887 66554', lastInteraction: '10 Jun 2024', status: 'VIP' },
];

export const followUps = [
  { customer: 'Neha Verma', reason: 'Share consultation notes', due: 'Today, 3:00 PM', priority: 'High', priorityType: 'danger', avatarColor: 'danger' },
  { customer: 'Aditya Singh', reason: 'Check payment confirmation', due: 'Today, 5:30 PM', priority: 'Medium', priorityType: 'warning', avatarColor: 'accent' },
  { customer: 'Simran Kaur', reason: 'Schedule next reading', due: 'Tomorrow', priority: 'Low', priorityType: 'neutral', avatarColor: 'success' },
];

export const quickActions = [
  { label: 'Add Customer', icon: '+', path: 'customers', variant: 'primary' },
  { label: 'Generate Kundali', icon: '*', path: 'kundalis', variant: 'secondary' },
  { label: 'New Appointment', icon: '+', path: 'appointments', variant: 'accent' },
  { label: 'Create Invoice', icon: '+', path: 'billing', variant: 'secondary' },
];
