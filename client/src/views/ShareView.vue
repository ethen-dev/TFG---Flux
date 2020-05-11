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
        boardId() {
            return this.$route.params.boardId;
        },
        userId() {
            return this.$store.state.loggedUser.userId;
        }
    },
    mounted() {
        setTimeout(() => {  
            const data = {
                userId: this.userId,
                boardId: this.boardId
            }
            this.$store.dispatch('addMember', data)
            setTimeout(() => {
                this.$router.push({
                    path: `/user/${this.userId}/board/${this.boardId}`
                });
            }, 5000);
        }, 1000);
    }
}
</script>