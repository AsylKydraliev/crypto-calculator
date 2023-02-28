<template>
  <div class="form-group">
    <label :for="id">{{ label }}</label>
    <select
        v-model="selectedOption"
        :id="id"
        class="form-select"
        aria-label="Default select example"
        @change="handleChange"
    >
      <option
          v-for="option in options"
          v-show="!option.disabled"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: 'select-id'
    },
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: [String, Number],
      default: ''
    }
  },
  setup(props, { emit }) {
    const selectedOption = ref(props.value);

    const handleChange = (event) => {
      const value = event.target.value;
      selectedOption.value = value;
      emit('update:value', value);
    }

    return {
      selectedOption,
      handleChange
    };
  }
};
</script>
