<template>
    <div id="modal">
        <div class="modal-background"></div>
        <div class="modal-content">
            <component 
                :is="storedModalView"
            ></component>
        </div>
    </div>
</template>

<script>

export default {
    components: {
        
    },
    computed: {
        storedModalView() {
            return this.$store.state.storedModalView;
        },
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
        }
    }
</style>