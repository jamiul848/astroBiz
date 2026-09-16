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
      const kundalis = await this.repository.getByCustomerId(customerId);
      if (!kundalis || (Array.isArray(kundalis) && kundalis.length === 0)) {
        this.setState({ kundalis: [], selectedKundali: null, loading: false });
        return;
      }
      // getByCustomerId may return an array or a single object depending on repository
      const kundaliList = Array.isArray(kundalis) ? kundalis : [kundalis];
      if (kundaliList.length === 1) {
        await this.enrichCustomer(kundaliList[0]);
        this.setState({ selectedKundali: kundaliList[0], loading: false });
      } else {
        // Multiple kundalis — enrich all and show list
        const customers = await this.customerRepository.getAll();
        const customerMap = new Map(customers.map((c) => [c.id, c]));
        kundaliList.forEach((k) => {
          const customer = customerMap.get(k.customerId);
          k.customerName = customer?.name || 'Unknown customer';
          k.avatarColor = customer?.avatarColor || 'accent';
        });
        this.setState({ kundalis: kundaliList, selectedKundali: null, loading: false });
      }
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
