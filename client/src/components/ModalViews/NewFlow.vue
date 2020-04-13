<template>
    <FormulateForm
        v-model="formValues"
        @submit="createFlow"
    >
        <FormulateInput 
            name="flowName"
            type="text" 
            validation="required|min:5"
        />
        <FormulateInput
            type="submit"
            label="Create Flow"
        />
    </FormulateForm>
</template>

<script>
export default {
    data() {
        return {
            formValues: {}
        }
    },
    methods: {
        createFlow() {
            this.$store.dispatch('flowStore/createFlow', {formValues: this.formValues, boardId: this.$route.params.boardId});
        }
    }
}
</script>

<style lang="scss" scoped>

</style>