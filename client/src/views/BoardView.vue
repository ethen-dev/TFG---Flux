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
        :flow="{name: '+'}"
      />
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
.flow-container {
  display: flex;
}
</style>