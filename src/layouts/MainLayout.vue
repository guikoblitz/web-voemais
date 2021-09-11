<template>
  <!-- <q-layout view="lHh Lpr lFf"> -->
  <q-layout view="hHh LpR lfr">
    <q-header elevated>
      <q-toolbar>
        <!-- <div class="q-pa-none q-ma-none" v-if="!mini" style="width: 200px">
          <q-item
            class="text-white"
            style="justify-content: center"
            dense
            clickable
          >
            <q-item-section avatar>
              <q-img src="logo_raw.png" />
            </q-item-section>
          </q-item>
        </div> -->
        <!-- <q-separator v-if="!mini" vertical inset class="separador" /> -->
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="mini = !mini"
        />

        <q-toolbar-title> {{ title }} </q-toolbar-title>

        <div class="q-pr-sm q-ma-none">
          <q-btn
            rounded
            outline
            label="Cadastro"
            size="13px"
            color="light-blue-3"
            @click="setRouter('/cadastroPage', 'Cadastro')"
          />
        </div>
        <div class="q-pr-sm q-ma-none">
          <q-btn
            rounded
            outline
            label="Login"
            size="13px"
            color="light-blue-3"
          />
        </div>
        <div class="q-pa-none q-ma-none">
          <q-item
            class="text-white"
            style="justify-content: center"
            dense
            clickable
            @click="setRouter('/', 'Inicio')"
          >
            <q-item-section avatar class="q-pa-none">
              <q-img src="logo_raw.png" />
            </q-item-section>
          </q-item>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawer"
      show-if-above
      bordered
      :mini="mini"
      elevated
      content-class="background-color-drawer"
      class="text-white"
      :width="215"
    >
      <q-list>
        <div>
          <q-expansion-item
            ref="menuInicio"
            group="menuLateral"
            class="esconder-seta-expansion-item"
            hide-dropdown-icon
            label="Início"
            icon="home"
            @click="setRouter('/', 'Inicio')"
          >
          </q-expansion-item>
          <q-tooltip
            v-if="mini"
            anchor="center right"
            self="center left"
            content-style="font-size: 14px"
          >
            <strong>Início</strong>
          </q-tooltip>
        </div>
        <hr
          style="
            border: 0;
            border-top: 1px solid rgba(0, 0, 0, 0.12);
            heigth: 1px;
          "
          class="q-ma-none"
        />
        <div>
          <q-expansion-item
            ref="menuCadastro"
            group="menuLateral"
            class="esconder-seta-expansion-item"
            hide-dropdown-icon
            label="Cadastro"
            icon="settings"
            @click="setRouter('/cadastroPage', 'Cadastro')"
          >
          </q-expansion-item>
          <q-tooltip
            v-if="mini"
            anchor="center right"
            self="center left"
            content-style="font-size: 14px"
          >
            <strong>Cadastro</strong>
          </q-tooltip>
        </div>
        <hr
          style="
            border: 0;
            border-top: 1px solid rgba(0, 0, 0, 0.12);
            heigth: 1px;
          "
          class="q-ma-none"
        />
        <div>
          <q-expansion-item
            ref="menupacotes"
            group="menuLateral"
            class="esconder-seta-expansion-item"
            hide-dropdown-icon
            label="Pacotes"
            icon="flight_takeoff"
            @click="setRouter('/pacotesPage', 'Pacotes')"
          >
          </q-expansion-item>
          <q-tooltip
            v-if="mini"
            anchor="center right"
            self="center left"
            content-style="font-size: 14px"
          >
            <strong>Pacotes</strong>
          </q-tooltip>
        </div>
        <hr
          style="
            border: 0;
            border-top: 1px solid rgba(0, 0, 0, 0.12);
            heigth: 1px;
          "
          class="q-ma-none"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Loading } from 'quasar';
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class MainLayout extends Vue {
  leftDrawer = true;
  mini = true;
  title = 'Início';

  setRouter(path: string, tab: string): void {
    if (this.title !== tab) {
      Loading.show({ message: `Carregando ${tab}...` });
      setTimeout(() => {
        this.title = tab;
        this.mini = true;
        this.$router.push(path).catch(() => {});
        Loading.hide();
      }, 1000);
    } else {
      this.mini = false;
    }
  }
}
</script>

<style>
.esconder-seta-expansion-item .q-expansion-item__toggle-icon {
  display: none;
}

.background-color-drawer {
  background-color: #243665;
}
</style>
