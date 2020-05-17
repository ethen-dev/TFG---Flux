<template>
    <div class="new-task-container">
        <FormulateForm
            v-model="formValues"
            @submit="saveTaskChanges"
        >
            <FormulateInput 
                :value="activeTask.name"
                name="taskName"
                type="text" 
                label="Title"
                validation="required|min:3"
            />
            <FormulateInput 
                :value="activeTask.description"
                name="taskDescription"
                type="textarea" 
                label="Description"
                validation="required|min:3"
            />
            <FormulateInput 
                :value="activeTask.priority.toString()"
                name="priority"
                type="select"
                :options="{0: 'low', 1: 'min', 2: 'high'}"
                label="priority"
            />
            <FormulateInput
                name="sprint"
                type="select"
                :options="sprints"
                :value="activeTask.sprintId"
                label="Assign to Sprint"
            />
            <FormulateInput
                v-if="hasBoardCategories"
                name="categories"
                :options="boardCategories"
                :value="activeTask.tags"
                type="checkbox"
                label="This is a label for all the options"
            />
            <p v-else>
                Para poder asignar una categoria a la tarea, debes crearlas primero desde el tablero.
            </p>
            <FormulateInput
                name="assignedTo"
                :options="boardMembers"
                :value="activeTask.assignedTo"
                type="select"
                label="Assign this task to:"
            />
            <FormulateInput
                type="submit"
                label="Save Task Changes"
            />
        </FormulateForm>
        <FormulateForm
            @submit="sendComment"
        >
            <FormulateInput 
                v-model="comment"
                name="comment"
                type="textarea" 
                label="Write a comment"
                validation="min:3"
            />
            <FormulateInput
                type="submit"
                label="Send comment"
            />
        </FormulateForm>
        <div class="comments-container">
            <div 
                class="comment"
                :class="{self: $route.params.userId === comment.owner}"
                v-for="comment in activeTask.comments"
                :key="comment.id"
            >
                {{new Date(comment.time)}}--{{comment.comment}}
            </div>
        </div>
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
            comment: '',
            members: {}
        }
    },
    computed: {
        ...mapState({
            flowStore: state => state.flowStore,
            taskStore: state => state.taskStore,
            boardStore: state => state.boardStore
        }),
        ...mapGetters([
            'getActiveTask',
            'getBoard'
        ]),
        flowActive() {
            return this.flowStore.flowActive;
        },
        activeTaskId() {
            return this.taskStore.activeTask;
        },
        activeTask() {
            return this.getActiveTask(this.flowActive,this.activeTaskId);
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
        hasBoardCategories() {
            return this.getBoard(this.$route.params.boardId).tags.length > 0;
        },
        boardCategories() {
            const categories = this.getBoard(this.$route.params.boardId).tags;
            const obj = {};
            categories.forEach(category => {
                obj[category] = category;
            })
            return obj;
        },
        boardMembers() {
            return this.members;
        }
    },
    beforeMount() {
        this.loadBoardMembers();
    },
    methods: {
        saveTaskChanges() {
            this.formValues.flowId = this.flowActive;
            this.$store.dispatch('updateEditedTask', this.formValues);
        },
        sendComment() {
            const comment = {
                comment: this.comment,
                time: new Date().getTime(),
                owner: this.$route.params.userId,
                taskId: this.activeTaskId,
                flowId: this.flowActive 
            }
            this.$store.dispatch('sendComment', comment)
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

</style>