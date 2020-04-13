<template>
    <div id="task-card">
        {{task.name}}
    </div>
</template>

<script>
export default {
    props: {
        task: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
    #task-card {
        width: 260px;
        min-height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: purple;
        color: white;
    }
</style>