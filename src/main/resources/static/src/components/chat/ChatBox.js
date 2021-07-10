import MessageList from './MessageList.js'
import MessageInput from './MessageInput.js'

export default {
  components: {
    MessageList,
    MessageInput,
  },
  template: `
    <div>
      <input id="chat" type="checkbox"/> 
      <label class="chat-btn" for="chat"> 
        <p class="pt-2 text-center">CHAT</p> 
      </label>

      <div class="chat-container border">
        <div class="chat-form m-2"> 
          <div class="message-box">
            <MessageList />
          </div>
          <MessageInput/>
        </div>
      </div>
    </div>

  `
}