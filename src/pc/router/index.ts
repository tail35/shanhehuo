import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegistertView.vue'
import LoginView from '../views/LoginView.vue'
import PersonDetailsView from '../views/PersonDetailsView.vue'
import ProgramDetailsView from '../views/ProgramDetailsView.vue'
import MyInfoEditView from '../views/MyInfoEditView.vue'
import MyProgramEditView from '../views/MyProgramEditView.vue'
import ProgramList from '../views/ProgramList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [    
    {
      path: '/index',
      name: 'home',
      component: HomeView
    },
    {
      path: '/ProgramDetailsView',
      name: 'ProgramDetailsView',
      component: ProgramDetailsView
    },
    {
      path: '/ProgramList',
      name: 'ProgramList',
      component: ProgramList
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
    {
      path: '/MyInfoEditView',
      name: 'MyInfoEditView',
      component: MyInfoEditView
    },
    {
      path: '/MyProgramEditView',
      name: 'MyProgramEditView',
      component: MyProgramEditView
    },
  ]
})

export default router
