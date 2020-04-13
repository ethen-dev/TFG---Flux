import Vue from 'vue';
import {appConfig} from '../../../config/config';


export const taskStore = {
    namespaced: true,
    state: {
    },
    getters: {
        getFlowTasks: (state) => (flowId) => {
            return state[flowId];
        }
    },
    mutations: {
        setTasks(state, value) {
            if (!value.flowId) {return;}
            Vue.set(state, value.flowId, value.tasks);
        },
        pushTasks(state, value) {
            state[value.flowId].push(value);
        },
        spliceTask(state, {flowId, task}) {
            Vue.set(state, flowId, state[flowId].filter(_ => _ != task));
        }
    },
    actions: {
        createTask({commit}, {formValues, flowId}) {
            console.log(`${appConfig.apiUrl}/task/create/${flowId}/${formValues.taskName}`)
            Vue.axios.post(`${appConfig.apiUrl}/task/create/${flowId}/${formValues.taskName}`)
                .then((res) => {
                    console.log(res.data)
                    const { data } = res.data;
                    commit('pushTasks', data.task);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getTasks({commit}, flowId) {
            Vue.axios.get(`${appConfig.apiUrl}/task/getAll/${flowId}`)
                .then((res) => {
                    console.log(res.data)
                    const { data } = res.data;
                    commit('setTasks', {tasks: data.tasks, flowId});
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        updateTasks({commit}, {flowId, value}) {
            const taskToUpdate = value.find(_ => _.flowId != flowId);
            const originalFlow = taskToUpdate.flowId;

            if (value.length === 0 || !taskToUpdate) {return;}
            
            Vue.axios.patch(`${appConfig.apiUrl}/task/update/${taskToUpdate._id}`,
                {
                    flowId
                },
                {
                    withCredentials: false
                }
            )
                .then((res) => {
                    console.log(res.data)
                    const { data } = res.data;
                    commit('pushTasks', data.task);
                    commit('spliceTask', {flowId: originalFlow, task: taskToUpdate});
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
}