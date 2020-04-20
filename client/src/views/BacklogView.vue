<template>
  <div class="view board">
	<h1>This is a Board page</h1>
	<div class="flow-container">
	<flow-item
		v-if="sprint"
		:flow="sprint"
	/>
	<flow-item
		:flow="flow"
	/>
	</div>
  </div>
</template>

<script>
import FlowItem from '../components/FlowItem';
import { mapState } from 'vuex';

export default {
	components: {
		FlowItem
	},
	data() {
		return {
			flow: {
				tasks: [],
				boardId: this.$route.params.boardId,
				name: 'Tasks'
			}
		}
	},
	computed: {
		...mapState({
			flowStore: state => state.flowStore
		}),
		flows() {
			return this.flowStore.flows;
		}
	},
	beforeCreate() {
		this.$store.dispatch('flowStore/getFlows', this.$route.params.boardId);
	},
}
</script>

<style lang="scss" scoped>
.flow-container {
  display: flex;
}
</style>