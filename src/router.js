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
        // Dashboard
        {
          name: 'Home',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        // Pages
        {
          name: 'Charts',
          path: 'pages/user',
          component: () => import('@/views/dashboard/pages/UserProfile'),
        },
        // {
        //   name: 'Notifications',
        //   path: 'components/notifications',
        //   component: () => import('@/views/dashboard/component/Notifications')
        // },
        // {
        //   name: 'Icons',
        //   path: 'components/icons',
        //   component: () => import('@/views/dashboard/component/Icons')
        // },
        {
          name: 'Transactions',
          path: 'components/typography',
          component: () => import('@/views/dashboard/component/Typography'),
        },
        // Tables
        {
          name: 'Adresses',
          path: 'tables/regular-tables',
          component: () => import('@/views/dashboard/tables/RegularTables'),
        },
        // // Maps
        // {
        //   name: 'Google Maps',
        //   path: 'maps/google-maps',
        //   component: () => import('@/views/dashboard/maps/GoogleMaps')
        // },
        // // Upgrade
        // {
        //   name: 'Upgrade',
        //   path: 'upgrade',
        //   component: () => import('@/views/dashboard/Upgrade')
        // }
      ],
    },
  ],
})
export default router
