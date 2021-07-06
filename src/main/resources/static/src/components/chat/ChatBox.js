import MessageList from './MessageList.js'
import NewMessageInput from './NewMessageInput.js'

export default {
  components: {
    MessageList,
    NewMessageInput,
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
          <input type="text" class="mt-2 form-control" placeholder="Name"> 
          <input type="text" class="form-control mt-1" placeholder="Your message"/>
          <button class="btn btn-outline-success btn-block mt-2">Submit</button> 
        </div>
      </div>
    </div>

  `
}