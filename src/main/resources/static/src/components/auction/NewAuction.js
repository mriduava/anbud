import { sendAuctionItem } from '../../socket.js'

export default {
    template: `
    <div class="container">
      <div class="row">
        <div class="col-lg-3 border rounded bg-light"></div>
        <div class="col-lg-6 mt-5">
          <h4>Create ad</h4>
          <hr />
          <form @submit.prevent="newAuction">
            <input type="text" v-model="itemName" class="mt-2 form-control" placeholder="Item name"/> 
            <input type="text" v-model="imageURL" class="form-control mt-1" placeholder="Image URL"/>
            <input type="text" v-model="initialPrice" class="form-control mt-1" placeholder="Initial price"/>
            <button class="btn btn-outline-success btn-sm float-right mt-2 px-5">Submit</button> 
          </form>
        </div>
        <div class="col-lg-3 border rounded bg-light"></div>
      </div>
    </div>
    `,
    data() {
      return {
        itemName: '',
        imageURL: '',
        initialPrice: ''
      }
    },
    computed: {
    },
    methods: {
      newAuction: function () {
        let data = {
          item_name: this.itemName,
          item_image: this.imageURL,
          initial_price: this.initialPrice,
          owner_id: 3,
          start_date: Date.now(),
          stop_date: Date.now()
        }
        sendAuctionItem(data)
      }
    }
}