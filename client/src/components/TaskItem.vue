<template>
    <div id="task-card">
        <div class="title-container">
            <p>{{board.name}}</p>
            <h3>{{task.name}}</h3>
        </div>
        <div class="info-container">
            <div class="info-target"></div>
            <div class="info-target"></div>
            <div class="info-target"></div>
            <div class="info-target"></div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapState({
            boardStore: state => state.boardStore
        }),
        board() {
            return this.boardStore.boards.filter(_ => _._id === this.$route.params.boardId)[0];
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../sass/partials/variables';

    #task-card {
        width: 260px;
        min-height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: space-between;
        background-color: white;
        color: $grey_text;
        padding: 10px 20px;
        border-radius: 4px;
        margin-bottom: 2px;
        cursor: pointer;
        .title-container {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            h3 {
                font-size: 14px;
                font-weight: 400;
            }
            p {
                font-size: 10px;
                opacity: 0.8;
            }
        }
        .info-container {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            width: 40px;
            .info-target {
                width: 16px;
                height: 16px;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: $primary;
                border-radius: 2px;
            }
        }
    }
</style>