import MessageList from '../components/MessageList.js'
import NewMessageInput from '../components/NewMessageInput.js'

export default {
  components: {
    MessageList,
    NewMessageInput
  },
  template: `
    <div>
      <h2>Home Page</h2>

      <NewMessageInput />
      <MessageList />

    </div>
    `
}