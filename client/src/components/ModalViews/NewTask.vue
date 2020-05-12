<template>
    <FormulateForm
        v-model="formValues"
        @submit="createTask"
    >
        <FormulateInput 
            name="taskName"
            type="text" 
            label="Title"
            validation="required|min:3"
        />
        <FormulateInput 
            name="taskDescription"
            type="text" 
            label="Description"
            validation="required|min:3"
        />
        <FormulateInput 
            name="priority"
            type="select" 
            value="0"
            :options="{0: 'low', 1: 'min', 2: 'high'}"
            label="priority"
        />
        <FormulateInput
            name="sprint"
            type="select"
            value="0"
            :options="sprints"
            label="Assign to Sprint"
        />
        <FormulateInput
            type="submit"
            label="Create Task"
        />
    </FormulateForm>
</template>

<script>
import {mapState, mapGetters} from 'vuex';

export default {
    data() {
        return {
            formValues: {}
        }
    },
    computed: {
        ...mapState({
            flowStore: state => state.flowStore,
            boardStore: state => state.boardStore
        }),
        ...mapGetters([
            'getBoard'
        ]),
        flowActive() {
            return this.flowStore.flowActive;
        },
        boardSprints() {
            return this.getBoard(this.$route.params.boardId).sprints;
        },
        sprints() {
            const formattedSprints = {
                0: 'Backlog'
            };
            const sprints = this.boardSprints;
            for (let sprint in sprints) {
                formattedSprints[sprints[sprint]._id] = sprints[sprint].name;
            }
            
            return formattedSprints;
        },
        activeSprint() {
            return this.boardStore.activeSprint;
        }
    },
    methods: {
        createTask() {
            this.$store.dispatch('createTask', {formValues: this.formValues, flowId: this.flowActive});
        }
    }
}
</script>

<style lang="scss" scoped>

</style>