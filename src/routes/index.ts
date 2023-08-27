import { createRouter, createWebHistory } from 'vue-router'

import OneColumnLayout from '@/layouts/OneColumnLayout.vue'
import UserRoutes from './UserRoutes.js'
import GuestRoutes from './GuestRoutes.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      meta: { requiresAuth: false },
      children: [...GuestRoutes]
    },
    {
      path: '',
      meta: { requiresAuth: true },
      component: OneColumnLayout,
      children: [...UserRoutes]
    }
  ]
})

//  Middlewares
router.beforeEach((to, from, next) => {
  const redirectToRoute = function (name: string) {
    if (name === from.name) {
      next()
      return
    }

    next({ name })
  }

  const loggedUser = localStorage.getItem('token') || false

  if (to.meta.requiresAuth) {
    if (loggedUser) return next()
    else return redirectToRoute('login')
  } else {
    if (loggedUser) return redirectToRoute('')
    else return next()
  }
})

export default router
