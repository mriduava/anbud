Vue.use(VueRouter)

import home from './views/Home.js'
import register from './views/Register.js'

export const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      name:"home",
      path: '/', 
      component: home
    },
    {
      name:"register",
      path: '/register', 
      component: register
    }
  ]
});