<template>
    <div>
        <h3>Selecciona un tipo de tablero</h3>
        <FormulateForm
            v-model="formValues"
            @submit="createBoard"
        >
            <FormulateInput 
                name="boardName"
                type="text" 
                label="Nombre del tablero"
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
                :class="{disabled: !this.formValues.type}"
                type="submit"
                :label="buttonText"
            />
        </FormulateForm>
    </div>
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
        },
        buttonText() {
            return this.formValues.type === 'scrum' ? 'Siguiente' : 'Crear Tablero'
        }
    },
    methods: {
        createBoard() {
            if (this.formValues.type === 'kanban') {
                this.$store.dispatch('createKanbanBoard', {formValues: this.formValues, userId: this.userId});
                this.$store.dispatch('closeModal');
                return;
            }
            this.$store.dispatch('openModal', 'ScrumFlow');
            sessionStorage.setItem('boardData', JSON.stringify({formValues: this.formValues, userId: this.userId}));
            this.$store.dispatch('closeModal');
        }
    }
}
</script>

<style lang="scss">
    @import '../../sass/partials/variables';

    .formulate-input {
        &[data-classification='box'][data-type="radio"] {
            .formulate-input-wrapper {
                flex-direction: column-reverse;
                align-items: center;
                box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.19);
                padding: 20px;
                margin: 20px;
                width: 180px;
                .formulate-input-element {
                    input {
                        display: none;
                        + label {
                            max-width: 20px;
                            border-radius: 50% !important;
                        }
                        &:checked + label {
                            background: $primary;
                            border: 3px solid $grey-text;
                        }
                    }
                }
                .formulate-input-label {
                    padding: 5px 15px;
                    margin: 0;
                    margin-bottom: 10px !important;
                    pointer-events: none;
                }
            }
        }
    }
</style>