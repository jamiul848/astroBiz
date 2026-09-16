const formatCurrency = (value) => `Rs ${value.toLocaleString('en-IN')}`;

export function InvoicePreview({ invoice }) {
  const appointmentHtml = invoice.appointmentId
    ? invoice.appointment
      ? `<div><span>Appointment</span><strong>${invoice.appointment.id}</strong><small>${invoice.appointment.date}${invoice.appointment.time ? ' · ' + invoice.appointment.time : ''}</small></div>`
      : `<div><span>Appointment</span><strong>${invoice.appointmentId}</strong><small>Details unavailable</small></div>`
    : `<div><span>Appointment</span><strong style="opacity:0.45">No appointment linked</strong></div>`;

  const preview = document.createElement('article'); preview.className = 'invoice-preview';
  preview.innerHTML = `<header class="invoice-preview-header"><div><div class="invoice-brand">AstroBiz</div><p>Professional astrology practice</p></div><div class="invoice-preview-meta"><strong>${invoice.invoiceNumber}</strong><span>Invoice date: ${invoice.invoiceDate}</span></div></header><section class="invoice-bill-to"><div><span>Billed to</span><strong>${invoice.customer?.name || 'Customer'}</strong><small>${invoice.customer?.email || 'No email provided'}</small><small>${invoice.customer?.phone || 'No phone provided'}</small></div><div><span>Service</span><strong>${invoice.service?.name || 'Service'}</strong><small>${invoice.service?.description || 'Consultation service'}</small></div>${appointmentHtml}</section><section class="invoice-line-items"><div class="invoice-line invoice-line-heading"><span>Description</span><span>Amount</span></div><div class="invoice-line"><span>${invoice.service?.name || 'Consultation'}</span><strong>${formatCurrency(invoice.subtotal)}</strong></div><div class="invoice-line invoice-line-muted"><span>Discount</span><span>- ${formatCurrency(invoice.discount)}</span></div><div class="invoice-line invoice-line-muted"><span>Tax</span><span>${formatCurrency(invoice.tax)}</span></div></section><footer class="invoice-preview-total"><span>Total due</span><strong>${formatCurrency(invoice.total)}</strong></footer><div class="invoice-preview-status"><span>Payment status: <strong>${invoice.paymentStatus}</strong></span><span>Method: <strong>${invoice.paymentMethod}</strong></span></div>`;
  return preview;
}

