const Home = () => import('@/views/UserViews/Home.vue')
const PerformanceHistory = () => import('@/views/UserViews/PerformanceHistory.vue')
const Portfolio = () => import('@/views/UserViews/Portfolio.vue')
import FourOhFour from '@/components/FourOhFour.vue'

export default [
  {
    path: '',
    component: Home,
    name: 'home'
  },
  {
    path: 'performance-history/:fund_id',
    component: PerformanceHistory,
    name: 'performance-history'
  },
  {
    path: 'portfolio',
    component: Portfolio,
    name: 'portfolio'
  },
  { path: '/:pathMatch(.*)*', component: FourOhFour, name: '404', alias: '404' }
]
