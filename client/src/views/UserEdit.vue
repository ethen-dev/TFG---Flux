<template>
    <div id="user-edit">
        <formulate-form 
                    v-model="userFormData"
                    @submit="userUpdate"
                >
                    <formulate-input
                        name="email" 
                        type="text" 
                        label="Email"
                        validation="required"
                    />
                    <formulate-input
                        name="userName" 
                        type="text" 
                        label="Username"
                        validation="required|min:3"
                    />

                    <formulate-input
                        name="password" 
                        type="password" 
                        label="Password Nueva"
                        validation="required"
                    />
                    <formulate-input
                        name="repassword" 
                        type="password" 
                        label="Repetir password"
                        validation="required"
                    />
                    <formulate-input
                        type="submit" 
                        label="Actualizar Datos"
                    />
                </formulate-form>
    </div>
</template>

<script>
import md5 from 'blueimp-md5';

export default {
    data() {
        return {
            userFormData: {
                email: this.$store.state.loggedUser.email,
                userName: this.$store.state.loggedUser.userName
            }
        }
    },
    methods: {
        userUpdate() {
            const {email, userName, password} = this.userFormData
            this.$store.dispatch('updateUser', {email, userName, password: md5(password)});
        }
    }
}
</script>

<style lang="scss" scoped>
    #user-edit {
        max-width: 50%;
        margin: 0 auto;
        padding: 40px;;
    }
</style>