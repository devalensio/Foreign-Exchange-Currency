<template lang="pug">
  div.test
    v-card.shadow-box(flat)
      v-container(grid-list-sm)
        v-layout(row wrap)
          v-flex(xs12 sm12)
            h3 USD - United States Dollars
          v-flex.text-sm-left(xs8 sm8)
            h2 USD
          v-flex.text-sm-center(xs4 sm4)
            v-text-field(v-model="inputAmount" solo outline placeholder="enter amount")
        v-layout(row wrap)
    v-card.shadow-box(flat)
      v-container.card-list(grid-list-sm v-for="(item, n) in rates" :key="n")
        CurrencyCards(
          :currency="item.currency" :rates="item.rates"
          :name="showCurrencyName(item.currency)" :total="item.total"
          :index="n" @remove="removeCurrency"
        )
      v-container.card-list(grid-list-sm)
        v-layout(row wrap)
          v-flex(xs12 sm12)
            v-card.shadow-box(flat)
              v-container.add-currency-btn.text-sm-center(
                v-if="addButtonVisible" @click="addCurrency()"
              )
                h2 (+) Add More Currencies
              v-container(v-else-if="dropDownVisible")
                v-layout(row wrap)
                  v-flex(xs12 sm9)
                    v-combobox(
                      v-model="newCurrency" :items="items"
                      item-text="currency" placeholder="Insert" solo
                    )
                  v-flex(xs12 sm3)
                    v-btn(@click="submitCurrency" large color="primary") Submit
</template>

<script>
import { getCurrencyService } from '@/service';
import currencyLib from '@/fixtures/currency';
import CurrencyCards from '@/components/CurrencyCards.vue';

export default {
  components: {
    CurrencyCards,
  },
  data() {
    return {
      inputAmount: '10.00',
      items: [], // for the dropdown list
      rates: [], // for the currency-card list
      results: [], // results from the api
      newCurrency: null,
      addButtonVisible: true,
      dropDownVisible: false,
    };
  },
  methods: {
    async getCurrency() {
      const get = await getCurrencyService();

      if (get) {
        const { rates } = get.data;
        const filters = ['IDR', 'EUR', 'GBP'];

        // get the rates from api
        this.results = this.formatObject(rates);
        // get 3 currencies for the home page(IDR, EUR, GBP)
        this.rates = this.results.filter(({ currency }) => filters.includes(currency));
      }
    },
    formatObject(obj) {
      // restructure object into array
      return Object.keys(obj).map(key => ({
        currency: key,
        rates: obj[key],
        total: obj[key] * this.inputAmount,
      }));
    },
    showCurrencyName(currency) {
      // get the name of currency
      return currencyLib[currency];
    },
    addCurrency() {
      // when user click 'add more currency', dropdown show up and add button dissapear
      this.hideAddButton();
      this.showDropDown();
    },
    removeCurrency(val) {
      // remove the current currency on the screen
      this.rates.splice(val, 1);
    },
    submitCurrency() {
      if (!this.newCurrency) {
        const msg = {
          message: 'please choose one currency',
          color: 'error',
        };

        this.$store.commit('snackbar/show', msg);
        return;
      }

      // add currency when user submit the new one
      this.rates.push(this.newCurrency);
      this.newCurrency = null;
      this.hideDropDown();
      this.showAddButton();
    },
    getUniqueValue() {
      // if currency has already been selected, it filters the drop down list
      this.items = this.results.filter(result => this.rates.indexOf(result) === -1);
    },
    showAddButton() {
      this.addButtonVisible = true;
    },
    hideAddButton() {
      this.addButtonVisible = false;
    },
    showDropDown() {
      this.dropDownVisible = true;
    },
    hideDropDown() {
      this.dropDownVisible = false;
    },
  },
  watch: {
    inputAmount(val) {
      // watch if inputAmount changes, and update the value
      const newRates = this.rates.map(rate => ({
        currency: rate.currency,
        rates: rate.rates,
        total: rate.rates * Number(val),
      }));

      Object.assign(this.rates, newRates);
    },
    rates() {
      this.getUniqueValue();
    },
  },
  created() {
    this.getCurrency();
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

  .add-currency-btn
    cursor: pointer
    &:hover
      transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)
      background-color: #1976d2
      color: white

  .shadow-box .v-icon
    line-height: 18vh
    vertical-align: center

  .v-text-field__details
    display: none

  @media (max-width: 500px)
    .left-section
    .right-section
      min-height: 25vh

    .shadow-box .v-icon
      line-height: 25vh
      vertical-align: center
</style>
