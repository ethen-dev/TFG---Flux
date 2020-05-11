<template>
    <div>
        <FormulateForm
        v-model="formValues"
        @submit="createFlowAndBoard"
    >
        <FormulateInput 
            v-for="(input, index) in inputs"
            :key="input.key"
            :name="`flowName-${index}`"
            type="text" 
            validation="required|min:5"
        />
        <div @click="inputs.push(0)">
            Add Flow Value
        </div>
        <FormulateInput
            type="submit"
            label="Create Board"
        />
    </FormulateForm>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formValues: {},
            inputs: [0]
        }
    },
    methods: {
        createFlowAndBoard() {
            const {formValues} = JSON.parse(sessionStorage.getItem('boardData'));
            const scrumBoardData = {formValues, userId: this.$route.params.userId, flowValues: this.formValues};
            console.log(scrumBoardData)
            this.$store.dispatch('createScrumBoard', scrumBoardData);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>