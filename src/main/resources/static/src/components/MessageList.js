 import MessageItem from './MessageItem.js'

 export default{
  components:{
    MessageItem
  },
  template:`
    <div>
      <MessageItem 
        v-for="message of messages" 
        :message="message"
        :key="message.id"
      />
    </div>
  `,
  computed:{
    messages(){
      return this.$store.state.messages
    }
  }
}