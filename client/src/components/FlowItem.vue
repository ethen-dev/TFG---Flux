<template>
    <div 
        id="flow-item"
        @click="flowSubmitHandler"
    >
    <h1>
        {{flow.name}}
    </h1>
    <div class="task-container" @click="setActiveFlow">
        <div 
            class="task"
            @click="createTask"
        >
            +
        </div>
        <draggable group="flow" v-model="tasks">
            <task-item
                v-for="task in tasks"
                :key="task._id"
                :task="task"
                @click.native="editTask(task._id)"
            />
        </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import TaskItem from './TaskItem';
import { mapState } from 'vuex';

export default {
  name: 'BoardItem',
  components: {
    draggable,
    TaskItem
  },
  props: {
    flow: {
        type: Object,
        required: true
    }
  },
  computed: {
        ...mapState({
            taskStore: state => state.taskStore,
            boardStore: state => state.boardStore
        }),
        tasks: {
            get() {
                return this.$store.getters['getFlowTasks'](this.flow._id, this.activeSprint || '0');
            },
            set(value) {
                this.$store.dispatch('updateTasks', {flowId: this.flow._id, value});
            }
        },
        activeSprint() {
            return this.boardStore.activeSprint;
        }
  },
  mounted() {
      this.getTasks();
  },
  methods: {
    flowSubmitHandler() {
        if (this.flow.name === '+') {
            this.$store.dispatch('openModal', 'NewFlow');
            return;
        }
    },
    createTask() {
        this.$store.dispatch('openModal', 'NewTask');
    },
    getTasks() {
        this.$store.dispatch('getTasks', this.flow._id);
    },
    editTask(id) {
        this.$store.dispatch('setActiveTask', id);
        setTimeout(() => {
            this.$store.dispatch('openModal', 'EditTask');
        }, 0);
    },
    setActiveFlow() {
        this.$store.dispatch('updateFlowActive', this.flow._id);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  #flow-item {
    width: 264px;
    background-color: #d3d3d3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 20px;
    cursor: pointer;
    .task {
        width: 260px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: red;
    }
  }
</style>
