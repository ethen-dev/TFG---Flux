<template>
    <div id="root">
        <div class="left">
            <img src="/assets/logo.svg" alt="flux-logo">
        </div>
        <div class="right">
            <h1>Bienvenido a Flux!</h1>
            <p>Aqui podras crear de forma completamente gratuita tableros Kanban y Scrum con los que podras realizar de forma mas productiva tus futuros proyectos.
            </p>
            <p>Solo estas un un paso de formar parte de la familia, unicamente has de crear una cuenta y empezar a disfrutar de todas las ventajas que ofrecemos.</p>
            <div class="user-actions">
                <div class="button">Crear Cuenta</div>
                <div class="button secondary">Log In</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
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
        }
    }
</style>