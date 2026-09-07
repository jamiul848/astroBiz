export class KundaliController {
  constructor(repository, customerRepository) {
    this.repository = repository;
    this.customerRepository = customerRepository;
    this.state = { kundalis: [], selectedKundali: null, loading: false, error: null };
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
      const [kundalis, customers] = await Promise.all([
        this.repository.getAll(),
        this.customerRepository.getAll(),
      ]);
      const customerMap = new Map(customers.map((customer) => [customer.id, customer]));
      kundalis.forEach((kundali) => {
        const customer = customerMap.get(kundali.customerId);
        kundali.customerName = customer?.name || 'Unknown customer';
        kundali.avatarColor = customer?.avatarColor || 'accent';
      });
      this.setState({ kundalis, loading: false });
    } catch (error) {
      this.setState({ loading: false, error: error.message });
    }
  }

  async selectById(id) {
    this.setState({ loading: true, error: null });
    try {
      const selectedKundali = await this.repository.getById(id);
      await this.enrichCustomer(selectedKundali);
      this.setState({ selectedKundali, loading: false });
    } catch (error) {
      this.setState({ loading: false, error: error.message });
    }
  }

  async selectByCustomerId(customerId) {
    this.setState({ loading: true, error: null });
    try {
      const selectedKundali = await this.repository.getByCustomerId(customerId);
      await this.enrichCustomer(selectedKundali);
      this.setState({ selectedKundali, loading: false });
    } catch (error) {
      this.setState({ loading: false, error: error.message });
    }
  }

  async enrichCustomer(kundali) {
    if (!kundali) return;
    const customer = await this.customerRepository.getById(kundali.customerId);
    kundali.customerName = customer?.name || 'Unknown customer';
    kundali.avatarColor = customer?.avatarColor || 'accent';
  }

  clearSelection() {
    this.setState({ selectedKundali: null, error: null });
  }
}
