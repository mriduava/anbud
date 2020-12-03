export default {
  template:`
    <div class="message-item">
      sender: {{message.sender}}<br>
      content: {{message.content}}<br>
      time: {{time}}<br>
    </div>
  `,
  props: ['message'],
  computed:{
    time(){
      return new Date(this.message.timestamp).toLocaleString()
    }
  }
}