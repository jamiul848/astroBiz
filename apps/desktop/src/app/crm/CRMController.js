export class CRMController {
  constructor(repository) {
    this.repository = repository;
    this.state = {
      customers: [],
      followUps: [],
      selectedCustomer: null,
      customerActivities: [],
      searchQuery: '',
      statusFilter: 'all',
      loading: false,
      error: null,
    };
    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((listener) => listener(this.state));
  }

  setState(changes) {
    this.state = { ...this.state, ...changes };
    this.notify();
  }

  async load() {
    this.setState({ loading: true, error: null });
    try {
      const [customers, followUps] = await Promise.all([
        this.repository.getAllCustomers(),
        this.repository.getFollowUps(),
      ]);
      this.setState({ customers, followUps, loading: false });
    } catch (error) {
      this.setState({ loading: false, error: error.message });
    }
  }

  setSearchQuery(searchQuery) {
    this.setState({ searchQuery });
  }

  setStatusFilter(statusFilter) {
    this.setState({ statusFilter });
  }

  async selectCustomer(id) {
    this.setState({ loading: true, error: null });
    try {
      const [customer, followUps, activities] = await Promise.all([
        this.repository.getCustomerById(id),
        this.repository.getFollowUpsForCustomer(id),
        this.repository.getActivitiesForCustomer(id),
      ]);
      this.setState({
        selectedCustomer: customer,
        customerActivities: activities,
        loading: false,
        followUps: this.state.followUps.length ? this.state.followUps : await this.repository.getFollowUps(),
      });
      return { customer, followUps, activities };
    } catch (error) {
      this.setState({ loading: false, error: error.message });
      return null;
    }
  }

  clearSelection() {
    this.setState({ selectedCustomer: null, customerActivities: [] });
  }

  getVisibleCustomers() {
    const query = this.state.searchQuery.trim().toLowerCase();
    return this.state.customers.filter((customer) => {
      const matchesSearch = !query || [customer.name, customer.phone, customer.email]
        .some((field) => String(field || '').toLowerCase().includes(query));
      const matchesStatus = this.state.statusFilter === 'all' || this.getRelationshipStatus(customer) === this.state.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }

  getRelationshipStatus(customer) {
    const customerFollowUps = this.state.followUps.filter((followUp) => followUp.customerId === customer.id && followUp.status !== 'Completed' && followUp.status !== 'Cancelled');
    if (customer.status === 'VIP') return 'VIP';
    if (customerFollowUps.some((followUp) => followUp.status === 'Due')) return 'Due';
    if (customerFollowUps.length) return 'Follow-up';
    if (customer.status === 'New') return 'New';
    return customer.status || 'Active';
  }

  getDashboardStats() {
    const today = new Date('2024-06-14T00:00:00');
    const totalCustomers = this.state.customers.length;
    const followUpsDueToday = this.state.followUps.filter((item) => item.dueDate === '2024-06-14' && item.status !== 'Completed' && item.status !== 'Cancelled').length;
    const upcomingFollowUps = this.state.followUps.filter((item) => item.status !== 'Completed' && item.status !== 'Cancelled' && item.dueDate > '2024-06-14').length;
    const overdueFollowUps = this.state.followUps.filter((item) => item.status !== 'Completed' && item.status !== 'Cancelled' && item.dueDate < '2024-06-14').length;
    const recentInteractions = this.state.customerActivities.slice(0, 5).length;
    const customersNeedingAttention = this.state.customers.filter((customer) => {
      const related = this.state.followUps.filter((item) => item.customerId === customer.id && item.status !== 'Completed' && item.status !== 'Cancelled');
      return related.length > 0 || customer.status === 'New';
    }).length;

    return {
      totalCustomers,
      followUpsDueToday,
      upcomingFollowUps,
      overdueFollowUps,
      recentInteractions,
      customersNeedingAttention,
    };
  }

  async createFollowUp(followUp) {
    const created = await this.repository.createFollowUp(followUp);
    this.setState({
      followUps: [created, ...this.state.followUps],
      selectedCustomer: this.state.selectedCustomer ? { ...this.state.selectedCustomer } : null,
    });
    return created;
  }

  async updateFollowUp(id, followUp) {
    const updated = await this.repository.updateFollowUp(id, followUp);
    this.setState({
      followUps: this.state.followUps.map((record) => record.id === id ? updated : record),
    });
    return updated;
  }

  async completeFollowUp(id) {
    const updated = await this.repository.completeFollowUp(id);
    this.setState({
      followUps: this.state.followUps.map((record) => record.id === id ? updated : record),
    });
    return updated;
  }

  async cancelFollowUp(id) {
    const updated = await this.repository.cancelFollowUp(id);
    this.setState({
      followUps: this.state.followUps.map((record) => record.id === id ? updated : record),
    });
    return updated;
  }
}
