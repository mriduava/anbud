export default {
  template:`
    <div class="message-item">
      id: {{message.id}}<br>
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