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
            name="type"
            type="radio"
            label="Choose Board Type"
            :options="[
                {
                    value: 'scrum',
                    label: 'Scrum Board',
                    id: 'scrum'
                },
                {
                    value: 'kanban',
                    label: 'Kanban Board'
                }
            ]"
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
            if (this.formValues.type === 'kanban') {
                this.$store.dispatch('boardStore/createKanbanBoard', {formValues: this.formValues, userId: this.userId});
                return;
            }
            this.$store.dispatch('boardStore/createScrumBoard', {formValues: this.formValues, userId: this.userId});
        }
    }
}
</script>

<style lang="scss" scoped>

</style>