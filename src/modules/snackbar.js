const snackbar = {
  namespaced: true,
  state: {
    show: false,
    message: '',
    color: '',
  },
  mutations: {
    show: (state, payload) => {
      state.show = true;
      state.message = payload.message;
      state.color = payload.color;
    },
    hide: (state) => {
      state.show = false;
      state.color = 'success';
    },
  },
};

export default snackbar;
