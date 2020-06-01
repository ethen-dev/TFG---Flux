<template>
    <div>
        <h3>Añade las columnas que contendra tu tablero</h3>
        <FormulateForm
            v-model="formValues"
            @submit="createFlowAndBoard"
        >
            <FormulateInput 
                v-for="(input, index) in inputs"
                :key="input.key"
                :name="`flowName-${index}`"
                type="text" 
                validation="required"
                :label="`Columna ${index + 1}:`"
            />  
            <div class="add"  @click="inputs.push(0)">
                + 
            </div>
            <FormulateInput
                :class="{disabled: !this.formValues['flowName-0']}"
                type="submit"
                label="Crear Tablero"
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
            this.$store.dispatch('closeModal');
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../../sass/partials/variables';

    .add {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: $primary;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        font-size: 24px;
        font-weight: bold;
        cursor: pointer;
        &:hover {
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.19);
        }
    }
</style>