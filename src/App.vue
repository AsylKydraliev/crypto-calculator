<template>
  <div>
    <crypto-calculator />
  </div>
</template>

<script>
import CryptoCalculator from "@/views/CryptoCalculator.vue";

export default {
  name: 'App',
  components: {
    CryptoCalculator,
  }
}
</script>

<style>
#app {
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
