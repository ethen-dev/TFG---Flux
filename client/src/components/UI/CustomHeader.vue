<template>
    <header id="nav">
      <!-- <formulate-form 
        v-if="!loggedUser"
        class="login"
        v-model="userFormData"
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
        <a href="javascript:void(0)" @click="signUp">Sign Up</a>
		&nbsp;or&nbsp;
		<a href="javascript:void(0)" @click="logIn">Log In</a>
      </formulate-form>
      <div 
        v-else
        class="user"
      >
        Hi, {{ loggedUser.email }} - <a href="javascript:void(0)" @click="logout">log out</a>
      </div>   -->
		<div class="navigation">
			<img src="/assets/logo.svg" alt="flux logo">
			<div class="filter-container" v-if="$route.params.boardId">
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
				<span class="share" v-if="boardUrl">	
					Comparte este enlace para añadir miembors al tablero: {{boardUrl}}
				</span>
			</div>
			<div class="avatar-container">
				<avatar>
				</avatar>
				Log out
			</div>
		</div>
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
			members: {'': 'All'}
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
		justify-content: center;
		align-items: center;

		.navigation {
			max-width: 1640px;
			width: 100%;
			height: 160px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			img {
				width: 200px;
				height: 150px;
			}
			.filter-container {
				display: flex;
				justify-content: flex-start;
				align-items: flex-end;
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
			.share {
				position: absolute;
				padding: 10px 20px;
				background: white;
				border-radius: 4px;
				top: 160px;

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
	}
</style>