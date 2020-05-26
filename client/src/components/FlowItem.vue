<template>
    <div 
        id="flow-item"
        @click="flowSubmitHandler"
    >
    <h1>
        {{flow.name}}
    </h1>
    <vue-scroll :ops="scrollOptions" class="scrollable">
        <div class="task-container" @click="setActiveFlow">
            <div 
                class="task"
                @click="createTask"
            >
                +
            </div>
            <draggable group="flow" v-model="tasks" class="drag">
                <task-item
                    v-for="task in tasks"
                    :key="task._id"
                    :task="task"
                    @click.native="editTask(task._id)"
                />
            </draggable>
        </div>
    </vue-scroll>
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
  data() {
      return {
            scrollOptions: {
                mode: 'native',
                sizeStrategy: 'percent',
                detectResize: true,
                bar: {
                    background: '#d3d3d3'
                }
            }
      }
  },
  computed: {
        ...mapState({
            taskStore: state => state.taskStore,
            boardStore: state => state.boardStore
        }),
        tasks: {
            get() {
                return this.$store.getters['getFlowTasks'](this.flow._id, this.activeSprint || '0', this.activeMember || '', this.activeCategory || '');
            },
            set(value) {
                this.$store.dispatch('updateTasks', {flowId: this.flow._id, value});
            }
        },
        activeSprint() {
            return this.boardStore.activeSprint;
        },
        activeMember() {
            return this.boardStore.activeMember;
        },
        activeCategory() {
            return this.boardStore.activeCategory;
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
    @import '../sass/partials/variables';

    #flow-item {
        width: 260px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        margin: 0 20px;
        min-height: 70vh;
        .drag {
            min-height: 60vh;
        }
        .scrollable {
            max-height: 65vh;
        }
        h1 {
            width: 100%;
            height: 60px;
            background-color: $primary;
            color: white;
            border-radius: 4px;
            margin-bottom: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
        }
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
