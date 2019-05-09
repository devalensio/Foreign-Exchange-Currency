<template lang="pug">
  v-layout(row wrap)
    v-flex(xs10 sm10)
      v-card.shadow-box.left-section(flat)
        v-container
          .mb-3
            v-layout(row wrap)
              v-flex(xs4 sm4)
                h2 {{ currency }}
              v-flex.text-xs-right(x8 sm8)
                h2 {{ rate * amount | currency }}
          v-layout(row wrap)
            v-flex(xs12 sm12)
              h3 {{ currency }} - {{ name }}
            v-flex(xs12 sm12)
              h3 1 USD = {{ currency }} {{ rate | currency }}
    v-flex(xs2 sm2)
      v-card.shadow-box.right-section.text-xs-center(flat @click="deleteItem(index)")
        v-icon(medium) delete_forever
</template>

<script>
export default {
  props: {
    currency: String,
    name: String,
    rate: Number,
    index: Number,
    amount: Number,
  },
  methods: {
    deleteItem(index) {
      this.$emit('remove', index);
    },
  },
};
</script>

<style lang="stylus">
  .right-section
    cursor: pointer
    &:hover
      background-color: #ff5252
    .v-icon
      width: 100%
      &:hover
        color: white
</style>
