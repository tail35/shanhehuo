import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegistertView.vue'
import LoginView from '../views/LoginView.vue'
import PersonDetailsView from '../views/PersonDetailsView.vue'
import ProgramView from '../views/ProgramView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/index',
      name: 'home',
      component: HomeView
    },
    {
      path: '/program',
      name: 'program',
      component: ProgramView
    },    
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },    
    {
      path: '/publish',
      name: 'publish',
      component: HomeView
    },    
    {
      path: '/PersonDetails',
      name: 'PersonDetails',
      component: PersonDetailsView
    },    
    
  ]
})

export default router
