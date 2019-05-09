import { createLocalVue, mount } from '@vue/test-utils';
import Snackbar from '@/components/Snackbar.vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';

describe('Snackbar.vue', () => {
  let wrp;

  const localVue = createLocalVue();

  localVue.use(Vuetify);
  localVue.use(Vuex);

  const mutations = {
    show: jest.fn(),
    hide: jest.fn(),
  };

  const store = new Vuex.Store({
    modules: {
      snackbar: {
        namespaced: true,
        state: {},
        mutations,
      },
    },
  });

  beforeEach(() => {
    wrp = mount(Snackbar, {
      localVue,
      store,
    });
  });

  it('Snackbar is the component of Vue', () => {
    expect(wrp.isVueInstance()).toBeTruthy();
  });

  it('should commit hide mutations if close is triggered', () => {
    wrp.vm.close();
    expect(mutations.hide).toHaveBeenCalled();
  });

  it('should commit hide mutations if snackbar computed is assigned', () => {
    wrp.vm.snackbar = 'test';
    expect(mutations.hide).toHaveBeenCalled();
  });
});
