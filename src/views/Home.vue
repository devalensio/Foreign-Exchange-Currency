<template lang="pug">
  div()
    v-card.shadow-box(flat)
      v-container(grid-list-sm)
        v-layout(row wrap)
          v-flex(xs12 sm12)
            h3 USD - United States Dollars
          v-flex.text-sm-center(xs6 sm6)
            h2 USD
          v-flex.text-sm-center(xs6 sm6)
            h2 10.00
        v-layout(row wrap)
    v-card.shadow-box(flat)
      v-container.card-list(grid-list-sm)
        v-layout(row wrap)
          v-flex(xs10 sm10)
            v-card.shadow-box.left-section(flat)
              v-container
                .mb-3
                  v-layout(row wrap)
                    v-flex(xs4 sm4)
                      h2 IDR
                    v-flex.text-sm-right(x8 sm8)
                      h2 144,104,50
                v-layout(row wrap)
                  v-flex(xs12 sm12)
                    h3 IDR - Indonesian Rupiah
                  v-flex(xs12 sm12)
                    h3 1 USD = IDR 14,104,50
          v-flex(xs2 sm2)
            v-card.shadow-box.right-section.text-xs-center(flat)
              v-icon(medium) delete_forever
      v-container.card-list(grid-list-sm)
        v-layout(row wrap)
          v-flex(xs10 sm10)
            v-card.shadow-box.left-section(flat)
              v-container
                .mb-3
                  v-layout(row wrap)
                    v-flex(xs4 sm4)
                      h2 EUR
                    v-flex.text-sm-right(x8 sm8)
                      h2 8,5694
                v-layout(row wrap)
                  v-flex(xs12 sm12)
                    h3 EUR - EURO
                  v-flex(xs12 sm12)
                    h3 1 USD = IDR 14,104,50
          v-flex(xs2 sm2)
            v-card.shadow-box.right-section.text-xs-center(flat)
              v-icon(medium) delete_forever
      v-container.card-list(grid-list-sm)
        v-layout(row wrap)
          v-flex(xs10 sm10)
            v-card.shadow-box.left-section(flat)
              v-container
                .mb-3
                  v-layout(row wrap)
                    v-flex(xs4 sm4)
                      h2 GBP
                    v-flex.text-sm-right(x8 sm8)
                      h2 142,123
                v-layout(row wrap)
                  v-flex(xs12 sm12)
                    h3 GBP - British Pound
                  v-flex(xs12 sm12)
                    h3 1 USD = IDR 14,104,50
          v-flex(xs2 sm2)
            v-card.shadow-box.right-section.text-xs-center(flat)
              v-icon(medium) delete_forever
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue';

export default {
  components: {
    HelloWorld,
  },
};
</script>

<style lang="stylus">
  .shadow-box
    background-color: white
    box-shadow: -10px 10px 20px 0 rgba(30, 30, 30, 0.05)
    margin-bottom: 8px

  .left-section
  .right-section
    min-height: 18vh

  .shadow-box .v-icon
    line-height: 18vh
    vertical-align: center

  @media (max-width: 500px)
    .left-section
    .right-section
      min-height: 25vh

    .shadow-box .v-icon
      line-height: 25vh
      vertical-align: center
</style>
