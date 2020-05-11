<template>
    <div>
        
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters([
            'getBoard'
        ]),
        board() {
            return this.getBoard(this.$route.params.boardId);
        },
        userId() {
            return this.$store.state.loggedUser.userId;
        }
    },
    mounted() {
        const board = this.board;
        board.members.push(this.userId);
        this.$store.dispatch('addMember', board).then(() => {
            this.$router.push(`user/${this.userId}/board/${board._id}`);
        })
    }
}
</script>