<template>
    <div>
        <h3>Añade una columna</h3>
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
    </div>
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
            this.$store.dispatch('createFlow', {formValues: this.formValues, boardId: this.$route.params.boardId});
            this.$store.dispatch('closeModal');
        }
    }
}
</script>

<style lang="scss" scoped>

</style>