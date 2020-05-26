<template>
    <div class="avatar">
        {{avatarLetter}}
    </div>
</template>

<script>
export default {
    computed: {
        avatarLetter() {
            if (!this.$store.state.loggedUser) {return;}
            return this.$store.state.loggedUser.userName[0];
        }
    }
}
</script>

<style lang="scss" scoped>
    .avatar {
        width: 70px;
        height: 70px;
        background: #069BFF;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        font-weight: bold;
    }
</style>