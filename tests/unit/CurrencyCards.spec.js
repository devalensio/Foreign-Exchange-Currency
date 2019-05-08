import { createLocalVue, mount } from '@vue/test-utils';
import CurrencyCards from '@/components/CurrencyCards.vue';
import Vuetify from 'vuetify';

describe('CurrencyCards.vue', () => {
  let wrp;

  const localVue = createLocalVue();

  localVue.use(Vuetify);

  beforeEach(() => {
    wrp = mount(CurrencyCards, {
      localVue,
    });
  });

  it('CurrencyCards is the component of Vue', () => {
    expect(wrp.isVueInstance()).toBeTruthy();
  });

  it('should emit remove with value index if deleteItem is triggered', () => {
    wrp.vm.deleteItem(1);
    expect(wrp.emitted().remove).toBeTruthy();
    expect(wrp.emitted().remove[0]).toEqual([1]);
  });
});
