import { createLocalVue, shallowMount } from '@vue/test-utils';
import * as service from '@/service';
import Home from '@/views/Home.vue';
import sinon from 'sinon';
import Vuetify from 'vuetify';
import Vuex from 'vuex';

describe('Home.vue', () => {
  let wrp;
  let sandbox;

  const localVue = createLocalVue();

  localVue.use(Vuetify);
  localVue.use(Vuex);

  const mutations = {
    show: jest.fn(),
    hide: jest.fn(),
  };

  const store = new Vuex.Store({
    modules: {
      snackbar: {
        namespaced: true,
        state: {},
        mutations,
      },
    },
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    wrp = shallowMount(Home, {
      localVue,
      store,
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('Home is the component of Vue', () => {
    expect(wrp.isVueInstance()).toBeTruthy();
  });

  it('should assign currencies and currencyOptions once getCurrencyService return the data', async () => {
    const mockData = {
      data: {
        rates: {
          AUD: 1.4305741584,
          EUR: 0.8929368694,
          GBP: 0.7631931422,
          SGD: 1.3619889305,
          IDR: 14292.4993302973,
          RUB: 65.1897875379,
          SEK: 9.5959650062,
        },
      },
    };
    sandbox.stub(service, 'getCurrencyService').returns(mockData);
    await wrp.vm.getCurrency();
    expect(wrp.vm.currencyOptions).toEqual([
      {
        currency: "AUD",
        rates: 1.4305741584
      }, 
      {
        currency: "RUB",
        rates: 65.1897875379
      }, 
      {
        currency: "SEK",
        rates: 9.5959650062
      }
    ]);
    expect(wrp.vm.currencies).toEqual([
      {
        currency: "EUR",
        rates: 0.8929368694
      }, 
      {
        currency: "GBP",
        rates: 0.7631931422
      }, 
      {
        currency: "SGD",
        rates: 1.3619889305
      }, 
      {
        currency: "IDR",
        rates: 14292.4993302973
      }
    ]);
  });

  it('should return formatted object if formatObject is triggered', () => {
    const rates = {
      AUD: 1.4305741584,
      EUR: 0.8929368694,
      GBP: 0.7631931422,
      IDR: 14292.4993302973,
    };
    const object = wrp.vm.formatObject(rates);
    expect(object).toEqual(
      [
        {
          currency: 'AUD',
          rates: 1.4305741584,
        }, 
        {
          currency: 'EUR',
          rates: 0.8929368694,
        }, 
        {
          currency: 'GBP',
          rates: 0.7631931422,
        }, 
        {
          currency: 'IDR',
          rates: 14292.4993302973,
        },
      ],
    );
  });

  it('should return currency name if showCurrencyName is triggered', () => {
    const name = wrp.vm.showCurrencyName('IDR');
    expect(name).toEqual('Indonesian Rupiah');
  });

  it('should call hideAddButton and showDropDown methods if addCurrency is triggered', () => {
    wrp.setMethods({
      hideAddButton: jest.fn(),
      showDropDown: jest.fn(),
    });
    wrp.vm.addCurrency();
    expect(wrp.vm.hideAddButton).toHaveBeenCalled();
    expect(wrp.vm.showDropDown).toHaveBeenCalled();
  });

  it('should remove currency with given position if removeCurrency is triggered', () => {
    wrp.setData({
      currencies: [
        {
          currency: 'EUR',
          rates: 0.8929368694,
          total: 8.929368694,
        },
        {
          currency: 'GBP',
          rates: 0.7631931422,
          total: 7.631931422,
        },
        {
          currency: 'IDR',
          rates: 14292.4993302973,
          total: 142924.993302973,
        },
      ],
    });
    wrp.vm.removeCurrency(1);
    expect(wrp.vm.currencies).toEqual([
      {
        currency: 'EUR',
        rates: 0.8929368694,
        total: 8.929368694,
      },
      {
        currency: 'IDR',
        rates: 14292.4993302973,
        total: 142924.993302973,
      },
    ]);
  });

  it('should call other methods and assign data if submitCurrency is triggered', () => {
    wrp.vm.newCurrency = {
      currency: 'GBP',
      rates: 0.7631931422,
      total: 7.631931422,
    };

    wrp.setMethods({
      hideDropDown: jest.fn(),
      showAddButton: jest.fn(),
    });
    wrp.setData({
      currencies: [
        {
          currency: 'EUR',
          rates: 0.8929368694,
          total: 8.929368694,
        },
        {
          currency: 'IDR',
          rates: 14292.4993302973,
          total: 142924.993302973,
        },
      ],
    });
    wrp.vm.submitCurrency();
    expect(wrp.vm.hideDropDown).toHaveBeenCalled();
    expect(wrp.vm.showAddButton).toHaveBeenCalled();
    expect(wrp.vm.currencies).toEqual([
      {
        currency: "EUR",
        rates: 0.8929368694,
        total: 8.929368694
      }, 
      {
        currency: "IDR",
        rates: 14292.4993302973,
        total: 142924.993302973
      }, 
      {
        currency: "GBP",
        rates: 0.7631931422,
        total: 7.631931422
      }
    ]);
    expect(wrp.vm.newCurrency).toEqual(null);
  });

  it('should commit the message for the snackbar if submitCurrency is triggered', () => {
    wrp.vm.submitCurrency();
    expect(mutations.show).toHaveBeenCalled();
  });

  it('should assign addButtonVisible to true if showAddButton is trigerred', () => {
    wrp.vm.showAddButton();
    expect(wrp.vm.addButtonVisible).toBe(true);
  });

  it('should assign dropDownVisible to true if showDropDown is trigerred', () => {
    wrp.vm.showDropDown();
    expect(wrp.vm.dropDownVisible).toBe(true);
  });

  it('should assign addButtonVisible to false if hideAddButton is trigerred', () => {
    wrp.vm.hideAddButton();
    expect(wrp.vm.addButtonVisible).toBe(false);
  });

  it('should assign dropDownVisible to false if hideDropDown is trigerred', () => {
    wrp.vm.hideDropDown();
    expect(wrp.vm.dropDownVisible).toBe(false);
  });
});
