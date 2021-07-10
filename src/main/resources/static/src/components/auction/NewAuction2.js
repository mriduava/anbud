import { sendAuctionItem } from '../../socket.js'

export default {
  template:`
  <div class="container">
    <div class="row mt-4">
      <div class="col-lg-3 border rounded bg-light"></div>
      <div class="col-lg-6">
        <h4>Create Ad</h4>
        <hr />
        <form @submit.prevent="newAuction">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text pr-4">Item name</span>
            </div>
            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" id="itemName" v-model="itemName" />
          </div>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text pr-1" >Starting price</span>
            </div>
            <input type="number" v-model="startingPrice" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
            <div class="input-group-prepend">
              <span class="input-group-text">SEK</span>
            </div>
          </div>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text pr-3" id="inputGroup-sizing-default">Image URL</span>
            </div>
            <input type="text" v-model="imageURL" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
          </div>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span style="padding-right:30px;" class="input-group-text" id="inputGroup-sizing-default">End date</span>
            </div>
            <input type="text" v-model="endDate" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
          </div>
          <button type="submit" class="btn btn-sm btn-outline-success d-block px-5 float-right">Submit</button>
        </form>
      </div>
      <div class="col-lg-3 border rounded bg-light"></div>
    </div>
  </div>
  `,
  data() {
    return {
      itemName: $('#itemName').val(),
      startingPrice: "",
      imageURL: '',
      endDate: ''
    }
  },
  computed: {
  },
  methods: {
    newAuction: () => {
      console.log('HELLO');
      let itemData = {
        item_name: this.itemName,
        initial_price: this.startingPrice,
        item_image: this.imageURL,
        owner_id: 1,
        start_date: Date.now(),
        stop_date: Date.now()
      }

      console.log("AUCTIOM DATA: ", itemData);
      sendAuctionItem(itemData)
    }
  }
}