import store from '@/store';
import snackbar from '@/modules/snackbar';

describe('store.vue', () => {
  let wrp;

  it('store is the component of Vue', () => {
    expect(store).toBeTruthy();
  });

  it('should render snackbar', () => {
    expect(snackbar).toBeTruthy();
  });
});
