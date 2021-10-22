<template>
    <q-dialog v-model="abrirLogin" class="row items-center" persistent color="warning">
        <q-card style="min-width: 500px" class="background-color-modal">
            <q-card-section class="row q-pa-sm" style="display: flex; justify-content: space-between">
                <div style="height: 34px; width: 34px"></div>
                <div class="text-h6 text-center">
                    <span class="text-weight-bold" style="color: black">Login</span>
                </div>
                <q-btn style="height: 34px; width: 34px" icon="close" color="negative" flat round dense @click="fecharModal()" />
            </q-card-section>
            <q-separator color="black" />
            <q-card-section>
                <q-input
                    dense
                    outlined
                    hide-bottom-space
                    label="Login"
                    v-model="login.email"
                    ref="login"
                    @keyup.enter="$refs.password.focus()"
                />
                <q-input
                    class="q-pt-sm"
                    type="password"
                    autocomplete="new-password"
                    dense
                    outlined
                    hide-bottom-space
                    label="Senha"
                    v-model="login.password"
                    @keyup.enter="confirmar()"
                    ref="password"
                />
            </q-card-section>
            <q-separator color="black" />
            <q-card-actions class="q-pb-sm q-pr-sm q-pt-sm float-right">
                <div class="row">
                    <div class="q-pr-sm">
                        <q-btn color="red-12" dense icon="undo" label="Cancelar" @click="fecharModal()" />
                    </div>
                    <div>
                        <q-btn color="light-green-8" dense icon="done" label="Confirmar" @click="confirmar()" />
                    </div>
                </div>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script lang="ts">
import { Loading } from 'quasar';
import { UserLogin } from 'src/entities/UserLogin';
import LoginService from 'src/services/LoginService';
import UserService from 'src/services/UserService';
import { notificarErro } from 'src/util/NotifyUtil';
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
    login = new UserLogin();

    @Prop()
    readonly abrirLogin: boolean;

    @Emit('fecharModal')
    fecharModal(): boolean {
        return false;
    }

    @Emit('confirmarLogin')
    confirmarLogin(isLogado: boolean): boolean {
        return isLogado;
    }
    decodeToken(token: string): string {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );

        const jsonPayloadObject = JSON.parse(jsonPayload);
        return jsonPayloadObject.sub;
    }

    async confirmar(): Promise<void> {
        try {
            Loading.show({ message: 'Verificando credenciais...' });
            const loginToken = await LoginService.provideLogin(this.login);
            if (loginToken) {
                const loggedUserId = this.decodeToken(loginToken);
                const loggedUser = await UserService.getUserById(loggedUserId);
                this.$store.dispatch('geral/setLoggedUser', loggedUser);
                this.$store.dispatch('geral/setLoggedUserToken', loginToken);
                this.confirmarLogin(true);
                this.fecharModal();
            } else {
                notificarErro('Credenciais inválidas.');
            }
        } catch (e) {
            console.log(e);
        } finally {
            Loading.hide();
        }
    }
}
</script>

<style>
.background-color-modal {
    background-color: #e3f2fd;
}
</style>
