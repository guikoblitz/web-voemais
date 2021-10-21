import lodash from 'lodash';

export function setLoggedUser(state, payload) {
    state.usuarioLogado = lodash.cloneDeep(payload);
}
