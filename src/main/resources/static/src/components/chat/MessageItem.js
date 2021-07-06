export default {
  template:`
    <div class="message-item">
      <hr/>
      <h6 class="text-info">{{message.sender}}</h6>
      <p class="" style="font-size: 10px">{{time}}</p>
      <p class="pb-0">{{message.content}}</p>
    </div>
  `,
  props: ['message'],
  computed:{
    time(){
      return new Date(this.message.timestamp).toLocaleString()
    }
  }
}