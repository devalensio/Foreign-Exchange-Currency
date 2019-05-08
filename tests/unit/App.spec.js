import { createLocalVue, shallowMount } from '@vue/test-utils';
import App from '@/App.vue';
import Vuetify from 'vuetify';
import Navbar from '@/components/Navbar.vue';

describe('App.vue', () => {
  let wrp;
  const localVue = createLocalVue();
  localVue.use(Vuetify);

  beforeEach(() => {
    wrp = shallowMount(App, {
      localVue,
    });
  });

  it('App is the component of Vue', () => {
    expect(wrp.isVueInstance()).toBeTruthy();
  });

  it('should render Navbar  ', () => {
    wrp.find(Navbar).exists();
  });
});
