import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DispositivosView from '../views/DispositivosView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dispositivos',
    name: 'dispositivos',
    component: DispositivosView
  },


]


const router = createRouter({
  mode: 'history',
  history: createWebHistory(),
  routes
})

export default router
