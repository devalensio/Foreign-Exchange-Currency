<template lang="pug">
  v-snackbar(
    v-model="snackbar"
    :color="snackbarColor"
  ) {{ snackbarMessage }}
    v-btn(
      color="white"
      flat
      @click="close"
    ) Close
</template>

<script>
export default {
  computed: {
    snackbar: {
      get() {
        return this.$store.state.snackbar.show;
      },
      set() {
        this.close();
      },
    },
    snackbarColor() {
      return this.$store.state.snackbar.color;
    },
    snackbarMessage() {
      return this.$store.state.snackbar.message;
    },
  },
  methods: {
    close() {
      this.$store.commit('snackbar/hide');
    },
  },
};
</script>
