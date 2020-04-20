<template>
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
  }
}
</script>
