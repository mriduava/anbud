import {store} from '../store.js'

export default{
    store,
    name: "home",
    components: {},
    template:`
      <div>
        <h2>HOME</h2>
      </div>
    `,
    computed:{
      messages(){
        return this.$store.messages
      }
    }
  }