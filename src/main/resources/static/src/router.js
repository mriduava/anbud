Vue.use(VueRouter)

import home from './views/Home.js'

export const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      name:"home",
      path: '/', 
      component: home
    }
  ]
});