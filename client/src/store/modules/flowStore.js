import Vue from 'vue';
import {appConfig} from '../../../config/config';


export const flowStore = {
    namespaced: true,
    state: {
        flows: [],
        flowActive: ''
    },
    getters: {},
    mutations: {
        setFlows(state, value) {
            state.flows = value;
        },
        pushFlow(state, value) {
            state.flows.push(value);
        },
        changeFlowActive(state, value) {
            state.flowActive = value;
        }
    },
    actions: {
        updateFlowActive({commit}, flowId) {
            commit('changeFlowActive', flowId);
        },
        getFlows({commit}, boardId) {
            Vue.axios.get(`${appConfig.apiUrl}/flow/getAll/${boardId}`)
                .then((res) => {
                    console.log(res.data)
                    const { data } = res.data;
                    commit('setFlows', data.flows);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        createFlow({commit}, {formValues, boardId}) {
            Vue.axios.post(`${appConfig.apiUrl}/flow/create/${boardId}/${formValues.flowName}`)
                .then((res) => {
                    console.log(res.data)
                    const { data } = res.data;
                    commit('pushFlow', data.flow);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
}