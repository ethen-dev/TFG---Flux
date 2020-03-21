import Vue from 'vue'
import Vuex from 'vuex'
import md5 from 'blueimp-md5';
import {boardStore} from './modules/boardStore';
import {appConfig} from '../../config/config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedUser: null
  },
  mutations: {
    changeLoggedUser(state, value) {
      state.loggedUser = value;
    }
  },
  actions: {
    signup({commit}, {email, password}) {
      Vue.axios.post(`${appConfig.apiUrl}/user/create/${email}/${md5(password)}`)
        .then((res) => {
          const {data} = res.data;
          commit('changeLoggedUser', {email: data.email, userId: data.id});
        })
        .catch((err) => {
          console.log(err);
        })
    }
  },
  modules: {
    boardStore
  }
})
