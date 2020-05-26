<template>
	<div 
		id="board-item"
		:class="{'add-board': board.name === '+'}"
		@click="boardSubmitHandler"
	>
		<p :class="{'type-box': board.name === '+'}">
			{{board.name}}
		</p>
		<dic class="type-box" v-if="board._id">
			{{boardType}}
		</dic>
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
		},
		boardType() {
			if(!this.board._id) {return '';}
			return this.board.isScrum ? 'S': 'K';
		}
	},
	methods: {
		boardSubmitHandler() {
			if (this.board.name === '+') {
				this.$store.dispatch('openModal', 'NewBoard');
				return;
			}
			console.log(this.board)

			this.$router.push(`/user/${this.userId}/board/${this.board._id}`);
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import '../sass/partials/variables';

	#board-item {
		min-width: 260px;
		max-width: 260px;
		height: 100px;
		background-color: white;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		border-radius: 4px;
		align-items: center;
		font-weight: 600;
		font-size: 14px;
		padding: 20px 0;
		margin: 0 8px;
		margin-bottom: 35px;
		cursor: pointer;
		&.add-board {
			justify-content: center;
			.type-box{
				width: 55px;
				height: 55px;
				border-radius: 4px;
			}
		}
		.type-box {
			width: 28px;
			height: 28px;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: $primary;
			color: white;
			font-weight: bold;
			font-size: 13px;
			border-radius: 4px;
		}
	}
</style>
