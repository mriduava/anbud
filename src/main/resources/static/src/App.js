import Home from './views/Home.js'

export default{
    name: "app",
    components: {
       Home
    },
    template: `
        <div id="app">
            <Home/>   
        </div>`,
    created() {
        this.$store.dispatch('fetchAllMessages')
    },
}