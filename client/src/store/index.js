import Vue from 'vue';
import Vuex from 'vuex';
import md5 from 'blueimp-md5';
import {boardStore} from './modules/boardStore';
import {flowStore} from './modules/flowStore';
import {taskStore} from './modules/taskStore';
import {appConfig} from '../../config/config';
import axios from 'axios';

Vue.use(Vuex);

const getDefaultState = () => {
	return {
		loggedUser: null,
		storedModalView: ''
	}
}

export default new Vuex.Store({
	state: getDefaultState(),
  mutations: {
	changeLoggedUser(state, value) {
		state.loggedUser = value;
	},
	changeActiveModal(state, modalName) {
		state.storedModalView = modalName;
	},
	resetStore(state) {
		Object.assign(state, getDefaultState())
	},
	changeUpdatedLoggedUser(state, {userName, email}) {
		state.loggedUser.userName = userName;
		state.loggedUser.email = email;
	}
  },
  actions: {
	resetStores({commit}) {
		commit('resetStore');
	},
	async signup({commit}, {email, password, userName}) {
		axios.defaults.withCredentials = true;
		return axios.post(`${appConfig.apiUrl}/user/create/${email}/${md5(password)}/${userName}`)
			.then((res) => {
				const {data} = res.data;
				commit('changeLoggedUser', {email: data.email, userId: data.id, userName: data});
				return res;
			})
			.catch((err) => {
				console.log(err);
			});
	},
	async autoLogin({commit}) {
		axios.defaults.withCredentials = true;
		return axios.get(`${appConfig.apiUrl}/user/token/tfg-jwt`)
			.then((res) => {
				console.log(res.data)
				const {data} = res.data;
				commit('changeLoggedUser', {email: data.email, userId: data.id, userName: data.userName});
				return res;
			})
			.catch((err) => {
				throw err;
			})
	},
	async login({ commit }, {email, password}) {
		axios.defaults.withCredentials = true;
		return axios.get(`${appConfig.apiUrl}/user/auth/${email}/${md5(password)}`)
			.then((res) => {
				console.log(res.data)
				const { data } = res.data;
				commit('changeLoggedUser', { email: data.email, userId: data._id, userName: data.userName});
				return res;
			})
			.catch((err) => {
				console.log(err);
			})
	},
	logout({dispatch}) {
		axios.post(`${appConfig.apiUrl}/user/logout/tfg-jwt`)
			.then(() => {
				console.log('logout')
				dispatch('resetStores');
			})
			.catch((err) => {
				console.log(err);
			})
	},
	updateUser({commit, state}, {userName, email, password}) {
		axios.patch(`${appConfig.apiUrl}/user/update/${state.loggedUser.userId}`,
		{
			userName,
			email,
			password
		},
		{
			withCredentials: false
		})
		.then(() => {
			commit('changeUpdatedLoggedUser', {userName, email})
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
