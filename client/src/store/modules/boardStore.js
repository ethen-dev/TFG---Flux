import Vue from 'vue';
import {appConfig} from '../../../config/config';


const getDefaultState = () => {
    return {
        boards: []
    }
}

export const boardStore = {
    namespaced: true,
    state: getDefaultState(),
    getters: {},
    mutations: {
        setBoards(state, value) {
            state.boards = value;
        },
        pushBoard(state, value) {
            state.boards.push(value);
        },
        resetStore(state) {
            Object.assign(state, getDefaultState())
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
        },
        createBoard({commit}, {formValues, userId}) {
            Vue.axios.post(`${appConfig.apiUrl}/board/create/${userId}/${formValues.boardName}`)
                .then((res) => {
                    console.log(res.data)
                    const { data } = res.data;
                    commit('pushBoard', data.board);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
}