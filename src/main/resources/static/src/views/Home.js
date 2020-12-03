import MessageList from '../components/MessageList.js'

export default{
    name: "home",
    components: {
      MessageList
    },
    template:`
      <div>
        <h2>HOME</h2>
        <MessageList/>
      </div>
    `,
    computed:{
    }
  }