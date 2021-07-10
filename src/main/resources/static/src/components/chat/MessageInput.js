import { sendMessage } from '../../socket.js'

export default {
    template: `
        <form @submit.prevent="newMessage">
            <input type="text" v-model="username" class="mt-2 form-control" placeholder="Name"> 
            <input type="text" v-model="messageText" class="form-control mt-1" placeholder="Your message"/>
            <button class="btn btn-outline-success btn-block mt-2">Submit</button> 
        </form>
    `,
    data() {
        return {
            messageSender: 'Anon',
            messageText: ''
        }
    },
    computed: {
        username: {
            get() {
                return this.$store.state.user && this.$store.state.user.name || this.messageSender
            },
            set(val) {
                this.messageSender = val
            }
        }
    },
    methods: {
        newMessage: function () {
            let message = {
                sender: this.username,
                content: this.messageText,
                // timestamp: Date.now()
            }

            // clear input
            this.messageText = ''
            console.log("CHAT MESSAGE", message);
            // send message with websocket
            sendMessage(message)
        }
    }
}