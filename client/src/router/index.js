import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import ProfileView from '../components/ProfileView.vue'
import Login from '../components/Login.vue'
import DetailItem from '../components/DetalleItem.vue'
import Register from '../components/Register.vue'
import SearchItems from '../components/SearchItems.vue'

import FormularioLibro from '../components/FormularioLibro.vue'

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
      path: '/book/:id',
      name: 'details',
      component: DetailItem
    },
    {
      path: '/search/:str?/:page?',
      name: 'search',
      component: SearchItems
    },

    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },

    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/book/new',
      name: 'newBook',
      component: FormularioLibro
    },

  ]
})

export default router
