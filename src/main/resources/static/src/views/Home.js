import Navbar from '../components/Navbar.js'
import MessageList from '../components/MessageList.js'
import NewMessageInput from '../components/NewMessageInput.js'
import Foot from '../components/Footer.js'

export default {
  components: {
    Navbar,
    MessageList,
    NewMessageInput,
    Foot
  },
  template: `
    <div>
      <Navbar/>
      <NewMessageInput />
      <MessageList />
      <Foot/>
    </div>
    `
}