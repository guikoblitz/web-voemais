export function setLoggedUser({ commit }, user) {
    commit('setLoggedUser', user);
}

export function setLogout({ commit }, user) {
    commit('setLogout', user);
}

export function setLoggedUserToken({ commit }, token) {
    commit('setLoggedUserToken', token);
}

export function clearLoggedUserToken({ commit }, token) {
    commit('clearLoggedUserToken', token);
}

export function setSystemTitle({ commit }, token) {
    commit('setSystemTitle', token);
}
