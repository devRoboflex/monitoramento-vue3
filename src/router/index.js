import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PainelView from '../views/PainelView.vue'
// import LoginView from '@/views/Login/LoginView.vue'

const routes = [
  // {
  //   path: '/',
  //   name: 'Login',
  //   component: LoginView,
  //   meta: {
  //     hideMenu: true
  //   },
  //   // beforeEnter() {
  //   //   alert('You are not authorized to view this page')
  //   //   // block navigation
  //   //   return false
  //   // }
  // },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  
  {
    path: '/painel',
    name: 'painel',
    component: PainelView
  },



]


const router = createRouter({
  mode: 'history',
  history: createWebHistory(),
  routes
})

export default router
