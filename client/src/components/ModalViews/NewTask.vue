<template>
    <FormulateForm
        v-model="formValues"
        @submit="createTask"
    >
        <FormulateInput 
            name="taskName"
            type="text" 
            validation="required|min:5"
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
            this.$store.dispatch('taskStore/createTask', {formValues: this.formValues, flowId: this.flowActive});
        }
    }
}
</script>

<style lang="scss" scoped>

</style>