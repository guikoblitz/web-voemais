<template>
  <q-page class="background-color-page posicionar-card q-pa-sm">
    <div class="q-pt-lg" style="position: absolute">
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
              @keyup.enter="$event.target.blur()"
            >
              <template v-slot:append>
                <q-icon
                  class="no-shadow"
                  name="close"
                  flat
                  style="cursor: pointer"
                  @click="removerCampoFiltro('name_travel_package')"
                >
                  <q-tooltip
                    anchor="center left"
                    content-style="font-size: 12px"
                    self="center right"
                    :offset="[10, 10]"
                  >
                    <strong>Remover Nome</strong>
                  </q-tooltip>
                </q-icon>
              </template>
            </q-input>
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
                <q-icon
                  name="search"
                  class="cursor-pointer"
                  @click="$refs.file.click()"
                />
              </template>
            </q-input>
            <form :key="updateKeyForm" enctype="multipart/form-data">
              <input
                ref="file"
                type="file"
                style="display: none"
                @input="buscarImagem()"
              />
            </form>
          </div>
          <div class="col-6 col-md-6">
            <q-input
              dense
              outlined
              hide-bottom-space
              label="Data Inicial"
              readonly
              :value="getDataHoraFormatada(travel_package.start_date)"
              ref="pacoteDataInicial"
            >
              <template v-slot:append>
                <q-icon
                  class="no-shadow"
                  name="close"
                  flat
                  style="cursor: pointer"
                  @click="removerCampoFiltro('start_date')"
                >
                  <q-tooltip
                    anchor="center left"
                    content-style="font-size: 12px"
                    self="center right"
                    :offset="[10, 10]"
                  >
                    <strong>Remover Data Inicial</strong>
                  </q-tooltip>
                </q-icon>
                <q-icon
                  name="event"
                  class="cursor-pointer"
                  @click="limparDataFinal()"
                >
                  <q-popup-proxy
                    @hide="
                      isDataInicialSelecionada
                        ? (isDataInicialFinalizada = true)
                        : ''
                    "
                    transition-show="scale"
                    transition-hide="scale"
                    ref="qDatePacoteDataInicial"
                  >
                    <q-date
                      v-if="!isDataInicialSelecionada"
                      v-model="travel_package.start_date"
                      mask="YYYY-MM-DD HH:mm"
                      @input="isDataInicialSelecionada = true"
                      :options="validarOptionsDataInicial"
                    />
                    <q-time
                      v-if="isDataInicialSelecionada"
                      mask="YYYY-MM-DD HH:mm"
                      v-model="travel_package.start_date"
                      format24h
                      :options="validarOptionsHoraInicial"
                      @input="
                        isDataInicialSelecionada = false;
                        isDataInicialFinalizada = true;
                        adequarData(travel_package.start_date, 'dataInicial');
                        hide('qDatePacoteDataInicial');
                      "
                    />
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
              :disable="!isDataInicialFinalizada"
              :value="getDataHoraFormatada(travel_package.end_date)"
              ref="pacoteDataFinal"
            >
              <template v-slot:append>
                <q-icon
                  class="no-shadow"
                  name="close"
                  flat
                  style="cursor: pointer"
                  @click="removerCampoFiltro('end_date')"
                >
                  <q-tooltip
                    anchor="center left"
                    content-style="font-size: 12px"
                    self="center right"
                    :offset="[10, 10]"
                  >
                    <strong>Remover Data Final</strong>
                  </q-tooltip>
                </q-icon>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                    ref="qDatePacoteDataFinal"
                  >
                    <q-date
                      v-if="!isDataFinalSelecionada"
                      v-model="travel_package.end_date"
                      mask="YYYY-MM-DD HH:mm"
                      @input="isDataFinalSelecionada = true"
                      :options="validarOptionsDataFinal"
                    />
                    <q-time
                      v-if="isDataFinalSelecionada"
                      mask="YYYY-MM-DD HH:mm"
                      v-model="travel_package.end_date"
                      format24h
                      :options="validarOptionsHoraFinal"
                      @input="
                        isDataFinalSelecionada = false;
                        adequarData(travel_package.end_date, 'dataFinal');
                        hide('qDatePacoteDataFinal');
                      "
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-6 col-md-6">
            <q-select
              ref="pacotePaisOrigem"
              dense
              outlined
              label="País de Origem"
              :options="countries"
              option-label="name_country"
              option-value="id_country"
              transition-show="flip-up"
              transition-hide="flip-down"
              hide-bottom-space
              v-model="travel_package.id_country_origin"
              map-options
              emit-value
            />
          </div>
          <div class="col-6 col-md-6">
            <q-select
              ref="pacotePaisDestino"
              dense
              outlined
              label="País de Destino"
              :options="countries"
              option-label="name_country"
              option-value="id_country"
              transition-show="flip-up"
              transition-hide="flip-down"
              hide-bottom-space
              v-model="travel_package.id_country_destination"
              map-options
              emit-value
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
              option-label="travel_package_type"
              option-value="id_travel_package_type"
              v-model="travel_package.id_travel_package_type"
              map-options
              emit-value
            />
          </div>
          <div class="col-3 col-md-3">
            <currency-input
              v-model="travel_package.unit_price"
              :options="currencyOptions"
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
        <div class="row justify-between q-pt-sm">
          <div>
            <div class="q-pr-sm">
              <q-btn
                icon="close"
                class="q-px-xs"
                color="yellow-9"
                text-color="white"
                label="Limpar"
                @click="limpar()"
              />
            </div>
          </div>
          <div class="row justify-end">
            <div class="q-pr-sm">
              <!-- TODO Será implementado quando virar modal -->
              <!-- <q-btn
                icon="close"
                class="q-px-xs"
                color="red"
                text-color="white"
                label="Cancelar"
              /> -->
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
      </div>
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
