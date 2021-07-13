import Home from './views/Home.js'
import Navbar from './components/partials/Navbar.js'
import Footer from './components/partials/Footer.js'
import ChatBox from './components/chat/ChatBox.js'

export default{
    name: "app",
    components: {
       Home,
       Navbar,
       ChatBox,
       Footer
    },
    template: `
        <div id="app">
            <Navbar/>
            <main class="middle-body">
                <router-view />
            </main>
            <ChatBox/>    
            <Footer/> 
        </div>`,
    created() {
        this.$store.dispatch('fetchAllMessages')
    },
}