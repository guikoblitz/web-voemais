<template>
  <q-dialog
    v-model="abrirLogin"
    class="row items-center"
    persistent
    color="warning"
  >
    <q-card style="min-width: 500px" class="background-color-modal">
      <q-card-section
        class="row q-pa-sm"
        style="display: flex; justify-content: space-between"
      >
        <div style="height: 34px; width: 34px"></div>
        <div class="text-h6 text-center">
          <span class="text-weight-bold" style="color: black">Login</span>
        </div>
        <q-btn
          style="height: 34px; width: 34px"
          icon="close"
          color="negative"
          flat
          round
          dense
          @click="fecharModal()"
        />
      </q-card-section>
      <q-separator color="black" />
      <q-card-section>
        <q-input
          dense
          outlined
          hide-bottom-space
          label="Login"
          v-model="login"
          ref="login"
        />
        <q-input
          class="q-pt-sm"
          type="password"
          dense
          outlined
          hide-bottom-space
          label="Senha"
          v-model="password"
          ref="password"
        />
      </q-card-section>
      <q-separator color="black" />
      <q-card-actions class="q-pb-sm q-pr-sm q-pt-sm float-right">
        <div class="row">
          <div class="q-pr-sm">
            <q-btn
              color="red-12"
              dense
              icon="undo"
              label="Cancelar"
              @click="fecharModal()"
            />
          </div>
          <div>
            <q-btn
              color="light-green-8"
              dense
              icon="done"
              label="Confirmar"
              @click="confirmar()"
            />
          </div>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  login = '';
  password = '';

  @Prop()
  readonly abrirLogin: boolean;

  @Emit('fecharModal')
  fecharModal(): boolean {
    return false;
  }

  @Emit('confirmarLogin')
  confirmarLogin(isLogado: boolean): boolean {
    return isLogado;
  }

  confirmar(): void {
    this.fecharModal();
    this.confirmarLogin(true);
  }
}
</script>

<style>
.background-color-modal {
  background-color: #e3f2fd;
}
</style>
