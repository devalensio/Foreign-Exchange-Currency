<template lang="pug">
  v-app
    Navbar
    v-content
      v-container.app-container
        router-view
      Snackbar
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Snackbar from '@/components/Snackbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Snackbar,
  },
};
</script>

<style lang="stylus">
  #app
    background: rgb(232, 232, 232)

  .container.app-container
    padding: 0rem 0px 1.6rem
    overflow-x: hidden
    font-family: 'Avenir'
    flex: 1 1 0%
    max-width: 35rem
    margin: 0px auto
    font-weight: normal
</style>
