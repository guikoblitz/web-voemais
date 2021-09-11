<template>
  <q-page class="background-color-page q-pa-lg">
    <div>
      <q-img
        src="../assets/balneario-camboriu-1.jpg"
        class="image-carrosel"
        :ratio="16 / 9"
        position="50% 40%"
      >
        <div
          class="absolute-bottom text-subtitle1 text-center"
          style="cursor: pointer"
        >
          Balneário Camboriú
        </div>
      </q-img>
    </div>
    <div class="row q-col-gutter-sm q-pt-sm">
      <div class="col-6">
        <div>
          <q-img
            src="../assets/banner-rio.jpg"
            class="image-carrosel"
            img-class="quadros-promocionais"
            :ratio="16 / 9"
          >
            <div
              class="absolute-bottom text-subtitle1 text-center image-subtitles"
              style="cursor: pointer"
            >
              Rio de Janeiro
            </div>
          </q-img>
        </div>
      </div>
      <div class="col-6">
        <div>
          <q-img
            src="../assets/curitiba-1.jpg"
            class="image-carrosel"
            img-class="quadros-promocionais"
            position="50% 30%"
            :ratio="16 / 9"
          >
            <div
              class="absolute-bottom text-subtitle1 text-center image-subtitles"
              style="cursor: pointer"
            >
              Curitiba
            </div>
          </q-img>
        </div>
      </div>
      <div class="col-6">
        <div>
          <q-img
            src="../assets/sao-paulo-1.jpg"
            class="image-carrosel"
            img-class="quadros-promocionais"
            position="50% 35%"
            :ratio="16 / 9"
          >
            <div
              class="absolute-bottom text-subtitle1 text-center image-subtitles"
              style="cursor: pointer"
            >
              São Paulo
            </div>
          </q-img>
        </div>
      </div>
      <div class="col-6">
        <div>
          <q-img
            src="../assets/buenos-aires-1.jpg"
            class="image-carrosel"
            img-class="quadros-promocionais"
            position="50% 45%"
            :ratio="16 / 9"
          >
            <div
              class="absolute-bottom text-subtitle1 text-center image-subtitles"
              style="cursor: pointer"
            >
              Buenos Aires
            </div>
          </q-img>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class MainPage extends Vue {}
</script>

<style>
.background-color-page {
  background-color: #e3f2fd;
}

.image-carrosel {
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
