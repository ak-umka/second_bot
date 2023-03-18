import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AllAreaView from '../views/AllAreaView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/info',
      name: 'info',
      component: AllAreaView
    },
    {
      path: '/area/:id',
      name: 'areaId',
      component: () => import('../views/AreaNameView.vue')
    },
    {
      path: '/area/:id/:name',
      name: 'areaIdName',
      component: () => import('../views/AreaIdView.vue')
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('../views/MapView.vue')
    },
    {
      path: '/violation',
      name: 'violation',
      component: () => import('../views/ViolationView.vue')
    }
  ]
})

export default router
