Vue.use(VueRouter)

import home from './views/Home.js'
import item from './components/auction/OneItem.js'
import newitem from './components/auction/NewAuction.js'
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
      name:"newitem",
      path: '/newauction', 
      component: newitem
    },
    {
      name:"item",
      path: '/:id', 
      component: item
    },
  ]
});