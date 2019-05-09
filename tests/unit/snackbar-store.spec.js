import snackbar from '@/modules/snackbar';

test('show mutation', () => {
  const state = {
    show: false,
    message: '',
    color: '',
  };
  const payload = {
    message: 'Please choose one currency',
    color: 'warning',
  };

  snackbar.mutations.show(state, payload);
  expect(state.show).toBe(true);
  expect(state.message).toBe('Please choose one currency');
  expect(state.color).toBe('warning');
});

test('hide mutation', () => {
  const state = {
    show: true,
    color: '',
  };

  snackbar.mutations.hide(state);
  expect(state.show).toBe(false);
  expect(state.color).toBe('success');
});
