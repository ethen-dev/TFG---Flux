<template>
  <div class="view board" v-if="board">
    <div class="flow-container">
      <flow-item
        v-for="flow in flows"
        :key="flow._id"
        :flow="flow"
      />
      <flow-item
        v-if="!board.isScrum"
        class="add"
        :flow="{name: '+'}"
      />
    </div>
    <div class="board-name">
      {{board.name}}
    </div>
  </div>
</template>

<script>
import FlowItem from '../components/FlowItem';
import { mapState, mapGetters } from 'vuex';


export default {
  components: {
    FlowItem
  },
  computed: {
    ...mapState({
      flowStore: state => state.flowStore
    }),
    ...mapGetters([
			'getBoard',
			'getCategories'
		]),
    flows() {
      return this.flowStore.flows;
    },
    board() {
			return this.getBoard(this.$route.params.boardId);
		},
  },
  beforeCreate() {
    this.$store.dispatch('getFlows', this.$route.params.boardId);
  }
}
</script>

<style lang="scss" scoped>
@import '../sass/partials/variables';

.flow-container {
  display: flex;
}

.board-name {
  position: fixed;
  bottom: 40px;
  padding: 10px 25px;
  min-width: 150px;
  left: calc(50% - 75px);
  border-radius: 4px;
  background-color: $primary;
  color: white;
}
</style>