<template>
  <q-input
    ref="inputRef"
    dense
    outlined
    type="text"
    label="Valor do Pacote (R$)"
    :value="formattedValue"
    @keyup.enter="$event.target.blur()"
  />
</template>

<script>
import { useCurrencyInput } from 'vue-currency-input';

export default {
  name: 'CurrencyInput',
  props: {
    value: Number, // Vue 2: value
    options: Object
  },
  setup(props) {
    const { formattedValue, inputRef } = useCurrencyInput(props.options);

    return { inputRef, formattedValue };
  }
};
</script>
