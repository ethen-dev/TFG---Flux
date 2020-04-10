import Vue from 'vue';
import {appConfig} from '../../../config/config';


export const boardStore = {
    namespaced: true,
    state: {
        boards: []
    },
    getters: {},
    mutations: {
        setBoards(state, value) {
            state.boards = value;
        }
    },
    actions: {
        getBoards({commit}, userId) {
            console.log('boardStore', userId)
            Vue.axios.get(`${appConfig.apiUrl}/board/getAll/${userId}`)
                .then((res) => {
                    console.log(res.data)
                    const { data } = res.data;
                    commit('setBoards', data.boards);
                })
                .catch((err) => {
                    console.log(err);
                });
            
        }
    }
}