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
              v-model="pessoa.dataNascimento"
              ref="cadastroDataNascimento"
            />
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
            <q-input
              dense
              outlined
              hide-bottom-space
              label="Tipo de Telefone"
              v-model="pessoa.tipoTelefone"
              ref="cadastroTipoTelefone"
            />
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
              label="Estado"
              v-model="pessoa.estado"
              ref="cadastroEstado"
            />
          </div>
          <div class="col-6 col-md-6">
            <q-input
              dense
              outlined
              hide-bottom-space
              label="Tipo de Telefone"
              v-model="pessoa.cidade"
              ref="cadastroCidade"
            />
          </div>
          <div class="col-6 col-md-6">
            <q-input
              dense
              outlined
              hide-bottom-space
              label="Tipo Logradouro"
              v-model="pessoa.tipoLogradouro"
              ref="cadastroTipoLogradouro"
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
          <!-- <div class="q-pr-sm">
            <q-btn
              icon="close"
              outline
              class="q-px-xs"
              text-color="red"
              label="Cancelar"
            />
          </div>
          <div>
            <q-btn
              icon="done"
              outline
              class="q-px-xs"
              text-color="green"
              label="Confirmar"
              @click="confirmar()"
            />
          </div> -->
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
import { Pessoa } from 'src/entities/Pessoa';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class CadastroPage extends Vue {
  pessoa = new Pessoa();
  teste = 'Testando 12345...';

  confirmar(): void {
    console.log(this.pessoa);
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
