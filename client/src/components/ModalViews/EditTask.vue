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

export default {
    data() {
        return {
            formValues: {},
            comment: ''
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
        }
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
        }
    }
}
</script>

<style lang="scss" scoped>

</style>