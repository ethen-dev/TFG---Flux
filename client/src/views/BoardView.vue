<template>
  <div class="view board">
    <h1>This is a Board page</h1>
    <div class="top-nav">
      <div 
        @click="addSprint()"
        v-if="board.isScrum" 
        class="button"
      >
        Add Sprint
      </div>
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
      boardUrl: ''
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
      }
      this.$store.dispatch('createSprint', {boardId: this.board._id, sprints})
    },
    generateShareLink() {
      const id = this.board._id;
      const baseUrl = document.location.href.split('#')[0];
      this.boardUrl = `${baseUrl}#/share/${id}`;
    }
  }
}
</script>

<style lang="scss" scoped>
.flow-container {
  display: flex;
}
</style>