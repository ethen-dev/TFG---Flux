<template>
    <div id="modal">
        <div 
            class="modal-background"
            @click="closeModal"
        ></div>
        <div class="modal-content">
            <component 
                :is="storedModalView"
            ></component>
        </div>
    </div>
</template>

<script>
import NewBoard from '../ModalViews/NewBoard';
import NewFlow from '../ModalViews/NewFlow';
import NewTask from '../ModalViews/NewTask';
import ScrumFlow from '../ModalViews/ScrumFlow';
import EditTask from '../ModalViews/EditTask';

export default {
    components: {
        NewBoard,
        NewFlow,
        NewTask,
        ScrumFlow,
        EditTask
    },
    computed: {
        storedModalView() {
            return this.$store.state.storedModalView;
        }
    },
    methods: {
        closeModal() {
            this.$store.dispatch('closeModal');
        }
    }
}
</script>

<style lang="scss" scoped>
    @import './../../sass/main.scss';

    #modal {
        display: flex;
        justify-content: center;
        .modal-background {
            position: absolute;
            top: 0;
            left: 0;
            background-color: black;
            opacity: 0.8;
            width: 100%;
            height: 100vh;
            z-index: 0;
        }
        .modal-content {
            padding: 29px 70px 35px 70px;
            border-radius: 4px;
            background-color: $modal_content_bg;
            position: absolute;
            top: 30%;
            width: 380px;
            min-height: 240px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>