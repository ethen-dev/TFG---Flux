import Vue from 'vue';
import Vuex from 'vuex';
import md5 from 'blueimp-md5';
import {boardStore} from './modules/boardStore';
import {flowStore} from './modules/flowStore';
import {taskStore} from './modules/taskStore';
import {appConfig} from '../../config/config'
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedUser: null,
    storedModalView: ''
  },
  mutations: {
    changeLoggedUser(state, value) {
      state.loggedUser = value;
    },
    changeActiveModal(state, modalName) {
      state.storedModalView = modalName;
    },
  },
  actions: {
    signup({commit}, {email, password}) {
      axios.defaults.withCredentials = true;
      axios.post(`${appConfig.apiUrl}/user/create/${email}/${md5(password)}`)
        .then((res) => {
          const {data} = res.data;
          commit('changeLoggedUser', {email: data.email, userId: data.id});
        })
        .catch((err) => {
          console.log(err);
        })
    },
    autoLogin({commit}) {
      axios.defaults.withCredentials = true;
      axios.get(`${appConfig.apiUrl}/user/token/tfg-jwt`)
        .then((res) => {
          console.log(res.data)
          const {data} = res.data;
          commit('changeLoggedUser', {email: data.email, userId: data.id});
        })
        .catch((err) => {
          console.log(err);
        })
    },
    openModal({commit}, modalName) {
      commit('changeActiveModal', modalName);
    },
    closeModal({commit}) {
      commit('changeActiveModal', '');
    },
  },
  modules: {
    boardStore,
    flowStore,
    taskStore
  }
})
