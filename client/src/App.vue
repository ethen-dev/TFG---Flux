<template>
	<div id="app">
		<custom-header></custom-header>
		<router-view/>
		<transition name="fade">
			<modal v-if="storedModalView"></modal>
		</transition>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import Modal from './components/UI/Modal';
import CustomHeader from './components/UI/CustomHeader';

export default {
	components: {
		Modal,
		CustomHeader
	},
	data() {
		return {
		}
	},
	computed: {
		...mapState({
			boards: state => state.boardStore,
			app: state => state,
		}),
		loggedUser() {
			return this.$store.state.loggedUser;
		},
		boardStore() {
			return this.boards;
		},
		storedModalView() {
			return this.app.storedModalView;
		}
	},
	watch: {
		loggedUser: {
			handler: function(newValue) {
				this.$store.dispatch('boardStore/getBoards', newValue.userId);
				this.$router.push(`/user/${newValue.userId}`)
			},
			deep: true
		}
	},
	mounted() {
		this.$store.dispatch('autoLogin');
	},
	
}
</script>

<style lang="scss">
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	.view {
		height: 100vh;
		padding: 25px;
	}

	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
</style>
