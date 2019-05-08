import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    snackbar: {
      namespaced: true,
      state: {
        show: false,
        message: '',
        color: 'success',
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
    },
  },
});
