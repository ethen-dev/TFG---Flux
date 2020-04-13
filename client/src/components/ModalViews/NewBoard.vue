<template>
    <FormulateForm
        v-model="formValues"
        @submit="createBoard"
    >
        <FormulateInput 
            name="boardName"
            type="text" 
            validation="required|min:5"
        />
        <FormulateInput
            type="submit"
            label="Create Board"
        />
    </FormulateForm>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
            formValues: {}
        }
    },
    computed: {
        ...mapState({
            store: state => state 
        }),
        userId() {
            return this.store.loggedUser.userId;
        }
    },
    methods: {
        createBoard() {
            this.$store.dispatch('boardStore/createBoard', {formValues: this.formValues, userId: this.userId});
        }
    }
}
</script>

<style lang="scss" scoped>

</style>