const Login = () => import('@/views/GuestViews/Login.vue')

export default [
  {
    path: '',
    redirect: { name: 'login' },
    name: 'auth-redirect'
  },
  {
    path: 'login',
    component: Login,
    name: 'login'
  }
]
