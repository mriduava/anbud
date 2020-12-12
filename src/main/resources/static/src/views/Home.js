import Navbar from '../components/Navbar.js'
import MessageList from '../components/MessageList.js'
import NewMessageInput from '../components/NewMessageInput.js'
import UserRegistration from '../components/UserRegistration.js'
import Foot from '../components/Footer.js'

export default {
  components: {
    Navbar,
    UserRegistration,
    MessageList,
    NewMessageInput,
    Foot
  },
  template: `
    <div>
      <Navbar/>
      <UserRegistration/>
      <NewMessageInput />
      <MessageList />
      <Foot/>
    </div>
    `
}