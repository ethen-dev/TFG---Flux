import Vue from 'vue';
import {appConfig} from '../../../config/config';


const getDefaultState = () => {
    return {
        boards: []
    }
}

export const boardStore = {
    state: getDefaultState(),
    getters: {
        getBoard: (state) => (id) => {
            return state.boards.filter(_ => _._id === id)[0];
        }
    },
    mutations: {
        setBoards(state, value) {
            state.boards = value;
        },
        pushBoard(state, value) {
            state.boards.push(value);
        },
        resetStore(state) {
            Object.assign(state, getDefaultState())
        },
        changeSprints(state, {boardId, sprints}) {
            Vue.set(state.boards.find(_ => _._id === boardId), 'sprints', sprints);
        },
        changeMembers(state, {boardId, members}) {
            Vue.set(state.boards.find(_ => _._id === boardId), 'members', members);
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
        createKanbanBoard({commit}, {formValues, userId}) {
            Vue.axios.post(`${appConfig.apiUrl}/board/create/${userId}/${formValues.boardName}`)
                .then((res) => {
                    console.log(res.data)
                    const { data } = res.data;
                    commit('pushBoard', data.board);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        createScrumBoard({commit, dispatch}, {formValues, userId, flowValues}) {
            console.log(formValues, userId, flowValues)
            Vue.axios.post(`${appConfig.apiUrl}/board/create/${userId}/${formValues.boardName}`,
                {
                    isScrum: true
                },
                {
                    withCredentials: false
                }
            )
                .then((res) => {
                    console.log(res.data)
                    const { data } = res.data;
                    commit('pushBoard', data.board);
                    for(let flow in flowValues) {
                        dispatch('createFlow', {formValues: {flowName: flowValues[flow]}, boardId: data.board._id});
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        createSprint({commit}, {boardId, sprints}) {
            Vue.axios.patch(`${appConfig.apiUrl}/board/update/${boardId}`,
                {
                    sprints
                },
                {
                    withCredentials: false
                }
            )
                .then((res) => {
                    const { data } = res.data;
                    console.log(res.data);
                    commit('changeSprints', {boardId, sprints: data.board.sprints});
                })
        },
        async addMember({commit}, {userId, boardId}) {
            Vue.axios.patch(`${appConfig.apiUrl}/board/update/${boardId}`,
                {
                    userId,
                    type: 'addMember'
                },
                {
                    withCredentials: false
                }
            )
                .then((res) => {
                    const { data } = res.data;
                    console.log(res.data);
                    commit('changeMembers', {boardId, members: data.board.members});
                })
        }
    }
}