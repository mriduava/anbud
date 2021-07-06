import { sendMessage } from '../../socket.js'

export default {
    template: `
        <form @submit.prevent="newMessage">
            <input v-model="username" style="width: 80px" placeholder="sender">
            <input v-model="messageText" placeholder="type new message..">
            <button>SUBMIT</button>
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
        async newMessage() {
            let message = {
                sender: this.username,
                content: this.messageText,
                // timestamp: Date.now()
            }

            // clear input
            this.messageText = ''

            // send message with websocket
            sendMessage(message)
        }
    }
}