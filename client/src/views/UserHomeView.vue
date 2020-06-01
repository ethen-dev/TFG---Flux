<template>
  <div>
    Crea o selecciona un tablero para trabajar
    <div class="view home">
      <board-item
        :board="{name: '+'}"
      />
      <board-item
        v-for="board in boards"
        :key="board._id"
        :board="board"
      />
    </div>
  </div>
</template>

<script>
import BoardItem from '@/components/BoardItem.vue'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    BoardItem
  },
  computed: {
    ...mapState({
      boardStore: state => state.boardStore
    }),
    boards() {
      return this.boardStore.boards;
    }
  },
  mounted() {
    this.$store.dispatch('getBoards', this.$route.params.userId);
  }
}
</script>

<style lang="scss" scoped>

  .home {
    display: flex;
    flex-wrap: wrap;
    max-width: 1640px;
    justify-content: center;
    margin: 0 auto;
  }
  
</style>
