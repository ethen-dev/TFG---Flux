<template>
	<div 
		id="board-item"
		@click="boardSubmitHandler"
	>
		<h1>
			{{board.name}}
		</h1>
	</div>
</template>

<script>
export default {
	name: 'BoardItem',
	props: {
		board: {
			type: Object,
			required: true
		}
	},
	computed: {
		userId() {
			return this.$route.params.userId;
		}
	},
	methods: {
		boardSubmitHandler() {
			if (this.board.name === '+') {
				this.$store.dispatch('openModal', 'NewBoard');
				return;
			}
			console.log(this.board)
			if (!this.board.isScrum) {
				this.$router.push(`/user/${this.userId}/board/${this.board._id}`);
				return;
			}
			this.$router.push(`/user/${this.userId}/backlog/${this.board._id}`);
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	#board-item {
		width: 150px;
		height: 150px;
		background-color: #d3d3d3;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
</style>
