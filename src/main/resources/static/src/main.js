import App from './App.js'
import {store} from './store.js'
import {router} from './router.js'

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')