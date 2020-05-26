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
        <div class="comment-section">
            <FormulateForm
                class="send-comment"
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
                    <p>
                        <span>
                            {{getCommentDate(comment)}}
                        </span>
                        {{comment.comment}}
                    </p>
                </div>
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
            members: {'': '---'}
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
            'getBoard',
            'getCategories'
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
            return this.getCategories(this.$route.params.boardId);
        },
        boardMembers() {
            return this.members;
        },
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
        },
        getCommentDate(comment) {
            const date = new Date(comment.time);
            const day = date.getDate();
            const month = date.getMonth()+1;
            const year = date.getFullYear();
            const hour = date.getHours();
            const min = date.getMinutes();
            return `${day}/${month}/${year} - ${hour > 10 ? hour : '0' + hour}:${min > 10 ? min : '0' + min}`;
        }
    }
}
</script>

<style lang="scss">
    @import '../../sass/partials/variables';

    .new-task-container {
        display: flex;
        .comment-section {
            margin-left: 20px;
            width: 600px;
            display: flex;
            flex-direction: column-reverse;
            background-color: $primary;
            .send-comment {
                display: flex;
                align-items: flex-end;
                .formulate-input {
                    min-width: auto;
                    margin: 0 20px;
                    margin-bottom: 5px;
                    &[data-classification='textarea'] {
                        textarea {
                            height: 120px;
                            background-color: white;
                            color: $primary;
                        }
                        label {
                            color: white
                        }
                    }
                    &[data-classification='button'] {
                        button {
                            background-color: white;
                            color: $primary;
                            cursor: pointer;
                            height: 120px;
                            margin-bottom: 4px;;
                            &:hover {
                                background-color: #d3d3d3;
                                color: $primary;
                            }
                        }
                    }
                }
            }
            .comments-container {
                height: 100%;
                padding: 15px;
                .comment {
                    width: 80%;
                    padding: 5px 15px;
                    background-color: #d3d3d3;
                    border-radius: 4px;
                    margin-bottom: 10px;
                    position: relative;
                    p { 
                        display: flex;
                        justify-content: space-between;
                        text-align: left;
                        span {
                            white-space: nowrap;
                            margin-right: 10px;
                        }
                    }
                    &:nth-of-type(odd) {
                        margin-left: auto;
                        p {
                            flex-direction: row-reverse;
                            text-align: right;
                            span {
                                margin-left: 10px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>