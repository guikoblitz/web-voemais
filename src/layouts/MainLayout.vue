<template>
  <!-- <q-layout view="lHh Lpr lFf"> -->
  <q-layout view="hHh LpR lfr">
    <q-header elevated>
      <q-toolbar>
        <div class="q-pa-none q-ma-none" v-if="!mini" style="width: 200px">
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
        </div>
        <q-separator v-if="!mini" vertical inset class="separador" />
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="mini = !mini"
        />

        <q-toolbar-title> Voe+ </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawer"
      show-if-above
      bordered
      :mini="mini"
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
            @click="teste('Inicio')"
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
            ref="menuConfiguracoes"
            group="menuLateral"
            class="esconder-seta-expansion-item"
            hide-dropdown-icon
            label="Cadastro"
            icon="settings"
            @click="teste('Cadastro')"
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
            ref="menuConfiguracoes"
            group="menuLateral"
            class="esconder-seta-expansion-item"
            hide-dropdown-icon
            label="Pacotes"
            icon="flight_takeoff"
            @click="teste('Pacotes')"
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
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class MainLayout extends Vue {
  leftDrawer = true;
  mini = true;

  teste(tab: string): void {
    console.log(tab);
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
