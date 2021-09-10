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
              v-model="pessoa.nome"
              ref="cadastroNome"
            />
          </div>
          <div class="col-6 col-md-6">
            <q-input
              dense
              outlined
              hide-bottom-space
              label="Sobrenome"
              v-model="pessoa.sobrenome"
              ref="cadastroSobrenome"
            >
            </q-input>
          </div>
          <div class="col-6 col-md-6">
            <q-input
              dense
              outlined
              hide-bottom-space
              label="CPF"
              mask="###.###.###-##"
              maxlength="14"
              v-model="pessoa.cpf"
              ref="cadastroCPF"
            >
            </q-input>
          </div>
          <div class="col-6 col-md-6">
            <q-input
              dense
              outlined
              hide-bottom-space
              label="Data de Nascimento"
              readonly
              :value="getDataFormatada(pessoa.dataNascimento)"
              ref="cadastroDataNascimento"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                    ref="qDateDataNascimento"
                  >
                    <q-date
                      minimal
                      v-model="pessoa.dataNascimento"
                      @input="
                        hide('qDateDataNascimento');
                        atribuirData(pessoa.dataNascimento);
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
              label="E-mail"
              v-model="pessoa.email"
              ref="cadastroEmail"
            />
          </div>
          <div class="col-6 col-md-6">
            <q-input
              dense
              outlined
              hide-bottom-space
              label="País"
              v-model="pessoa.pais"
              ref="cadastroPais"
            />
          </div>
          <div class="col-6 col-md-6">
            <q-select
              ref="cadastroEstado"
              dense
              outlined
              label="Estado"
              :options="listaEstados"
              transition-show="flip-up"
              transition-hide="flip-down"
              hide-bottom-space
              v-model="pessoa.estado"
              map-options
              emit-value
            />
          </div>
          <div class="col-6 col-md-6">
            <q-input
              dense
              outlined
              hide-bottom-space
              label="Cidade"
              v-model="pessoa.cidade"
              ref="cadastroCidade"
            />
          </div>
          <div class="col-6 col-md-6">
            <q-select
              ref="cadastroTipoLogradouro"
              dense
              outlined
              label="Tipo Logradouro"
              :options="listaTipoLogradouros"
              transition-show="flip-up"
              transition-hide="flip-down"
              hide-bottom-space
              v-model="pessoa.tipoLogradouro"
            />
          </div>
          <div class="col-6 col-md-6">
            <q-input
              dense
              outlined
              hide-bottom-space
              label="Logradouro"
              v-model="pessoa.logradouro"
              ref="cadastroLogradouro"
            />
          </div>
          <div class="col-6 col-md-6">
            <q-input
              dense
              outlined
              hide-bottom-space
              label="Número"
              v-model="pessoa.numero"
              ref="cadastroNumero"
            />
          </div>
          <div class="col-6 col-md-6">
            <q-input
              dense
              outlined
              hide-bottom-space
              label="Bairro"
              v-model="pessoa.bairro"
              ref="cadastroBairro"
            />
          </div>
          <div class="col-6 col-md-6">
            <q-select
              ref="cadastroTipoTelefone"
              dense
              outlined
              label="Tipo Telefone"
              :options="listaTipoTelefones"
              transition-show="flip-up"
              transition-hide="flip-down"
              hide-bottom-space
              v-model="pessoa.tipoTelefone"
            >
            </q-select>
          </div>
          <div class="col-6 col-md-6">
            <q-input
              dense
              outlined
              hide-bottom-space
              label="Telefone"
              v-model="pessoa.telefone"
              ref="cadastroTelefone"
            />
          </div>
          <div class="col-6 col-md-6">
            <q-input
              dense
              outlined
              hide-bottom-space
              label="Senha"
              v-model="pessoa.senha"
              ref="cadastroSenha"
            />
          </div>
          <div class="col-6 col-md-6">
            <q-input
              dense
              outlined
              hide-bottom-space
              label="Confirme a senha"
              value="********"
              ref="cadastroConfirmaSenha"
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

<script lang="ts">
import { QDate } from 'quasar';
import { Pessoa } from 'src/entities/Pessoa';
import {
  formatarDataQDate,
  getDataBD,
  getDataFormatada
} from 'src/util/DataUtil';
import { mascaraCpfCnpj } from 'src/util/MaskUtil';
import { Vue, Component } from 'vue-property-decorator';
import { Estado, listaEstados } from 'src/util/Constantes';

@Component
export default class CadastroPage extends Vue {
  pessoa = new Pessoa();
  listaTipoTelefones: string[] = ['Celular', 'Residencial', 'Comercial', 'Fax'];
  listaTipoLogradouros: string[] = [
    'Rua',
    'Avenida',
    'Alameda',
    'Travessa',
    'Rodovia'
  ];
  listaEstados: Estado[] = [];

  constructor() {
    super();

    this['getDataFormatada'] = getDataFormatada;
    this['formatarData'] = formatarDataQDate;
    this['getDataBD'] = getDataBD;
    this['mascaraCpfCnpj'] = mascaraCpfCnpj;

    this.listaEstados = [...listaEstados];
  }

  $refs!: {
    qDateDataNascimento: QDate;
  };

  confirmar(): void {
    console.log(this.pessoa);
  }

  hide(qDateRef: string): void {
    this.$refs[qDateRef].hide();
  }

  atribuirData(data: string): void {
    const formatoData = new Date(data);
    this.pessoa.dataNascimento = getDataBD(formatoData);
  }
}
</script>

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
