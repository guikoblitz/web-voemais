<template>
  <q-dialog
    v-model="abrirCadastroUsers"
    class="row items-center"
    persistent
    color="warning"
  >
    <q-card style="min-width: 700px" class="background-color-modal no-scroll">
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
      <q-card
        class="q-pa-sm scroll background-color-modal"
        style="max-height: 70vh"
      >
        <span class="q-pr-none q-pl-xs q-pt-none q-pb-xs texto-q-item"
          >Dados Pessoais | Cliente
          <q-toggle size="sm" v-model="user.employee">Funcionário</q-toggle>
        </span>
        <div class="row q-col-gutter-sm">
          <div class="col-6 col-md-6">
            <q-input
              dense
              outlined
              hide-bottom-space
              label="Nome"
              v-model="user.name"
              ref="cadastroNome"
            />
          </div>
          <div class="col-6 col-md-6">
            <q-input
              dense
              outlined
              hide-bottom-space
              label="Sobrenome"
              v-model="user.last_name"
              ref="cadastroSobrenome"
            />
          </div>
          <div class="col-6 col-md-6">
            <q-input
              dense
              outlined
              hide-bottom-space
              label="CPF"
              unmasked-value
              mask="###.###.###-##"
              placeholder="000.000.000-00"
              maxlength="14"
              v-model="user.cpf"
              ref="cadastroCPF"
            />
          </div>
          <div class="col-6 col-md-6">
            <q-input
              dense
              outlined
              hide-bottom-space
              label="Data de Nascimento"
              readonly
              :value="getDataFormatada(user.date_birth)"
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
                      v-model="user.date_birth"
                      @input="
                        hide('qDateDataNascimento');
                        atribuirData(user.date_birth);
                      "
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-12">
            <q-input
              dense
              outlined
              hide-bottom-space
              label="E-mail"
              v-model="user.email"
              ref="cadastroEmail"
            />
          </div>
          <!-- TODO toggle de employee -->
          <div class="col-6 col-md-6">
            <q-input
              dense
              outlined
              hide-bottom-space
              label="Senha"
              v-model="user.password"
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
        <hr style="border: 0; border-top: 1px solid #000000; heigth: 1px" />
        <q-item class="q-pr-none q-pl-xs q-pt-none q-pb-xs texto-q-item"
          >Endereço</q-item
        >
        <div class="row q-col-gutter-sm">
          <div class="col-6 col-md-6">
            <q-input
              dense
              outlined
              hide-bottom-space
              label="CEP"
              v-model="user.cep"
              unmasked-value
              placeholder="00000-000"
              mask="#####-###"
              maxlength="9"
              onkeypress="return event.charCode >= 46 && event.charCode <= 57"
              ref="cadastroCEP"
            />
          </div>
          <div class="col-6 col-md-6">
            <q-select
              ref="cadastroPais"
              dense
              outlined
              label="País"
              :readonly="visualizeRegister"
              :hide-dropdown-icon="visualizeRegister"
              :options="countries"
              option-label="name_country"
              option-value="id_country"
              transition-show="flip-up"
              transition-hide="flip-down"
              hide-bottom-space
              v-model="user.id_country"
              map-options
              emit-value
            />
            <!-- :error="formValidator.isError('id_country')"
              :error-message="formValidator.getError('id_country')"
              @input="resetarErroCampo('id_country')" -->
          </div>
          <div class="col-6 col-md-6">
            <q-input
              dense
              outlined
              hide-bottom-space
              label="Estado"
              v-model="user.name_state"
              ref="cadastroEstado"
            />
          </div>
          <div class="col-6 col-md-6">
            <q-input
              dense
              outlined
              hide-bottom-space
              label="Cidade"
              v-model="user.name_city"
              ref="cadastroCidade"
            />
          </div>
          <div class="col-6 col-md-6">
            <q-input
              dense
              outlined
              hide-bottom-space
              label="Bairro"
              v-model="user.name_neighborhood"
              ref="cadastroBairro"
            />
          </div>
          <div class="col-6 col-md-6">
            <q-select
              ref="cadastroTipoRua"
              dense
              outlined
              label="Tipo Rua"
              :readonly="visualizeRegister"
              :hide-dropdown-icon="visualizeRegister"
              :options="street_types"
              option-label="street_type"
              option-value="id_street"
              transition-show="flip-up"
              transition-hide="flip-down"
              hide-bottom-space
              v-model="user.id_street"
              map-options
              emit-value
            />
          </div>
          <div class="col-6 col-md-6">
            <q-input
              dense
              outlined
              hide-bottom-space
              label="Rua"
              v-model="user.name_address"
              ref="cadastroNomeRua"
            />
          </div>
          <div class="col-6 col-md-6">
            <q-input
              dense
              outlined
              hide-bottom-space
              label="Numero"
              v-model="user.num_address"
              onkeypress="return event.charCode >= 46 && event.charCode <= 57"
              ref="cadastroNumero"
            />
          </div>
          <div class="col-12 col-md-12">
            <q-input
              dense
              outlined
              hide-bottom-space
              label="Complemento"
              v-model="user.complement"
              ref="cadastroComplemento"
            />
          </div>
        </div>
        <hr style="border: 0; border-top: 1px solid #000000; heigth: 1px" />
        <q-item class="q-pr-none q-pl-xs q-pt-none q-pb-xs texto-q-item"
          >Telefone</q-item
        >
        <div class="row q-col-gutter-sm">
          <div class="col-6 col-md-6">
            <q-select
              ref="cadastroPais"
              dense
              outlined
              label="Tipo Telefone"
              :readonly="visualizeRegister"
              :hide-dropdown-icon="visualizeRegister"
              :options="phone_types"
              option-label="phone_type"
              option-value="id_phone_type"
              transition-show="flip-up"
              transition-hide="flip-down"
              hide-bottom-space
              v-model="user.id_phone_type"
              map-options
              emit-value
            />
          </div>
          <div class="col-6 col-md-6">
            <q-input
              dense
              outlined
              hide-bottom-space
              label="Telefone"
              v-model="user.num_phone"
              placeholder="(00)00000-0000"
              unmasked-value
              mask="(##)#####-####"
              maxlength="14"
              onkeypress="return event.charCode >= 46 && event.charCode <= 57"
              ref="cadastroTelefone"
            />
          </div>
        </div>
      </q-card>
      <q-separator color="black" />
      <q-card-actions
        class="q-pb-sm q-pr-sm q-pt-sm "
        style="display: flex; justify-content: space-between"
      >
        <div>
          <div class="q-pr-sm">
            <q-btn
              icon="close"
              class="q-px-xs"
              color="yellow-9"
              text-color="white"
              label="Limpar"
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
              label="Cancelar"
              @click="closeModal()"
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
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" src="./CadastroUsersModal.ts" />

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

.texto-q-item {
  min-height: min-content;
  font-size: 18px;
  font-weight: 700;
}
</style>
