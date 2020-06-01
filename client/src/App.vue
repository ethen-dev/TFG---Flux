<template>
	<div id="app">
		<custom-header v-if="$route.path !== '/' && !$route.path.includes('share')"></custom-header>
		<router-view :not-account-detected="notAccountDetected"/>
		<transition name="fade">
			<modal v-if="storedModalView"></modal>
		</transition>
		<div 
			class="home-button" 
			v-if="$route.params.boardId"
			@click="$router.push(`/user/${$route.params.userId}`)"
		>
			<HomeVariant 
				fill-color="#fff"
			/>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import Modal from './components/UI/Modal';
import CustomHeader from './components/UI/CustomHeader';
import HomeVariant from 'vue-material-design-icons/HomeVariant';

export default {
	components: {
		Modal,
		CustomHeader,
		HomeVariant
	},
	data() {
		return {
			notAccountDetected: false
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
	// watch: {
	// 	loggedUser: {
	// 		handler: function(newValue) {
	// 			// this.$store.dispatch('getBoards', newValue.userId);
	// 			// this.$router.push(`/user/${newValue.userId}`)
	// 		},
	// 		deep: true
	// 	}
	// },
	async mounted() {
		this.$store.dispatch('autoLogin').then((res) => {
			console.log(this.$route.path.includes('share'))
			if (this.$route.path.includes('share')) {
				// console.log('//')
				const data = {
					userId: res.data.data.id,
					boardId: this.$route.params.boardId
				}
				this.$store.dispatch('addMember', data);
				setTimeout(() => {
					this.$router.push({
						path: `/user/${res.data.data.id}`
					});
				}, 500);
				return;
			}
			if (this.$route.path !== '/') {return;}
			this.$router.push({
				path: `/user/${res.data.data.id}`
			});
		}).catch(() => {
			if (this.$route.path.includes('share')) {
				console.log('share')
				this.notAccountDetected = true
			}
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

	.home-button {
		width: 60px;
		height: 60px;
		border-radius: 4px;
		background-color: $primary;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		bottom: 40px;
		right: 40px;
		cursor: pointer;
		&:hover {
			background-color: $grey_text;
		}
	}

</style>
