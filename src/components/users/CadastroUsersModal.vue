<template>
    <q-dialog v-model="abrirCadastroUsers" class="row items-center" persistent color="warning">
        <q-card style="min-width: 700px" class="background-color-modal no-scroll">
            <q-card-section class="row q-pa-sm" style="display: flex; justify-content: space-between">
                <div class="text-h6 text-center">
                    <span class="text-weight-bold" style="color: black">{{ modal_title }}</span>
                </div>
                <q-btn style="height: 34px; width: 34px" icon="close" color="negative" flat round dense @click="closeModal()" />
            </q-card-section>
            <q-separator color="black" />
            <q-card class="q-pa-sm scroll background-color-modal" style="max-height: 70vh">
                <span class="q-pr-none q-pl-xs q-pt-none q-pb-xs texto-q-item"
                    >Dados Pessoais | Funcionário
                    <q-toggle size="sm" v-model="user.employee" />
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
                            :error="formValidator.isError('name')"
                            :error-message="formValidator.getError('name')"
                            @input="resetarErroCampo('name')"
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
                            :error="formValidator.isError('last_name')"
                            :error-message="formValidator.getError('last_name')"
                            @input="resetarErroCampo('last_name')"
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
                            :error="formValidator.isError('cpf')"
                            :error-message="formValidator.getError('cpf')"
                            @input="resetarErroCampo('cpf')"
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
                            :error="formValidator.isError('date_birth')"
                            :error-message="formValidator.getError('date_birth')"
                        >
                            <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy transition-show="scale" transition-hide="scale" ref="qDateDataNascimento">
                                        <q-date
                                            minimal
                                            v-model="user.date_birth"
                                            @input="
                                                hide('qDateDataNascimento');
                                                atribuirData(user.date_birth);
                                                resetarErroCampo('date_birth');
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
                            :error="formValidator.isError('email')"
                            :error-message="formValidator.getError('email')"
                            @input="resetarErroCampo('email')"
                        />
                    </div>
                    <div class="col-6 col-md-6">
                        <q-input
                            dense
                            outlined
                            hide-bottom-space
                            label="Senha"
                            v-model="user.password"
                            ref="cadastroSenha"
                            :error="formValidator.isError('password')"
                            :error-message="formValidator.getError('password')"
                            @input="resetarErroCampo('password')"
                        />
                    </div>
                    <div class="col-6 col-md-6">
                        <q-input
                            dense
                            outlined
                            hide-bottom-space
                            label="Confirme a senha"
                            v-model="user.password_confirmation"
                            ref="cadastroConfirmaSenha"
                            :error="formValidator.isError('password_confirmation')"
                            :error-message="formValidator.getError('password_confirmation')"
                            @input="resetarErroCampo('password_confirmation')"
                        />
                    </div>
                </div>
                <hr style="border: 0; border-top: 1px solid #000000; heigth: 1px" />
                <q-item class="q-pr-none q-pl-xs q-pt-none q-pb-xs texto-q-item">Endereço</q-item>
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
                            :error="formValidator.isError('cep')"
                            :error-message="formValidator.getError('cep')"
                            @input="resetarErroCampo('cep')"
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
                            :error="formValidator.isError('id_country')"
                            :error-message="formValidator.getError('id_country')"
                            @input="resetarErroCampo('id_country')"
                        />
                    </div>
                    <div class="col-6 col-md-6">
                        <q-input
                            dense
                            outlined
                            hide-bottom-space
                            label="Estado"
                            v-model="user.name_state"
                            ref="cadastroEstado"
                            :error="formValidator.isError('name_state')"
                            :error-message="formValidator.getError('name_state')"
                            @input="resetarErroCampo('name_state')"
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
                            :error="formValidator.isError('name_city')"
                            :error-message="formValidator.getError('name_city')"
                            @input="resetarErroCampo('name_city')"
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
                            :error="formValidator.isError('name_neighborhood')"
                            :error-message="formValidator.getError('name_neighborhood')"
                            @input="resetarErroCampo('name_neighborhood')"
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
                            :error="formValidator.isError('id_street')"
                            :error-message="formValidator.getError('id_street')"
                            @input="resetarErroCampo('id_street')"
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
                            :error="formValidator.isError('name_address')"
                            :error-message="formValidator.getError('name_address')"
                            @input="resetarErroCampo('name_address')"
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
                            :error="formValidator.isError('num_address')"
                            :error-message="formValidator.getError('num_address')"
                            @input="resetarErroCampo('num_address')"
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
                            :error="formValidator.isError('complement')"
                            :error-message="formValidator.getError('complement')"
                            @input="resetarErroCampo('complement')"
                        />
                    </div>
                </div>
                <hr style="border: 0; border-top: 1px solid #000000; heigth: 1px" />
                <q-item class="q-pr-none q-pl-xs q-pt-none q-pb-xs texto-q-item">Telefone</q-item>
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
                            :error="formValidator.isError('id_phone_type')"
                            :error-message="formValidator.getError('id_phone_type')"
                            @input="resetarErroCampo('id_phone_type')"
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
                            :error="formValidator.isError('num_phone')"
                            :error-message="formValidator.getError('num_phone')"
                            @input="resetarErroCampo('num_phone')"
                        />
                    </div>
                </div>
            </q-card>
            <q-separator color="black" />
            <q-card-actions class="q-pb-sm q-pr-sm q-pt-sm " style="display: flex; justify-content: space-between">
                <div>
                    <div class="q-pr-sm">
                        <q-btn icon="close" class="q-px-xs" color="yellow-9" text-color="white" label="Limpar" />
                    </div>
                </div>
                <div class="row justify-end">
                    <div class="q-pr-sm">
                        <q-btn icon="close" class="q-px-xs" color="red" text-color="white" label="Cancelar" @click="closeModal()" />
                    </div>
                    <div>
                        <q-btn icon="done" class="q-px-xs" color="green" text-color="white" label="Confirmar" @click="confirmar()" />
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
