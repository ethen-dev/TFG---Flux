import Vue from 'vue'
import VueRouter from 'vue-router'
import RootView from '../views/RootView.vue'
import BoardView from '../views/BoardView.vue'
import UserHomeView from '../views/UserHomeView.vue'
import UserEdit from '../views/UserEdit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Root View',
    component: RootView
  },
  {
    path: '/user/:userId/board/:boardId',
    name: 'User Board View',
    component: BoardView
  },
  {
    path: '/user/:userId',
    name: 'User Home Page',
    component: UserHomeView
  },
  {
    path: '/share/:boardId',
    name: 'Share Page',
    component: RootView
  },
  {
    path: '/edit-user/:userId',
    name: 'User Edit Page',
    component: UserEdit
  },
]

const router = new VueRouter({
  routes,
})

export default router
