<template>
    <q-input
        ref="inputRef"
        dense
        outlined
        type="text"
        label="Valor do Pacote (R$)"
        :value="formattedValue"
        @keyup.enter="$event.target.blur()"
        @input="parent.resetarErroCampo(fieldName)"
        :error="parent.formValidator ? parent.formValidator.isError(fieldName) : null"
        :error-message="parent.formValidator ? parent.formValidator.getError(fieldName) : null"
    />
</template>

<script>
import { useCurrencyInput } from 'vue-currency-input';

export default {
    name: 'CurrencyInput',
    props: {
        value: Number, // Vue 2: value
        options: Object,
        fieldName: String,
        parent: Object
    },
    setup(props) {
        const { formattedValue, inputRef } = useCurrencyInput(props.options);

        return { inputRef, formattedValue };
    }
};
</script>
