import axios from "axios";

const CONVERSION_RATE_URL = 'https://dev-api.finteria.com/api/calculator/exchange/calculate';

export async function getConversionRate(body) {
  const response = await axios.post(CONVERSION_RATE_URL, body);
  return response.data;
}