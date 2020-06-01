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
    path: '/share/:boardId',
    name: 'Share Page',
    component: () => import('../views/ShareView')
  },
  {
    path: '/edit-user/:userId',
    name: 'User Edit Page',
    component: () => import('../views/UserEdit')
  },
]

const router = new VueRouter({
  routes,
})

export default router
