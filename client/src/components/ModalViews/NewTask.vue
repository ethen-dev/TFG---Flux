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
            type="submit"
            label="Create Task"
        />
    </FormulateForm>
</template>

<script>
import {mapState} from 'vuex';

export default {
    data() {
        return {
            formValues: {}
        }
    },
    computed: {
        ...mapState({
            flowStore: state => state.flowStore
        }),
        flowActive() {
            return this.flowStore.flowActive;
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