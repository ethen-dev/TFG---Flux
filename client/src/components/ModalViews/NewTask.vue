<template>
    <div>
        <h3>Crea una tarea</h3>
        <FormulateForm
            class="new-task-container"
            v-model="formValues"
            @submit="createTask"
        >
            <FormulateInput 
                name="taskName"
                type="text" 
                label="Title"
                validation="required|min:3"
            />
            <FormulateInput 
                name="taskDescription"
                type="textarea" 
                label="Description"
                validation="required|min:3"
            />
            <FormulateInput 
                name="priority"
                type="select" 
                value="0"
                :options="{0: 'low', 1: 'min', 2: 'high'}"
                label="priority"
            />
            <FormulateInput
                name="sprint"
                type="select"
                value="0"
                :options="sprints"
                label="Assign to Sprint"
            />
            <FormulateInput
                v-if="hasBoardCategories"
                name="categories"
                :options="boardCategories"
                type="checkbox"
                label="Select categories to this task:"
            />
            <p v-else>
                Para poder asignar una categoria a la tarea, debes crearlas primero desde el tablero.
            </p>
            <FormulateInput
                name="assignedTo"
                :options="boardMembers"
                type="select"
                label="Assign this task to:"
            />
            <FormulateInput
                type="submit"
                label="Create Task"
            />
        </FormulateForm>
    </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import {appConfig} from '../../../config/config';
import Vue from 'vue';

export default {
    data() {
        return {
            formValues: {},
            members: {'': '---'}
        }
    },
    computed: {
        ...mapState({
            flowStore: state => state.flowStore,
            boardStore: state => state.boardStore
        }),
        ...mapGetters([
            'getBoard',
            'getCategories'
        ]),
        flowActive() {
            return this.flowStore.flowActive;
        },
        boardSprints() {
            return this.getBoard(this.$route.params.boardId).sprints;
        },
        sprints() {
            const formattedSprints = {
                0: 'Backlog'
            };
            const sprints = this.boardSprints;
            for (let sprint in sprints) {
                formattedSprints[sprints[sprint]._id] = sprints[sprint].name;
            }
            
            return formattedSprints;
        },
        activeSprint() {
            return this.boardStore.activeSprint;
        },
        hasBoardCategories() {
            return this.getBoard(this.$route.params.boardId).tags.length > 0;
        },
        boardCategories() {
            return this.getCategories(this.$route.params.boardId);
        },
        boardMembers() {
            return this.members;
        }
    },
    beforeMount() {
        this.loadBoardMembers();
    },
    methods: {
        createTask() {
            this.$store.dispatch('createTask', {formValues: this.formValues, flowId: this.flowActive});
            this.$store.dispatch('closeModal');
        },
        loadBoardMembers() {
            const members = this.getBoard(this.$route.params.boardId).members;
            const obj = {};
            members.forEach(async (member) => {
                Vue.set(this.members, member,  await Vue.axios.get(`${appConfig.apiUrl}/user/get/username/${member}`)
                    .then(res => {
                        return res.data.data.userName;
                    }));
            })
            return obj;
        }
    }
}
</script>

<style lang="scss" scoped>
    .new-task-container {
        width: 600px;
        flex-direction: column;
    }
</style>