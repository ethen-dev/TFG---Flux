import Vue from 'vue';
import {appConfig} from '../../../config/config';

const getDefaultState = () => {
    return {
        activeTask: ''
    }
};

export const taskStore = {
    state: getDefaultState(),
    getters: {
        getFlowTasks: (state) => (flowId, sprintId, memberId, category) => {
            if (!state[flowId]) {return [];}
            const sprint = (_) => (_.sprintId === sprintId);
            const member = memberId ? (_) => (_.assignedTo === memberId) : (_) => (_);
            const tag = category ? (_) => (_.tags.includes(category)) : (_) => (_);
            return state[flowId].filter(sprint).filter(member).filter(tag);
        },
        getActiveTask: (state) => (flowId, taskId) => {
            return state[flowId].filter(_ => _._id === taskId)[0];
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
        },
        resetStore(state) {
            Object.assign(state, getDefaultState())
        },
        changeActiveTask(state, value) {
            state.activeTask = value;
        },
        pushComment(state, {comment, taskId, owner, time, flowId}) {
            state[flowId].filter(_ => _._id === taskId)[0].comments.push({
                comment,
                owner,
                time
            });
        },
        changeTask(state, {data, flowId}) {
            const task = state[flowId].filter(_ => _._id === data._id)[0];
            for (let prop in task) {
                task[prop] = data[prop];
            }
        }
    },
    actions: {
        setActiveTask({commit}, id) {
            commit('changeActiveTask', id);
        },
        createTask({commit}, {formValues, flowId}) {
            console.log(`${appConfig.apiUrl}/task/create/${flowId}/${formValues.taskName}`)
            Vue.axios.post(`${appConfig.apiUrl}/task/create/${flowId}/${formValues.taskName}`,
                {
                    description: formValues.taskDescription,
                    priority: formValues.priority,
                    sprint: formValues.sprint || '',
                    tags: formValues.categories,
                    assignedTo: formValues.assignedTo
                },
                {
                    withCredentials: false
                }
            )
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
        },
        sendComment({commit}, {comment, taskId, owner, time, flowId}) {
            Vue.axios.patch(`${appConfig.apiUrl}/task/update/${taskId}`,
                {
                    comment: {
                        comment,
                        owner,
                        time
                    }
                },
                {
                    withCredentials: false
                }
            )
                .then((res) => {
                    console.log(res.data)
                    commit('pushComment', {comment, taskId, owner, time, flowId});
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        updateEditedTask({ commit, state }, { priority, categories, sprint, taskDescription, taskName, flowId, assignedTo}) {
            Vue.axios.patch(`${appConfig.apiUrl}/task/update/${state.activeTask}`,
                {
                    priority: parseInt(priority),
                    sprintId: sprint,
                    description: taskDescription,
                    name: taskName,
                    tags: categories,
                    assignedTo
                },
                {
                    withCredentials: false
                }
            )
                .then((res) => {
                    console.log(res.data)
                    const { data } = res.data;
                    commit('changeTask', {data: data.task, flowId});
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
}