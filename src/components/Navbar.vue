<template lang="pug">
  v-toolbar.nav-toolbar(app)
    v-toolbar-title
      span Foreign Exchange
</template>

<style lang="stylus">
  .v-toolbar
    box-shadow: 0 2px 4px 0 rgba(199, 199, 199, 0.5)

  .v-toolbar__content
    padding: 0 35vw

  @media (max-width: 500px)
    .v-toolbar__content
      padding: 0 25vw
</style>
