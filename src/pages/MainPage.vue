<template>
  <q-page class="background-color-page q-pa-md">
    <div class="row q-col-gutter-sm">
      <div
        v-for="(travelPackage, index) in travel_packages"
        :key="travelPackage.id_travel_pack"
        :class="index === 0 ? 'col-12' : 'col-6'"
      >
        <div v-if="index === 0">
          <q-img
            :src="getImgUrl(travelPackage.image)"
            class="image-banner"
            :ratio="16 / 9"
            position="50% 40%"
          >
            <div
              class="absolute-top-right row"
              style="background: none !important"
            >
              <div class="q-pr-xs">
                <q-btn
                  dense
                  round
                  color="yellow-8"
                  icon="edit"
                  size="10px"
                  @click="editTravelPackage(travelPackage)"
                />
              </div>
              <div>
                <q-btn
                  dense
                  round
                  color="red"
                  icon="delete"
                  size="10px"
                  @click="askDeletePackage(travelPackage)"
                />
              </div>
            </div>
            <div
              class="absolute-bottom text-subtitle1 text-center image-subtitles"
              @click="visualizeTravelPackage(travelPackage)"
              style="cursor: pointer"
            >
              {{
                travelPackage.name_travel_package +
                  ' - ' +
                  formatarDinheiro(travelPackage.unit_price)
              }}
            </div>
          </q-img>
        </div>
        <div v-else>
          <q-img
            :src="getImgUrl(travelPackage.image)"
            :alt="travelPackage.image"
            class="image-promotions"
            img-class="quadros-promocionais"
            :ratio="16 / 9"
          >
            <div
              class="absolute-top-right row"
              style="background: none !important"
            >
              <div class="q-pr-xs">
                <q-btn
                  dense
                  round
                  color="yellow-8"
                  icon="edit"
                  size="10px"
                  @click="editTravelPackage(travelPackage)"
                />
              </div>
              <div>
                <q-btn
                  dense
                  round
                  color="red"
                  icon="delete"
                  size="10px"
                  @click="confirmarExcluirPacote(travelPackage)"
                />
              </div>
            </div>
            <div
              class="absolute-bottom text-subtitle1 text-center image-subtitles"
              @click="visualizeTravelPackage(travelPackage)"
              style="cursor: pointer"
            >
              {{
                travelPackage.name_travel_package +
                  ' - ' +
                  formatarDinheiro(travelPackage.unit_price)
              }}
            </div>
          </q-img>
        </div>
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn @click="createTravelPackage()" round icon="add" color="blue-6">
        <q-tooltip
          anchor="top middle"
          content-style="font-size: 12px"
          self="center left"
        >
          <span>Adicionar Pacote de Viagem</span>
        </q-tooltip>
      </q-btn>
    </q-page-sticky>
    <CadastroPacotesModal
      v-if="abrirCadastroPacotes"
      :modal_title="modal_title"
      :editPackage="editPackage"
      :received_travel_package="selected_travel_package"
      :visualizePackage="visualizePackage"
      :abrirCadastroPacotes="abrirCadastroPacotes"
      @closeModal="abrirCadastroPacotes = $event"
      @callPackageUpdates="callPackageUpdates($event)"
    />
  </q-page>
</template>

<script src="./MainPage.ts" />

<style>
.background-color-page {
  background-color: #e3f2fd;
}

.image-banner {
  width: 100%;
  height: 350px;
  border-radius: 18px;
}

.image-promotions {
  width: 100%;
  height: 300px;
}

.quadros-promocionais {
  width: 100%;
  height: 300px;
  border-radius: 18px;
}

.image-subtitles {
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
}
</style>
