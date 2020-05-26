<template>
	<div id="app">
		<custom-header v-if="$route.path !== '/'"></custom-header>
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
				this.$store.dispatch('getBoards', newValue.userId);
				// this.$router.push(`/user/${newValue.userId}`)
			},
			deep: true
		}
	},
	async mounted() {
		this.$store.dispatch('autoLogin').then((res) => {
			if (this.$route.path !== '/') {return;}
			this.$router.push({
				path: `/user/${res.data.data.id}`
			})
		})
	},
	
}
</script>

<style lang="scss">
	@import './sass/partials/variables';
	@import './sass/main';

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: 'Montserrat';
	}

	.view {
		height: 100%;
		padding: 25px;
	}

	body {
		background-color: $primary_grey;
	}

	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}

</style>
