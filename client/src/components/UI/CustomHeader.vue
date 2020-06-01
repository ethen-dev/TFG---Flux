<template>
    <header id="nav">
		<div class="navigation">
			<img src="/assets/logo.svg" alt="flux logo">
			<div class="button" @click="showFilters = !showFilters" v-if="$route.params.boardId ">
				Filtros
			</div>
			<div class="avatar-container">
				<avatar @click.native="menuVisible = !menuVisible">
				</avatar>
				<div class="logout" @click="logout">
					Log out
				</div>
				<div class="menu" v-if="menuVisible">
					<ul>
						<li @click="$router.push(`/user/${$route.params.userId}`); menuVisible = false">Inicio</li>
						<li @click="$router.push(`/edit-user/${$route.params.userId}`); menuVisible = false">Editar Usuario</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="filter-container" v-if="$route.params.boardId && showFilters">
				<FormulateForm
					v-model="categories"
					@submit="addCategory"
				>
				<FormulateInput
					name="category"
					type="text"
					label="Escribe una categoria y pulsa Enter"
				/>
				</FormulateForm>
				<FormulateInput
					v-model="activeCategory"
					type="select"
					@input="selectActiveCategory"
					:options="boardCategories"
					label="Filtra segun categoria"
				/>
				<FormulateInput
					v-model="activeMember"
					type="select"
					@input="selectActiveMember"
					:options="boardMembers"
					label="Filtra por miembro"
				/>
				<div 
					@click="addSprint()"
					v-if="board && board.isScrum" 
					class="button"
				>
					Añade un Sprint
				</div>
				<FormulateInput
					v-model="activeSprint"
					v-if="board && board.isScrum" 
					type="select"
					:options="sprints"
					@input="selectActiveSprint"
					label="Filtra por Sprint"
				/>
				<div 
					@click="generateShareLink()"
					class="button"
				>
					Comparte el tablero
				</div>
			</div>
			<span class="share" v-if="boardUrl">	
				{{boardUrl}}
			</span>
    </header>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import md5 from 'blueimp-md5';
import Vue from 'vue';
import {appConfig} from '../../../config/config';
import Avatar from '../Avatar';

export default {
	components: {
		Avatar
	},
	data() {
		return {
			boardUrl: '',
			activeSprint: '0',
			activeMember: '',
			activeCategory: '',
			categories: {},
			members: {'': 'All'},
			menuVisible: false,
			showFilters: true
		}
	},
	computed: {
		...mapState({
			boards: state => state.boardStore,
			app: state => state,
		}),
		...mapGetters([
			'getBoard',
			'getCategories'
		]),
		loggedUser() {
			return this.$store.state.loggedUser;
		},
		board() {
			return this.getBoard(this.$route.params.boardId);
		},
		boardCategories() {
			return {'': 'All', ...this.getCategories(this.$route.params.boardId)};
		},
		boardMembers() {
			return this.members;
		},
		sprints() {
			const formattedSprints = {'0': 'Backlog'};
			const sprints = this.board.sprints;
			for (let sprint in sprints) {
				formattedSprints[sprints[sprint]._id] = sprints[sprint].name;
			}
			
			return formattedSprints;
		},
	},
	watch: {
		$route(oldval, newval) {
			if (newval.params.boardId || oldval.params.boardId) {
				setTimeout(() => {
					this.loadBoardMembers();
				}, 500);
				this.boardUrl = '';
				this.showFilters = false;
			}
		}
	},
	mounted() {
		if (this.$route.params.boardId) {
			setTimeout(() => {
				this.loadBoardMembers();
			}, 500);
		}
	},
    methods: {
		signUp() {
			this.$store.dispatch('signup', this.userFormData);
		},
		logIn() {
			this.$store.dispatch('login', this.userFormData);
		},
		logout() {
			this.$store.dispatch('logout');
			this.$router.push('/');
		},
		addSprint() {
			let sprints = this.board.sprints || [];

			if (sprints.length === 0) {
				sprints.push({
				name: `sprint-${sprints.length}`,
				_id: md5(`sprint-${sprints.length}`)
				})
			} else {
				sprints.push({
				name: `sprint-${sprints.length}`,
				_id: md5(`sprint-${sprints.length}`)
				})
			}
			this.$store.dispatch('createSprint', {boardId: this.board._id, sprints})
		},
		generateShareLink() {
			const id = this.board._id;
			const baseUrl = document.location.href.split('#')[0];
			this.boardUrl = `${baseUrl}#/share/${id}`;
		},
		selectActiveSprint() {
			this.$store.dispatch('updateActiveSprint', this.activeSprint)
		},
		selectActiveCategory() {
			this.$store.dispatch('updateActiveCategory', this.activeCategory)
		},
		selectActiveMember() {
			this.$store.dispatch('updateActiveMember', this.activeMember)
		},
		addCategory() {
			this.$store.dispatch('addCategory', {category: this.categories.category, boardId: this.$route.params.boardId});
			this.categories.category = ''
		},
		loadBoardMembers() {
			if (!this.board) {return;}
			const members = this.board.members;
			const obj = {};
			members.forEach(async (member) => {
				Vue.set(this.members, member,  await Vue.axios.get(`${appConfig.apiUrl}/user/get/username/${member}`)
				.then(res => {
					return res.data.data.userName;
				}));
			})
			return obj;
		}
	}
}
</script>

<style lang="scss">
	@import '../../sass/partials/variables.scss';

	header {
		background-color: $primary;
		width: 100%;
		padding: 30px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		.filter-container {
			display: flex;
			justify-content: flex-start;
			align-items: flex-end;
			flex-wrap: wrap;
			.formulate-input {
				min-width: auto;
				margin: 0 20px;
				.formulate-input-wrapper {
					display: flex;
					flex-direction: column;
					align-items: flex-start;
				}
				&[data-classification='select'] {
					select {
						width: 150px;
						height: 42px;
						margin-top: 4px;
					}
					label {
						color: white;
					}
				}
				&[data-classification='text'] {
					input {
						width: 100%;
					}
					label {
						color: white;
					}
				}
			}
	}
	.share {
		padding: 10px 20px;
		background: white;
		border-radius: 4px;
		margin-top: 15px;
		overflow-wrap: anywhere;
	}
	.navigation {
		max-width: 1640px;
		width: 100%;
		height: 160px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		img {
			width: 20%;
			height: 150px;
		}
	}

		.login {
			display: flex;
		}

		a {
			font-weight: bold;
			color: #354685;

			&.router-link-exact-active {
				color: #42b983;
			}
		}
		.avatar-container {
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			div {
				cursor: pointer;
			}
			.logout {
				padding-top: 10px;
				cursor: pointer;
				color: white;
				&:hover {
					color: $grey_text;
				}
			}
			.menu {
				min-width: 250px;
				padding: 25px;
				background-color: white;
				position: absolute;
				top: 80px;
				right: 0;
				border-radius: 4px;
				ul {
					list-style: none;
					li {
						text-align: left;
						padding: 15px 15px;
						border-radius: 4px;
						&:hover {
							background: $primary;
							color: white;
						}
					}
				}
			}
		}
		.button {
			padding: 10px 20px;
			background-color: white;
			border-radius: 4px;
			border: 1px solid white;
			color: $primary;
			cursor: pointer;
			height: max-content;
			&:hover {
				background-color: $primary;
				border: 1px solid white;
				color: white;
			}
		}
	}
</style>