<template lang="pug">
  div
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
      v-container.card-list(grid-list-sm v-for="(item, n) in currencies" :key="n")
        CurrencyCards(
          :currency="item.currency" :rates="item.rates"
          :name="showCurrencyName(item.currency)" :amount="Number(inputAmount)"
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
                      v-model="newCurrency" :items="currencyOptions"
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
      currencies: [], // for the currency-card list
      currencyOptions: [], // currencyOptions from the api
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
        const filters = ['IDR', 'EUR', 'GBP', 'SGD'];
        const fmtRates = this.formatObject(rates);

        // get 3 currencies for the home page(IDR, EUR, GBP, SGD)
        this.currencies = fmtRates.filter(({ currency }) => filters.includes(currency));
        // get the dropdown list without the 4 currencies from the home page
        this.currencyOptions = fmtRates.filter(item => this.currencies.indexOf(item) === -1);
      }
    },
    formatObject(obj) {
      // restructure object into array
      return Object.keys(obj).map(key => ({
        currency: key,
        rates: obj[key],
      }));
    },
    showCurrencyName(currency) {
      // get the name of currency
      return currencyLib[currency];
    },
    addCurrency() {
      // when user click 'add more currency', dropdown show up and add button disappear
      this.hideAddButton();
      this.showDropDown();
    },
    removeCurrency(val) {
      // remove the current currency on the screen
      this.currencyOptions.push(this.currencies[val]);
      this.currencies.splice(val, 1);
    },
    submitCurrency() {
      // if users submit nothing, the alert pops up
      if (!this.newCurrency) {
        const msg = {
          message: 'Please choose one currency',
          color: 'warning',
        };

        this.$store.commit('snackbar/show', msg);
        return;
      }

      const position = this.currencyOptions.indexOf(this.newCurrency);

      // add currency when user submit the new one
      this.currencies.push(this.newCurrency);
      // after user submit the new currency, it splices
      this.currencyOptions.splice(position, 1);
      // reset the text field to null
      this.newCurrency = null;

      this.hideDropDown();
      this.showAddButton();
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
    min-height: 150px

  .add-currency-btn
    cursor: pointer
    &:hover
      transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)
      background-color: #1976d2
      color: white

  .shadow-box .v-icon
    line-height: 150px
    vertical-align: center

  .v-text-field__details
    display: none
</style>
