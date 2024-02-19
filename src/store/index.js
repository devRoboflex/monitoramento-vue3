// Exemplo Vuex store
import { createStore } from 'vuex';

export default createStore({
  state: {
    dadosDispositivo: [],
    modeloDispositivo: null,
    idDispositivo: null,
    statusBateria: null,
    saudeBateria: null,
    userPermissions: [],
  },
  mutations: {
    atualizarId(state, novosDados) {
      state.idDispositivo = novosDados;
      state.modeloDispositivo = novosDados;
    },
    atualizarModelo(state, novosDados) {
      state.modeloDispositivo = novosDados;
    },
    atualizarDadosDispositivo(state, novosDados) {
      state.dadosDispositivo = novosDados;
      state.saudeBateria = novosDados.map(item => item.bateriaSaude_nome);
      state.statusBateria = novosDados.map(item => item.bateriaStatus_nome);
    },
    setUserPermissions: (state, permissions) => {
      state.userPermissions = permissions;
    },
  },

  getters: {
    getUserPermissions: (state) => state.userPermissions,
  },
  
  actions: {
    updateUserPermissions({ commit }, permissions) {
      commit('setUserPermissions', permissions);
    },
  },

  modules: {

},
});