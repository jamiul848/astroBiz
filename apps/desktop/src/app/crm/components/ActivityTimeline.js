export function ActivityTimeline({ activities = [] }) {
  const container = document.createElement('div');
  container.className = 'crm-activity-timeline';

  if (!activities.length) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.innerHTML = '<div class="empty-state-icon">🕘</div><h3 class="empty-state-title">No recent activity</h3><p>No customer activity has been recorded yet.</p>';
    container.appendChild(empty);
    return container;
  }

  activities.forEach((activity) => {
    const item = document.createElement('div');
    item.className = 'crm-timeline-item';
    item.innerHTML = `
      <div class="crm-timeline-date">${new Date(activity.date).toLocaleDateString()}</div>
      <div class="crm-timeline-content">
        <div class="crm-timeline-head">
          <span class="crm-timeline-type">${activity.type}</span>
          <strong>${activity.title}</strong>
        </div>
        <p>${activity.description}</p>
        <small>Related record: ${activity.relatedRecord || 'N/A'}</small>
      </div>
    `;
    container.appendChild(item);
  });

  return container;
}
