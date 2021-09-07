<template>
  <q-page class="row items-center justify-evenly" color="warning">
    <q-input outlined color="primary" v-model="teste" />
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class PacotesPage extends Vue {
  teste = '';
}
</script>
