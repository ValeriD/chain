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
          name: 'Block Details',
          path: '/blocks/details',
          component: () => import('@/views/dashboard/pages/BlockDetails')
        },
        {
          name: 'Charts',
          path: '/charts',
          component: () => import('@/views/dashboard/pages/Charts'),
        },
        {
          name: 'Transactions',
          path: 'transactions',
          component: () => import('@/views/dashboard/pages/Transactions'),
        },
        {
          name: 'Transaction Details',
          path: 'transactions/details',
          component: () => import('@/views/dashboard/pages/TransactionDetails'),
        },
        {
          name: 'Addresses',
          path: 'addresses',
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
