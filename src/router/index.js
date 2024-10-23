import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/HomeView.vue';
import Dispatcher from '../views/DispatcherView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dispatcher',
    name: 'Dispatcher',
    component: Dispatcher
  }
]

const router = createRouter({ history: createWebHashHistory(), routes })
export default router
