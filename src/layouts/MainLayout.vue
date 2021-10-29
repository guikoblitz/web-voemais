<template>
    <q-layout view="hHh LpR lfr">
        <q-header elevated>
            <q-toolbar class="q-pl-none">
                <div class="q-pa-none q-ma-none">
                    <q-item class="text-white" style="justify-content: center" dense clickable @click="setRouter('/')">
                        <q-item-section avatar class="q-pa-none">
                            <q-img src="logo_raw.png" />
                        </q-item-section>
                    </q-item>
                </div>

                <q-toolbar-title> {{ getSystemTitle() }} </q-toolbar-title>

                <div v-if="validateLoggedUser()" class="q-pr-sm q-ma-none">
                    <span class="row" style="color: #81d4fa">
                        <div class="q-pr-xs">Bem vindo(a),</div>
                        <div style="font-weight: 600">{{ `${getLoggedUserName()}` }}</div></span
                    >
                </div>
                <div v-if="validateEmployee()" class="q-pr-sm q-ma-none">
                    <q-btn
                        rounded
                        outline
                        label="Gerenciar Pacotes"
                        size="13px"
                        color="light-blue-3"
                        @click="setRouter('cadastroPacotesGerenciador')"
                    />
                </div>
                <div v-if="!validateLoggedUser()" class="q-pr-sm q-ma-none">
                    <q-btn rounded outline label="Cadastro" size="13px" color="light-blue-3" @click="abrirCadastroUsers = true" />
                </div>
                <div class="q-pr-sm q-ma-none">
                    <q-btn
                        v-if="!validateLoggedUser()"
                        rounded
                        outline
                        label="Login"
                        size="13px"
                        color="light-blue-3"
                        @click="abrirLogin = true"
                    />
                    <q-btn v-else rounded outline label="Logout" size="13px" color="light-blue-3" @click="logout()" />
                </div>
            </q-toolbar>
        </q-header>

        <q-page-container>
            <router-view />
        </q-page-container>
        <Login v-if="abrirLogin" :abrirLogin="abrirLogin" @confirmarLogin="confirmarLogin($event)" @fecharModal="abrirLogin = $event" />
        <CadastroUsersModal v-if="abrirCadastroUsers" :abrirCadastroUsers="abrirCadastroUsers" @closeModal="abrirCadastroUsers = $event" />
    </q-layout>
</template>

<script lang="ts">
import { Loading } from 'quasar';
import { Vue, Component } from 'vue-property-decorator';
import Login from 'src/modals/Login.vue';
import { notificarErro, notificarSucesso } from 'src/util/NotifyUtil';
import CadastroUsersModal from 'src/components/users/CadastroUsersModal.vue';

@Component({ components: { Login, CadastroUsersModal } })
export default class MainLayout extends Vue {
    leftDrawer = true;
    abrirLogin = false;
    abrirCadastroUsers = false;

    getSystemTitle(): string {
        return this.$store.state.geral.systemTitle;
    }

    setRouter(path: string): void {
        this.$router.push(path).catch(() => {});
    }

    getLoggedUserName() {
        return this.$store.state.geral.usuarioLogado.name;
    }

    validateLoggedUser() {
        if (this.$store.state.geral.usuarioLogado) {
            return true;
        }
        return false;
    }

    validateEmployee() {
        if (this.validateLoggedUser() && this.$store.state.geral.usuarioLogado.employee) {
            return true;
        }
        return false;
    }

    confirmarLogin(retorno: boolean): void {
        if (retorno) {
            Loading.show({ message: 'Carregando Início...' });
            this.$router.push('/').catch(() => {});
            Loading.hide();
            notificarSucesso('Login efetuado com sucesso.');
        } else {
            notificarErro('Houve um erro ao efetuar login.');
        }
    }

    logout() {
        this.$store.dispatch('geral/setLogout', undefined);
        this.$store.dispatch('geral/clearLoggedUserToken', undefined);
    }
}
</script>

<style>
.esconder-seta-expansion-item .q-expansion-item__toggle-icon {
    display: none;
}

.background-color-drawer {
    background-color: #243665;
}
</style>
