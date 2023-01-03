import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import ProfileView from '../components/ProfileView.vue'
import Login from '../components/ProfileView.vue'
import DetailItem from '../components/DetalleItem.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/books',
      name: 'home',
      component: MainView
    },
    //Ejemplo paginacion: localhost:3000/books?page=1&pageSize=4
    {
      path: '/books/:page?',
      name: 'catalog',
      component: MainView
    },
    {
      path: '/book/:id?',
      name: 'details',
      component: DetailItem
    },

    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },

    {
      path: '/login',
      name: 'loginn',
      component: Login
    },


  ]
})

export default router
