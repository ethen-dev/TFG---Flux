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
  methods: {
    boardSubmitHandler() {
      if (this.board.name === '+') {
        this.$store.dispatch('openModal', 'NewBoard');
        return;
      }
      this.$router.push(`/board/${this.board._id}`);
      // this.$store.dispatch('getBoardData', this.boardId);
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
