import Vue from 'vue'
import VueRouter from 'vue-router'
import RootView from '../views/RootView.vue'

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
    component: () => import('../views/BoardView')
  },
  {
    path: '/user/:userId',
    name: 'User Home Page',
    component: () => import('../views/UserHomeView')
  },
  {
    path: '/user/:userId/backlog/:boardId',
    name: 'User Backlog Scrum View',
    component: () => import('../views/BacklogView')
  }
]

const router = new VueRouter({
  routes
})

export default router
