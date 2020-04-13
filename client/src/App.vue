<template>
  <div id="app">
    <div id="nav">
      <formulate-form 
        v-if="!loggedUser"
        class="login"
        v-model="login"
        @submit="submitHandler"
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
        <formulate-input 
          type="submit" 
          label="Sign up"
        />
      </formulate-form>
      <div 
        v-else
        class="user"
      >
        Hi, {{ loggedUser.email }}
      </div>  
    </div>
    <router-view/>
    <transition name="fade">
      <modal v-if="storedModalView"></modal>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Modal from './components/UI/Modal';

export default {
  components: {
    Modal
  },
  data() {
    return {
      login: {},
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
      },
      deep: true
    }
  },
  mounted() {
    this.$store.dispatch('autoLogin');
  },
  methods: {
    submitHandler(data) {
      this.$store.dispatch('signup', data);
    }
  }
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

#nav {
  background-color: #dfdfdf;
  width: 100%;
  padding: 30px;
  display: flex;
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
