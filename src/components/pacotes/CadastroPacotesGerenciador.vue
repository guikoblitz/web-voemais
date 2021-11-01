<template>
    <q-page class="background-color-page q-py-md padding-lateral">
        <div>
            <q-table
                ref="travelPackagesColumns"
                :columns="travelPackagesColumns"
                :data="travelPackagesList"
                :row-key="row => travelPackagesList.indexOf(row)"
                dense
                :pagination.sync="pagination"
                hide-bottom
                :rows-per-page-options="[0]"
                class="scroll"
                style="max-height: 80vh"
            >
                <template v-slot:body="props">
                    <q-tr :props="props" style="font-weight: 500; cursor: default">
                        <q-td key="index" :props="props">
                            {{ props.key + 1 }}
                        </q-td>
                        <q-td key="name" :props="props">
                            {{ props.row.name_travel_package }}
                            <q-icon v-if="props.row.promotion" size="xs" name="star" color="warning">
                                <q-tooltip anchor="top middle" content-style="font-size: 12px" self="center left" :offset="[10, 10]">
                                    <strong>Pacote Promocional</strong>
                                </q-tooltip>
                            </q-icon>
                        </q-td>
                        <q-td key="description" :props="props" style="max-width: 200px">
                            {{ props.row.description }}
                        </q-td>
                        <q-td key="idTravelPackageType" :props="props" style="max-width: 200px">
                            {{ props.row.idTravelPackageType.travel_package_type }}
                        </q-td>
                        <q-td key="start_date" :props="props" style="max-width: 120px">
                            {{ getDataFormatada(props.row.start_date) }}
                        </q-td>
                        <q-td key="end_date" :props="props" style="max-width: 120px">
                            {{ getDataFormatada(props.row.end_date) }}
                        </q-td>
                        <q-td key="unit_price" :props="props" style="max-width: 100px">
                            {{ formatarDinheiro(props.row.unit_price) }}
                        </q-td>
                        <q-td key="idCountryOrigin" :props="props" style="max-width: 200px">
                            {{ props.row.idCountryOrigin.name_country }}
                        </q-td>
                        <q-td key="idCountryDestination" :props="props" style="max-width: 200px">
                            {{ props.row.idCountryDestination.name_country }}
                        </q-td>
                        <q-td key="functions" style="min-width: 100px; max-width: 100px" :props="props">
                            <div>
                                <q-btn flat dense round color="warning" icon="create" size="12px" @click="editTravelPackage(props.row)">
                                    <q-tooltip anchor="top middle" content-style="font-size: 12px" self="center left" :offset="[10, 10]">
                                        <strong>Editar Pacote</strong>
                                    </q-tooltip>
                                </q-btn>
                                <q-btn flat dense round color="red" icon="delete" size="12px" @click="askDeletePackage(props.row)">
                                    <q-tooltip anchor="top middle" content-style="font-size: 12px" self="center left" :offset="[10, 10]">
                                        <strong>Excluir Pacote</strong>
                                    </q-tooltip>
                                </q-btn>
                            </div>
                        </q-td>
                    </q-tr>
                </template>
            </q-table>
            <div class="row q-mt-md" style="display: flex; justify-content: space-between">
                <div style="width: 30px"></div>
                <div>
                    <q-pagination
                        class="background-pagination"
                        input-class="font-pagination"
                        v-model="pagination.page"
                        color="black"
                        :max="pagesNumber"
                        size="md"
                        input
                    />
                </div>
                <div style="width: 30px">
                    <q-btn @click="createTravelPackage()" round color="primary" icon="add" size="sm">
                        <q-tooltip anchor="top middle" content-style="font-size: 12px" self="center left">
                            <span>Adicionar Pacote de Viagem</span>
                        </q-tooltip>
                    </q-btn>
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

<script lang="ts" src="./CadastroPacotesGerenciador.ts"></script>

<style>
.background-color-page {
    background-color: #e3f2fd;
}

.padding-lateral {
    padding-right: 50px;
    padding-left: 50px;
}

.font-pagination .q-placeholder {
    font-weight: bold;
}

.background-pagination .q-field__control {
    background-color: #e3f2fd;
    color: black;
}
</style>
