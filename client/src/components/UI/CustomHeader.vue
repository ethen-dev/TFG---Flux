<template>
    <header id="nav">
      <formulate-form 
        v-if="!loggedUser"
        class="login"
        v-model="userFormData"
      >
        <formulate-input
          name="email" 
          type="text" 
          label="email"
        />
        <formulate-input
          name="password" 
          type="password" 
          label="Password"
        />
        <a href="javascript:void(0)" @click="signUp">Sign Up</a>
		&nbsp;or&nbsp;
		<a href="javascript:void(0)" @click="logIn">Log In</a>
      </formulate-form>
      <div 
        v-else
        class="user"
      >
        Hi, {{ loggedUser.email }} - <a href="javascript:void(0)" @click="logout">log out</a>
      </div>  
    </header>
</template>

<script>
import {mapState} from 'vuex';

export default {
	data() {
		return {
			userFormData: {},
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
	},
    methods: {
		signUp() {
			this.$store.dispatch('signup', this.userFormData);
		},
		logIn() {
			this.$store.dispatch('login', this.userFormData);
		},
		logout() {
			this.$store.dispatch('logout');
		}
	}
}
</script>

<style lang="scss" scoped>
	@import '../../sass/main.scss';

	header {
		background-color: #dfdfdf;
		width: 100%;
		padding: 30px;
		display: flex;
		justify-content: flex-end;
		align-items: center;

		.login {
			display: flex;
		}

		a {
			font-weight: bold;
			color: #354685;

			&.router-link-exact-active {
				color: #42b983;
			}
		}
	}
</style>