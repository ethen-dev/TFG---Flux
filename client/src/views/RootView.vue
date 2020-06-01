<template>
    <div id="root">
        <div class="left">
            <img src="/assets/logo.svg" alt="flux-logo">
        </div>
        <div class="right">
            <div v-if="step === 0 &&!$route.path.includes('share')">
                <h1>Bienvenido a Flux!</h1>
                <p>Aqui podras crear de forma completamente gratuita tableros Kanban y Scrum con los que podras realizar de forma mas productiva tus futuros proyectos.
                </p>
                <p>Solo estas un un paso de formar parte de la familia, unicamente has de crear una cuenta y empezar a disfrutar de todas las ventajas que ofrecemos.</p>
                <div class="user-actions">
                    <div class="button" @click="step = 1">Crear Cuenta</div>
                    <div class="button secondary" @click="step = 2">Log In</div>
                </div>
            </div>
            <div v-if="step === 0 && $route.path.includes('share') && notAccountDetected">
                <h1>Bienvenido a Flux!</h1>
                <p>
                    Hemos detectado que intentas unirte a un tablero compartido.
                    Al parecer no estas registrado con ninguna cuenta, debes tener una cuenta antes de continuar.
                </p>
                <div class="user-actions">
                    <div class="button" @click="step = 1">Crear Cuenta</div>
                    <div class="button secondary" @click="step = 2">Log In</div>
                </div>
            </div>
            <div v-if="step === 1">
                <formulate-form 
                    v-model="userFormData"
                    @submit="signUp"
                >
                    <formulate-input
                        name="email" 
                        type="text" 
                        label="email"
                    />
                    <formulate-input
                        name="userName" 
                        type="text" 
                        label="Nombre de usuario"
                    />
                    <formulate-input
                        name="password" 
                        type="password" 
                        label="Password"
                    />
                    <formulate-input
                        name="password" 
                        type="submit" 
                        label="Crear Cuenta"
                    />
                    o haz&nbsp;
                    <a href="javascript:void(0)" @click="step = 2">Log In</a>
                </formulate-form>
            </div>
            <div v-if="step === 2">
                <formulate-form 
                    v-model="userFormData"
                    @submit="logIn"
                >
                    <formulate-input
                        name="email" 
                        type="text" 
                        label="email"
                    />
                    <formulate-input
                        name="password" 
                        type="password" 
                        label="Password"
                    />
                    <formulate-input
                        name="password" 
                        type="submit" 
                        label="Log In"
                    />
                    o&nbsp;
                    <a href="javascript:void(0)" @click="step = 1">Crea una cuenta</a>
                </formulate-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        notAccountDetected: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            step: 0,
            userFormData: {},
        }
    },
    methods: {
        signUp() {
            this.$store.dispatch('signup', this.userFormData).then((res) => {     
                if (this.notAccountDetected) {
                    console.log(res)
                    const data = {
                        userId: res.data.data.id,
                        boardId: this.$route.params.boardId
                    }
                    this.$store.dispatch('addMember', data);
                    setTimeout(() => {
                        this.$router.push({
                            path: `/user/${res.data.data.id}`
                        });
                    }, 500);
                    return;
                }
                this.$router.push({
                    path: `/user/${res.data.data.id}`
                })
            })
		},
		logIn() {
            this.$store.dispatch('login', this.userFormData).then((res) => {
                if (this.notAccountDetected) {
                    const data = {
                        userId: res.data.data._id,
                        boardId: this.$route.params.boardId
                    }
                    this.$store.dispatch('addMember', data);
                    setTimeout(() => {
                        this.$router.push({
                            path: `/user/${res.data.data.id}`
                        });
                    }, 500);
                    return;
                }
                this.$router.push({
                    path: `user/${res.data.data._id}`
                })
            })
		},
    }
}
</script>

<style lang="scss">
    @import '../sass/partials/variables';

    #root {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: $primary;
        height: 100vh;
        .left, .right {
            flex: 1;
        }
        .right {
            h1 {
                max-width: 50%;
                color: white;
                margin-bottom: 20px;
            }
            p {
                max-width: 50%;
                margin-bottom: 20px;
                text-align: justify;
                color: white;
            }

            .user-actions {
                display: flex;
                justify-content: space-around;
                max-width: 50%;
            }
            .button {
				padding: 10px 20px;
				background-color: white;
				border-radius: 4px;
				border: 1px solid white;
				color: $primary;
				cursor: pointer;
                height: max-content;
                min-width: 150px;
				&:hover {
					background-color: $primary;
					border: 1px solid white;
					color: white;
                }
                &.secondary {
                    background: $primary;
                    color: white;
                    &:hover {
                        background-color: white;
                        border: 1px solid white;
                        color: $primary;
                    }
                }
            }
            .formulate-input {
                max-width: 50%;
                .formulate-input-wrapper {
                    display: flex;
                    justify-content: flex-start;
                }
                &[data-classification='text'] {
                    label {
                        color: white;
                    }
                }
                &[data-classification='button'] {
                    button {
                        background-color: white;
                        border: 1px solid white;
                        &:hover {
                            background-color: $primary;
                            color: white;
                            border: 1px solid white;
                        }
                    }
                }
            }
        }
    }
</style>