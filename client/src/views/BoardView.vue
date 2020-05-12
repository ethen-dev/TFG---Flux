<template>
  <div class="view board" v-if="board">
    <h1>This is a Board page</h1>
    <div class="top-nav">
      <div 
        @click="addSprint()"
        v-if="board.isScrum" 
        class="button"
      >
        Add Sprint
      </div>
      <FormulateInput
          v-model="activeSprint"
          type="select"
          :options="sprints"
          @input="selectActiveSprint"
          label="Sprint Active"
      />
      <div 
        @click="generateShareLink()"
        v-if="board.isScrum" 
        class="button"
      >
        Share Board
      </div>
      {{boardUrl}}
    </div>
    <div class="flow-container">
      <flow-item
        v-for="flow in flows"
        :key="flow._id"
        :flow="flow"
      />
      <flow-item
        v-if="!board.isScrum"
        :flow="{name: '+'}"
      />
    </div>
  </div>
</template>

<script>
import FlowItem from '../components/FlowItem';
import md5 from 'blueimp-md5';
import { mapState, mapGetters } from 'vuex';

export default {
  components: {
    FlowItem
  },
  data() {
    return {
      boardUrl: '',
      activeSprint: '0'
    }
  },
  computed: {
    ...mapState({
      flowStore: state => state.flowStore
    }),
    ...mapGetters([
      'getBoard'
    ]),
    flows() {
      return this.flowStore.flows;
    },
    board() {
      return this.getBoard(this.$route.params.boardId);
    },
    sprints() {
      const formattedSprints = {'0': 'Backlog'};
      const sprints = this.board.sprints;
      for (let sprint in sprints) {
        formattedSprints[sprints[sprint]._id] = sprints[sprint].name;
      }
      
      return formattedSprints;
    }
  },
  beforeCreate() {
    this.$store.dispatch('getFlows', this.$route.params.boardId);
  },
  methods: {
    addSprint() {
      let sprints = this.board.sprints || [];
      if (sprints.length === 0) {
        sprints.push({
          name: `sprint-${sprints.length}`,
          _id: md5(`sprint-${sprints.length}`)
        })
      } else {
        sprints.push({
          name: `sprint-${sprints.length}`,
          _id: md5(`sprint-${sprints.length}`)
        })
      }
      this.$store.dispatch('createSprint', {boardId: this.board._id, sprints})
    },
    generateShareLink() {
      const id = this.board._id;
      const baseUrl = document.location.href.split('#')[0];
      this.boardUrl = `${baseUrl}#/share/${id}`;
    },
    selectActiveSprint() {
      console.log('dddddddd')
      this.$store.dispatch('updateActiveSprint', this.activeSprint)
    }
  }
}
</script>

<style lang="scss" scoped>
.flow-container {
  display: flex;
}
</style>