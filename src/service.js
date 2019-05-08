import axios from 'axios';

export async function getCurrencyService() {
  const url = '/latest/?base=USD';
  try {
    return axios.get(url);
  } catch (error) {
    return error;
  }
}
