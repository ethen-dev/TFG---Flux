<template>
    <div id="task-card">
        <div class="title-container">
            <p>{{board.name}}</p>
            <h3>{{task.name}}</h3>
        </div>
        <div class="info-container">
            <div class="info-target"><CheckboxBlankCircle class="icon" :fill-color="getFillColor()"/></div>
            <div class="info-target"><span class="avatar">{{owner[0]}}</span></div>
            <div class="info-target"><Paperclip class="icon disabled" fill-color="#fff"/></div>
            <div class="info-target"><MessageText class="icon disabled" fill-color="#fff"/></div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';
import {appConfig} from '../../config/config';
import CheckboxBlankCircle from 'vue-material-design-icons/CheckboxBlankCircle.vue';
import Paperclip from 'vue-material-design-icons/Paperclip.vue';
import MessageText from 'vue-material-design-icons/MessageText.vue';
import Vue from 'vue';

export default {
    components: {
        CheckboxBlankCircle,
        Paperclip,
        MessageText
    },
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            iconCollor: '#fff',
            owner: '-'
        }
    },
    computed: {
        ...mapState({
            boardStore: state => state.boardStore
        }),
        board() {
            return this.boardStore.boards.filter(_ => _._id === this.$route.params.boardId)[0];
        }
    },
    mounted() {
        setTimeout(() => {
            this.getTaskOwnerName();
        }, 100)
    },
    methods: {
        getFillColor() {
            if (this.task.priority === 2) {
                return '#F65353';
            }
            if (this.task.priority === 1) {
                return '#FFEE06';
            }
            return '#ffffff';
        },
        getTaskOwnerName() {
            if (!this.task.assignedTo) {return;}
            Vue.axios.get(`${appConfig.apiUrl}/user/get/username/${this.task.assignedTo}`)
                .then(res => {
                    this.owner = res.data.data.userName;
                });
        },
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
                .icon {
                    width: 16px;
                    height: 16px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    svg {
                        width: 12px;
                        height: 12px;
                    }
                }
                .avatar {
                    font-size: 10px;
                    color: white;
                    font-weight: bold;
                }
            }
        }
    }
</style>