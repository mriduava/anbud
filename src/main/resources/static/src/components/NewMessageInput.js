export default {
  template: `
    <form @submit.prevent="newMessage">
        <input v-model="messageText" placeholder="type new message..">
        <button>SEND</button>
    </form>
  `,
  data() {
    return {
      messageSender: 'Anon',
      messageText: ''
    }
  },
  methods: {
    async newMessage() {
      let message = {
          sender: 'Mriduava',
          content: this.messageText,
          timestamp: Date.now()
      }

      this.messageText = ''

      let res = await fetch('/rest/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(message)
      })
      // res = await res.json()
      // this.$store.commit('prependMessage', res)
        
    }
  }
}