<template>
    <q-layout view="hHh LpR lfr">
        <q-header elevated>
            <q-toolbar class="q-pl-none">
                <div class="q-pa-none q-ma-none">
                    <q-item class="text-white" style="justify-content: center" dense clickable @click="setRouter('/', 'Início')">
                        <q-item-section avatar class="q-pa-none">
                            <q-img src="logo_raw.png" />
                        </q-item-section>
                    </q-item>
                </div>

                <q-toolbar-title> {{ title }} </q-toolbar-title>

                <div v-if="!validateLoggedUser() || validateEmployee()" class="q-pr-sm q-ma-none">
                    <q-btn
                        rounded
                        outline
                        :label="validateEmployee() ? 'Cadastrar' : 'Cadastro'"
                        size="13px"
                        color="light-blue-3"
                        @click="abrirCadastroUsers = true"
                    />
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
    mini = true;
    title = 'Início';
    abrirLogin = false;
    abrirCadastroUsers = false;

    setRouter(path: string, tab: string): void {
        if (this.title !== tab) {
            Loading.show({ message: `Carregando ${tab}...` });
            this.title = tab;
            this.mini = true;
            this.$router.push(path).catch(() => {});
            Loading.hide();
        } else {
            this.mini = !this.mini;
        }
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
            if (this.title !== 'Início') {
                Loading.show({ message: 'Carregando Início...' });
                this.title = 'Início';
                this.mini = true;
                this.$router.push('/').catch(() => {});
                Loading.hide();
                notificarSucesso('Login efetuado com sucesso.');
            } else {
                notificarSucesso('Login efetuado com sucesso.');
            }
        } else {
            notificarErro('Houve um erro ao efetuar login.');
        }
    }

    logout() {
        this.$store.dispatch('geral/setLogout', undefined);
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
