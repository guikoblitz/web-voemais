import lodash from 'lodash';
import { notificarSucesso } from 'src/util/NotifyUtil';

export function setLoggedUser(state, payload) {
    state.usuarioLogado = lodash.cloneDeep(payload);
}

export function setLogout(state, payload) {
    state.usuarioLogado = payload;
    if (!state.usuarioLogado) {
        notificarSucesso('Logout efetuado com sucesso!');
    }
}
