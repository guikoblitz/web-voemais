<template>
  <q-dialog
    v-model="abrirCadastroPacotes"
    class="row items-center"
    persistent
    color="warning"
  >
    <q-card style="min-width: 700px" class="background-color-modal">
      <q-card-section
        class="row q-pa-sm"
        style="display: flex; justify-content: space-between"
      >
        <div class="text-h6 text-center">
          <span class="text-weight-bold" style="color: black">{{
            modal_title
          }}</span>
        </div>
        <q-btn
          style="height: 34px; width: 34px"
          icon="close"
          color="negative"
          flat
          round
          dense
          @click="closeModal()"
        />
      </q-card-section>
      <q-separator color="black" />
      <q-card-section class="q-pa-sm">
        <div class="row q-col-gutter-sm">
          <div
            v-if="travel_package.image"
            style="height: 300px"
            class="col-12 col-md-12"
          >
            <q-img
              :src="getImgUrl(travel_package.image)"
              img-class="quadros-promocionais"
              :ratio="16 / 9"
              style="height: 100%"
            />
          </div>
          <div class="col-6 col-md-6">
            <q-input
              dense
              outlined
              hide-bottom-space
              label="Nome"
              ref="pacoteNome"
              :readonly="visualizePackage"
              v-model="travel_package.name_travel_package"
              @keyup.enter="$event.target.blur()"
              @input="resetarErroCampo('name_travel_package')"
              :error="formValidator.isError('name_travel_package')"
              :error-message="formValidator.getError('name_travel_package')"
            >
              <template v-slot:append>
                <q-icon
                  v-if="!visualizePackage"
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
              :error="formValidator.isError('image')"
              :error-message="formValidator.getError('image')"
            >
              <template v-slot:append>
                <q-icon
                  v-if="!visualizePackage"
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
              :error="formValidator.isError('start_date')"
              :error-message="formValidator.getError('start_date')"
            >
              <template v-slot:append>
                <q-icon
                  v-if="!visualizePackage"
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
                  v-if="!visualizePackage"
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
                        handleDates(travel_package.start_date, 'dataInicial');
                        hide('qDatePacoteDataInicial');
                        resetarErroCampo('start_date');
                      "
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-6 col-md-6">
            <q-tooltip
              v-if="!isDataInicialFinalizada"
              anchor="top middle"
              content-style="font-size: 12px"
              self="center start"
              :offset="[10, 10]"
            >
              <strong
                >Selecione uma Data Inicial para habilitar a edição</strong
              >
            </q-tooltip>
            <q-input
              dense
              outlined
              hide-bottom-space
              label="Data Final"
              readonly
              :disable="!isDataInicialFinalizada && !visualizePackage"
              :value="getDataHoraFormatada(travel_package.end_date)"
              ref="pacoteDataFinal"
              :error="formValidator.isError('end_date')"
              :error-message="formValidator.getError('end_date')"
            >
              <template v-slot:append>
                <q-icon
                  v-if="!visualizePackage"
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
                <q-icon
                  v-if="!visualizePackage"
                  name="event"
                  class="cursor-pointer"
                >
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
                        handleDates(travel_package.end_date, 'dataFinal');
                        hide('qDatePacoteDataFinal');
                        resetarErroCampo('end_date');
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
              :readonly="visualizePackage"
              :hide-dropdown-icon="visualizePackage"
              :options="countries"
              option-label="name_country"
              option-value="id_country"
              transition-show="flip-up"
              transition-hide="flip-down"
              hide-bottom-space
              v-model="travel_package.id_country_origin"
              map-options
              emit-value
              :error="formValidator.isError('id_country_origin')"
              :error-message="formValidator.getError('id_country_origin')"
              @input="resetarErroCampo('id_country_origin')"
            />
          </div>
          <div class="col-6 col-md-6">
            <q-select
              ref="pacotePaisDestino"
              dense
              outlined
              label="País de Destino"
              :readonly="visualizePackage"
              :hide-dropdown-icon="visualizePackage"
              :options="countries"
              option-label="name_country"
              option-value="id_country"
              transition-show="flip-up"
              transition-hide="flip-down"
              hide-bottom-space
              v-model="travel_package.id_country_destination"
              map-options
              emit-value
              :error="formValidator.isError('id_country_destination')"
              :error-message="formValidator.getError('id_country_destination')"
              @input="resetarErroCampo('id_country_destination')"
            />
          </div>
          <div class="col-6 col-md-6">
            <q-select
              ref="tipoPacote"
              dense
              outlined
              label="Tipo de Pacote"
              :readonly="visualizePackage"
              :hide-dropdown-icon="visualizePackage"
              :options="travel_package_types"
              transition-show="flip-up"
              transition-hide="flip-down"
              hide-bottom-space
              option-label="travel_package_type"
              option-value="id_travel_package_type"
              v-model="travel_package.id_travel_package_type"
              map-options
              emit-value
              :error="formValidator.isError('id_travel_package_type')"
              :error-message="formValidator.getError('id_travel_package_type')"
              @input="resetarErroCampo('id_travel_package_type')"
            />
          </div>
          <div class="col-3 col-md-3">
            <q-input
              v-if="visualizePackage"
              dense
              outlined
              hide-bottom-space
              label="Valor do Pacote (R$)"
              ref="pacoteValorReadonly"
              :readonly="visualizePackage"
              :value="formatarDinheiro(travel_package.unit_price)"
            />
            <currency-input
              v-else
              :readonly="visualizePackage"
              v-model="travel_package.unit_price"
              :key="updateKeyInput"
              :options="currencyOptions"
              :fieldName="'unit_price'"
              :parent="this"
            />
          </div>
          <div class="col-3 col-md-3 text-center">
            <q-toggle
              :disable="visualizePackage"
              v-model="travel_package.promotion"
              ref="pacotePromocao"
              >Promoção</q-toggle
            >
          </div>
          <div class="col-12 col-md-12">
            <q-input
              dense
              outlined
              hide-bottom-space
              label="Descrição"
              counter
              maxlength="250"
              :readonly="visualizePackage"
              type="textarea"
              rows="3"
              v-model="travel_package.description"
              ref="pacoteDescricao"
              :error="formValidator.isError('description')"
              :error-message="formValidator.getError('description')"
              @input="resetarErroCampo('description')"
            />
          </div>
        </div>
      </q-card-section>
      <q-separator color="black" />
      <q-card-actions
        class="q-pb-sm q-pr-sm q-pt-sm "
        style="display: flex; justify-content: space-between"
      >
        <div>
          <div class="q-pr-sm">
            <q-btn
              v-if="!travel_package.id_travel_pack"
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
            <q-btn
              icon="close"
              class="q-px-xs"
              color="red"
              text-color="white"
              :label="visualizePackage ? 'Fechar' : 'Cancelar'"
              @click="closeModal()"
            />
          </div>
          <div>
            <q-btn
              icon="done"
              class="q-px-xs"
              color="green"
              text-color="white"
              :label="visualizePackage ? 'Adquirir' : 'Confirmar'"
              @click="visualizePackage ? adquirir() : confirmar()"
            />
          </div>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script src="./CadastroPacotesModal.ts" />

<style>
.background-color-modal {
  background-color: #e3f2fd;
}

.quadros-promocionais {
  width: 100%;
  height: 300px;
  border-radius: 18px;
}
</style>
