import Vue from 'vue';
import Vuex from 'vuex';
import lodash from 'lodash';

Vue.use(Vuex);

const state = { usuarioLogado: undefined };

const actions = {
    setLoggedUser({ commit }, user) {
        commit('setLoggedUser', user);
    }
};

const mutations = {
    setLoggedUser(state, payload) {
        state.usuarioLogado = lodash.cloneDeep(payload);
    }
};

const store = new Vuex.Store({ state, actions, mutations });

export default store;
