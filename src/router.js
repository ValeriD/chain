import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        {
          name: 'Home',
          path: '',
          component: () => import('@/views/dashboard/pages/Blocks'),
        },
        {
          name: 'Charts',
          path: '/pages/charts',
          component: () => import('@/views/dashboard/pages/Charts'),
        },
        {
          name: 'Transactions',
          path: 'pages/transactions',
          component: () => import('@/views/dashboard/pages/Transactions'),
        },
        {
          name: 'Transaction Details',
          path: 'pages/transactions/details',
          component: () => import('@/views/dashboard/pages/TransactionDetails'),
        },
        {
          name: 'Addresses',
          path: 'tables/addresses',
          component: () => import('@/views/dashboard/pages/Addresses'),
        },
        {
          name: "Address details",
          path: 'addresses/details',
          component: () => import('@/views/dashboard/pages/AddressDetails')
        }
       
      ],
    },
  ],
})
export default router
