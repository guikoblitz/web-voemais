<template>
    <q-page class="background-color-page q-pa-md">
        <q-resize-observer @resize="handleResize" />
        <div class="q-pb-sm">
            <q-carousel
                class="rounded-borders"
                control-color="primary"
                control-type="regular"
                transition-prev="fade"
                transition-next="fade"
                animated
                padding
                arrows
                v-model="slide"
                infinite
                height="50vh"
                :autoplay="autoplay"
                @mouseenter="autoplay = false"
                @mouseleave="autoplay = true"
            >
                <q-carousel-slide
                    v-for="(travelPackage, index) in promotional_travel_packages"
                    :key="travelPackage.id_travel_pack"
                    :name="index"
                    :img-src="getImgUrl(travelPackage.image)"
                >
                    <div class="absolute-top custom-caption">
                        <div class="text-subtitle2">APROVEITE NOSSAS PROMOÇÕES!</div>
                    </div>
                    <div class="absolute-bottom custom-caption">
                        <div class="text-subtitle1" @click="visualizeTravelPackage(travelPackage)" style="cursor: pointer">
                            {{ travelPackage.name_travel_package + ' - ' + formatarDinheiro(travelPackage.unit_price) }}
                        </div>
                    </div>
                </q-carousel-slide>
            </q-carousel>
        </div>
        <q-separator color="black" />
        <div class="q-py-sm">
            <span class="q-pa-none texto-q-item dark-blue ">ENCONTRE SUA PRÓXIMA VIAGEM</span>
            <div class="row q-col-gutter-sm">
                <div class="col-6 col-md-5">
                    <div class="row">
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
                            v-model="filter.id_travel_package_type"
                            emit-value
                            map-options
                            class="q-pr-xs"
                            style="width: 34%"
                        />
                        <q-select
                            ref="paisOrigem"
                            dense
                            outlined
                            label="País Origem"
                            :options="countries"
                            transition-show="flip-up"
                            transition-hide="flip-down"
                            hide-bottom-space
                            option-label="name_country"
                            option-value="id_country"
                            v-model="filter.id_country_origin"
                            emit-value
                            map-options
                            class="q-px-xs"
                            style="width: 33%"
                        />
                        <q-select
                            ref="paisDestino"
                            dense
                            outlined
                            label="País Destino"
                            :options="countries"
                            transition-show="flip-up"
                            transition-hide="flip-down"
                            hide-bottom-space
                            option-label="name_country"
                            option-value="id_country"
                            v-model="filter.id_country_destination"
                            emit-value
                            map-options
                            class="q-pl-xs"
                            style="width: 33%"
                        />
                    </div>
                </div>
                <div v-if="!showSearchIcon" class="col-6 col-md-6">
                    <div class="row">
                        <q-input
                            dense
                            outlined
                            readonly
                            hide-bottom-space
                            label="Mínimo R$"
                            :value="formatarDinheiro(travelPackageValues.min)"
                            class="q-pr-sm"
                            style="width: 20%"
                        />
                        <div class="q-px-sm" style="width: 60%">
                            <q-range
                                :min="min"
                                :max="max"
                                :step="0.1"
                                :left-label-value="getMinTravelPackageValue()"
                                :right-label-value="getMaxTravelPackageValue()"
                                label
                                v-model="travelPackageValues"
                            />
                        </div>
                        <q-input
                            dense
                            outlined
                            readonly
                            hide-bottom-space
                            label="Máximo R$"
                            :value="formatarDinheiro(travelPackageValues.max)"
                            class="q-pl-sm"
                            style="width: 20%"
                        />
                    </div>
                </div>
                <div v-else class="col-6 col-md-6">
                    <div class="row">
                        <q-input
                            dense
                            outlined
                            readonly
                            hide-bottom-space
                            label="Mínimo R$"
                            :value="formatarDinheiro(travelPackageValues.min)"
                            class="q-pr-sm"
                            style="width: 25%"
                        />
                        <div class="q-px-sm" style="width: 50%">
                            <q-range
                                :min="min"
                                :max="max"
                                :step="0.1"
                                :left-label-value="getMinTravelPackageValue()"
                                :right-label-value="getMaxTravelPackageValue()"
                                label
                                v-model="travelPackageValues"
                            />
                        </div>
                        <q-input
                            dense
                            outlined
                            readonly
                            hide-bottom-space
                            label="Máximo R$"
                            :value="formatarDinheiro(travelPackageValues.max)"
                            class="q-pl-sm"
                            style="width: 25%"
                        />
                    </div>
                </div>
                <div class="col-12 col-md-1">
                    <q-btn
                        v-if="!showSearchIcon"
                        dense
                        outline
                        style="color: #243665; width: 100%; height: 40px"
                        size="16px"
                        @click="filterTravelPackages()"
                    >
                        <div>PESQUISAR</div>
                    </q-btn>
                    <q-btn
                        v-else
                        dense
                        outline
                        style="color: #243665; width: 100%; height: 40px"
                        icon="search"
                        size="16px"
                        @click="filterTravelPackages()"
                    />
                </div>
            </div>
        </div>
        <q-separator color="black" />
        <div class="row q-col-gutter-sm q-pt-sm">
            <div v-for="travelPackage in travel_packages" :key="travelPackage.id_travel_pack" class="col-6">
                <div>
                    <q-img
                        :src="getImgUrl(travelPackage.image)"
                        :alt="travelPackage.image"
                        class="image-promotions"
                        img-class="quadros-promocionais"
                        :ratio="16 / 9"
                    >
                        <div
                            class="absolute-bottom text-subtitle1 text-center image-subtitles"
                            @click="visualizeTravelPackage(travelPackage)"
                            style="cursor: pointer"
                        >
                            {{ travelPackage.name_travel_package + ' - ' + formatarDinheiro(travelPackage.unit_price) }}
                        </div>
                    </q-img>
                </div>
            </div>
        </div>
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

.image-promotions {
    width: 100%;
    height: 400px;
}

.quadros-promocionais {
    width: 100%;
    height: 400px;
    border-radius: 18px;
}

.image-subtitles {
    border-bottom-left-radius: 18px;
    border-bottom-right-radius: 18px;
}

.dark-blue {
    color: #243665;
}

.light-blue {
    color: #81d4fa;
}

.custom-caption {
    text-align: center;
    padding: 12px;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
}

.texto-q-item {
    min-height: min-content;
    font-size: 18px;
    font-weight: 700;
}
</style>
