<template>
  <div class="view home">
    <board-item
      boardId="default"
    />
  </div>
</template>

<script>
import BoardItem from '@/components/BoardItem.vue'

export default {
  name: 'Home',
  components: {
    BoardItem
  },
}
</script>
