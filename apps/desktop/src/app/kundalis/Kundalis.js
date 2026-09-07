import { Button } from '../../shared/components/Button.js';
import { EmptyState, ErrorState, LoadingState } from '../../shared/components/States.js';
import { CustomerController } from '../customers/CustomerController.js';
import { MockCustomerRepository } from '../customers/repositories/MockCustomerRepository.js';
import { KundaliController } from './KundaliController.js';
import { KundaliDetails } from './components/KundaliDetails.js';
import { KundaliList } from './components/KundaliList.js';
import { MockKundaliRepository } from './repositories/MockKundaliRepository.js';

export function Kundalis({ customerId = null }) {
  const customerController = new CustomerController(new MockCustomerRepository());
  const controller = new KundaliController(new MockKundaliRepository(), customerController.repository);
  const page = document.createElement('div');
  page.className = 'page kundalis-page';
  const header = document.createElement('header');
  header.className = 'page-header kundalis-header';
  header.innerHTML = '<div><p class="kundali-eyebrow">Astrology workspace</p><h1>Kundalis</h1><p class="kundali-subtitle">Review backend-provided birth charts and consultation reports.</p></div>';
  page.appendChild(header);
  const content = document.createElement('div');
  content.className = 'page-content kundalis-content';
  page.appendChild(content);

  function render() {
    const state = controller.state;
    if (state.loading) { content.replaceChildren(new LoadingState({ message: 'Loading Kundali data...', className: 'kundali-loading' }).render()); return; }
    if (state.error) { content.replaceChildren(new ErrorState({ title: 'Unable to load Kundali data', message: state.error, retry: new Button({ label: 'Try again', variant: 'secondary', onClick: () => load() }) }).render()); return; }
    if (state.selectedKundali) { content.replaceChildren(KundaliDetails({ kundali: state.selectedKundali, onBack: () => controller.clearSelection() })); return; }
    if (customerId) { content.replaceChildren(new EmptyState({ icon: '○', title: 'No Kundali available', message: 'This customer does not have a Kundali record yet.' }).render()); return; }
    content.replaceChildren(KundaliList({ kundalis: state.kundalis, onSelect: (id) => controller.selectById(id) }));
  }

  async function load() {
    if (customerId) await controller.selectByCustomerId(customerId);
    else await controller.load();
  }
  controller.subscribe(render);
  render();
  load();
  return page;
}
