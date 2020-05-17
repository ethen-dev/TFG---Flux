import Vue from 'vue';
import {appConfig} from '../../../config/config';


const getDefaultState = () => {
    return {
        boards: [],
        activeSprint: '0',
        activeMember: '',
        activeCategory: ''
    }
}

export const boardStore = {
    state: getDefaultState(),
    getters: {
        getBoard: (state) => (id) => {
            if (!state.boards.filter(_ => _._id === id)[0]) { return; }
            return state.boards.filter(_ => _._id === id)[0];
        },
        getCategories: state => id => {
            if (!state.boards.filter(_ => _._id === id)[0]) { return; }
            const categories =  state.boards.filter(_ => _._id === id)[0].tags;
            const obj = {};
            categories.forEach(category => {
                obj[category] = category;
            });
            return obj;
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
        },
        changeActiveSprint(state, value) {
            state.activeSprint = value;
        },
        changeActiveMember(state, value) {
            state.activeMember = value;
        },
        changeActiveCategory(state, value) {
            state.activeCategory = value;
        },
        changeCategories(state, {boardId, categories}) {
            Vue.set(state.boards.find(_ => _._id === boardId), 'tags', categories);
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
        },
        updateActiveSprint({commit}, sprint) {
            commit('changeActiveSprint', sprint);
        },
        updateActiveMember({ commit }, member) {
            commit('changeActiveMember', member);
        },
        updateActiveCategory({ commit }, category) {
            commit('changeActiveCategory', category);
        },
        addCategory({commit}, {category, boardId}) {
            Vue.axios.patch(`${appConfig.apiUrl}/board/update/${boardId}`,
                {
                    category
                },
                {
                    withCredentials: false
                }
            )
                .then((res) => {
                    const { data } = res.data;
                    console.log(res.data);
                    commit('changeCategories', { boardId, categories: data.board.tags });
                })
        }
    }
}