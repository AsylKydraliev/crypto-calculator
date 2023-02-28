<template>
  <div>
    <div class="card">
      <div class="card-body px-5">
        <h5 class="card-title text-center mb-5">Crypto calculator</h5>
        <div>
          <div class="row gap-2 mx-0">
            <input
                v-model="amount"
                type="number"
                class="col form-control"
                placeholder="Amount"
                @input="onConversion"
            />
            <input
                v-model="result"
                type="number"
                class="col form-control"
                placeholder="Result"
                readonly
                disabled
            />
          </div>
          <base-select :options="currencies" @update:value="onSelect" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { getConversionRate } from "@/services/ConversionService";
import { conversion } from "@/handlers/Conversion";
import BaseSelect from "@/components/BaseSelect.vue";

export default {
  name: 'CryptoCalculator',
  components: {
    BaseSelect,
  },
  setup() {
    const currencies = ref([
      { value: '', text: 'Select currency', disabled: true },
      { value: 'BTC / USD', text: 'BTC / USD' },
      { value: 'BTC / EUR', text: 'BTC / EUR' },
      { value: 'ETH / USD', text: 'ETH / USD' },
      { value: 'ETH / EUR', text: 'ETH / EUR' },
    ]);

    const amount = ref('');
    const result = ref('');
    const selectedCurrency = ref('');
    const rate = ref(null);

    const fetchConversionRate = async (body) => {
      try {
        rate.value = await getConversionRate(body);
      } catch (e) {
        console.error('Something went wrong!', e.message);
      }
    }

    const onSelect = async (value) => {
      const [currency_from, , currency_to] = value.split(' ');
      const body = { currency_from, currency_to };

      await fetchConversionRate(body);
      onConversion();
    }

    const onConversion = () => {
      if (!rate.value || selectedCurrency.value) {
        return;
      }

      const conversionRate = rate.value.data.conversion_rate;
      result.value = conversion(conversionRate, amount.value);
    }

    return {
      currencies,
      amount,
      result,
      selectedCurrency,
      onSelect,
      fetchConversionRate,
      onConversion,
    }
  }
}
</script>