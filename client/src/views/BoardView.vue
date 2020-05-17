<template>
  <div class="view board" v-if="board">
    <h1>This is a Board page</h1>
    <div class="top-nav">
      <FormulateForm
        v-model="categories"
        @submit="addCategory"
      >
        <FormulateInput
          name="category"
          type="text"
          label="write a category and press enter"
      />
      </FormulateForm>
      <FormulateInput
        v-model="activeCategory"
        type="select"
        @input="selectActiveCategory"
        :options="boardCategories"
        label="Filter by Category"
      />
      <FormulateInput
        v-model="activeMember"
        type="select"
        @input="selectActiveMember"
        :options="boardMembers"
        label="Fiter by User"
      />
      <div 
        @click="addSprint()"
        v-if="board.isScrum" 
        class="button"
      >
        Add Sprint
      </div>
      <FormulateInput
          v-model="activeSprint"
          v-if="board.isScrum" 
          type="select"
          :options="sprints"
          @input="selectActiveSprint"
          label="Sprint Active"
      />
      <div 
        @click="generateShareLink()"
        class="button"
      >
        Share Board
      </div>
      {{boardUrl}}
    </div>
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
import md5 from 'blueimp-md5';
import { mapState, mapGetters } from 'vuex';
import {appConfig} from '../../config/config';
import Vue from 'vue';

export default {
  components: {
    FlowItem
  },
  data() {
    return {
      boardUrl: '',
      activeSprint: '0',
      activeMember: '',
      activeCategory: '',
      categories: {},
      members: {'': 'All'}
    }
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
    sprints() {
      const formattedSprints = {'0': 'Backlog'};
      const sprints = this.board.sprints;
      for (let sprint in sprints) {
        formattedSprints[sprints[sprint]._id] = sprints[sprint].name;
      }
      
      return formattedSprints;
    },
    boardCategories() {
      return {'': 'All', ...this.getCategories(this.$route.params.boardId)};
    },
    boardMembers() {
      return this.members;
    },
  },
  beforeCreate() {
    this.$store.dispatch('getFlows', this.$route.params.boardId);
  },
  mounted() {
    setTimeout(() => {
      this.loadBoardMembers();
    }, 500);
  },
  methods: {
    addSprint() {
      let sprints = this.board.sprints || [];
      if (sprints.length === 0) {
        sprints.push({
          name: `sprint-${sprints.length}`,
          _id: md5(`sprint-${sprints.length}`)
        })
      } else {
        sprints.push({
          name: `sprint-${sprints.length}`,
          _id: md5(`sprint-${sprints.length}`)
        })
      }
      this.$store.dispatch('createSprint', {boardId: this.board._id, sprints})
    },
    generateShareLink() {
      const id = this.board._id;
      const baseUrl = document.location.href.split('#')[0];
      this.boardUrl = `${baseUrl}#/share/${id}`;
    },
    selectActiveSprint() {
      this.$store.dispatch('updateActiveSprint', this.activeSprint)
    },
    selectActiveCategory() {
      this.$store.dispatch('updateActiveCategory', this.activeCategory)
    },
    selectActiveMember() {
      this.$store.dispatch('updateActiveMember', this.activeMember)
    },
    addCategory() {
      this.$store.dispatch('addCategory', {category: this.categories.category, boardId: this.$route.params.boardId});
      this.categories.category = ''
    },
    loadBoardMembers() {
      const members = this.board.members;
      const obj = {};
      members.forEach(async (member) => {
        Vue.set(this.members, member,  await Vue.axios.get(`${appConfig.apiUrl}/user/get/username/${member}`)
          .then(res => {
            return res.data.data.userName;
          }));
      })
      return obj;
    }
  }
}
</script>

<style lang="scss" scoped>
.flow-container {
  display: flex;
}
</style>