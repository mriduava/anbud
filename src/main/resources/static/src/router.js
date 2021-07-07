Vue.use(VueRouter)

import home from './views/Home.js'
import item from './components/items/OneItem.js'
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
    },
    {
      name:"item",
      path: '/:id', 
      component: item
    },
  ]
});