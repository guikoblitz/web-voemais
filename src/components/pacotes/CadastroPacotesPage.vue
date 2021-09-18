<template>
  <!-- <q-page class="row items-center justify-evenly" color="warning"> -->
  <q-page class="background-color-page posicionar-card q-pa-sm">
    <div class="q-pt-lg" style="position: absolute">
      <!-- <q-card class="background-color-card" style="width: 60vw"> -->
      <div style="width: 60vw" class="q-pa-sm">
        <div class="row q-col-gutter-sm">
          <div class="col-6 col-md-6">
            <q-input
              dense
              outlined
              hide-bottom-space
              label="Nome"
              ref="pacoteNome"
              v-model="travel_package.name_travel_package"
            />
          </div>
          <div class="col-6 col-md-6">
            <q-input
              dense
              readonly
              outlined
              hide-bottom-space
              label="Imagem"
              ref="pacoteImagem"
              v-model="travel_package.image"
            >
              <template v-slot:append>
                <q-icon name="search" class="cursor-pointer" />
              </template>
            </q-input>
          </div>
          <div class="col-6 col-md-6">
            <q-input
              dense
              outlined
              hide-bottom-space
              label="Data Inicial"
              readonly
              value="****"
              ref="pacoteDataInicial"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                    ref="qDatePacoteDataInicial"
                  >
                    <q-date minimal @input="hide('qDatePacoteDataInicial')" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-6 col-md-6">
            <q-input
              dense
              outlined
              hide-bottom-space
              label="Data Final"
              readonly
              value="****"
              ref="pacoteDataFinal"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                    ref="qDatePacoteDataFinal"
                  >
                    <q-date minimal @input="hide('qDatePacoteDataFinal')" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-6 col-md-6">
            <q-input
              dense
              outlined
              hide-bottom-space
              label="País de Origem"
              ref="pacotePaisOrigem"
            />
          </div>
          <div class="col-6 col-md-6">
            <q-input
              dense
              outlined
              hide-bottom-space
              label="País de Destino"
              ref="pacotePaisDestino"
            />
          </div>
          <div class="col-6 col-md-6">
            <q-select
              ref="tipoPacote"
              dense
              outlined
              label="Tipo de Pacote"
              :options="travel_package_types"
              transition-show="flip-up"
              transition-hide="flip-down"
              hide-bottom-space
              v-model="travel_package.id_travel_package_type"
              map-options
              emit-value
            />
          </div>
          <div class="col-3 col-md-3">
            <q-input
              dense
              outlined
              hide-bottom-space
              label="Valor do Pacote"
              onkeypress="return event.charCode >= 46 && event.charCode <= 57"
              v-model.number="travel_package.unit_price"
              ref="pacoteValor"
            />
          </div>
          <div class="col-3 col-md-3 text-center">
            <q-toggle v-model="travel_package.promotion" ref="pacotePromocao"
              >Promoção</q-toggle
            >
          </div>
          <div class="col-12 col-md-12">
            <q-input
              dense
              outlined
              hide-bottom-space
              label="Descrição"
              type="textarea"
              rows="3"
              v-model="travel_package.description"
              ref="pacoteDescricao"
            />
          </div>
        </div>
        <div class="row justify-end q-pt-sm">
          <div class="q-pr-sm">
            <q-btn
              icon="close"
              class="q-px-xs"
              color="red"
              text-color="white"
              label="Cancelar"
            />
          </div>
          <div>
            <q-btn
              icon="done"
              class="q-px-xs"
              color="green"
              text-color="white"
              label="Confirmar"
              @click="confirmar()"
            />
          </div>
        </div>
      </div>
      <!-- </q-card> -->
    </div>
  </q-page>
</template>

<script lang="ts" src="./CadastroPacotesPage.ts"></script>

<style>
.background-color-page {
  background-color: #e3f2fd;
}

.background-color-card {
  background-color: #f5f5f5;
}

.posicionar-card {
  display: flex;
  justify-content: center;
}
</style>
