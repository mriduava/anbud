import { sendBidData } from '../../socket.js'

export default {
  name: "oneitem",
  template:`
  <div class="container">
    <div class="row mt-4">
      <div class="col-lg-6">
         <img :src="oneitem.item_image" class="item-detail-img rounded" alt="mriduava@gmail.com" style={{height:250px]}>
         <div class="mt-3">
           <h4 class="text-dark">{{oneitem.item_name}}</h4>
           <hr />
           <h5 class="text-secondary">Seller: <span class="text-uppercase text-success">{{oneitem.owner.name}}</span></h5>
         </div>
      </div>
      <div class="col-lg-3 bg-light rounded border">
        <div class="d-flex justify-content-between mt-3" v-if="bidsList.length === 0">
          <h5 class="text-danger">Initial price</h5>
          <h5 class="text-danger" >{{oneitem.initial_price}} SEK</h5>
        </div>
        <div class="d-flex justify-content-between mt-3"  v-else>
          <h5 class="text-danger">Highest bid</h5>
          <h5 class="text-danger">{{highestBid}} SEK</h5>
        </div>
        <hr />
        <div class="d-flex flex-column mt-5">
          <h6 class="text-secondary">Put a value greater than the highest bid.</h6>
          <form @submit.prevent="newBid(oneitem.id)">
            <input type="text" v-model="bid" class="form-control mt-1" placeholder="Bid price"/>
            <button class="btn btn-outline-success btn-sm btn-block mt-2 px-5">Submit</button> 
          </form>
        </div>
      </div>
      <div class="col-lg-3 rounded border">
        <div class="d-flex justify-content-between mt-3">
          <h5 class="text-secondary">Bidder</h5>
          <h5 class="text-secondary">Bid (SEK)</h5>
        </div>
        <hr />
        <div v-for="(bid, index) in bidsList" :key="index">
          <div class="d-flex justify-content-between">
            <h6 class="text-capitalize text-info">{{bid.bidder.name}}</h6>
            <h6 class="text-success">{{bid.bid}}</h6>
          </div>       
        </div>
      </div>
    </div>

  </div>
  `,
  data() {
    return {
      oneitem: {},
      highestBid: 0,
      bidsList: [],
      bid: ''
    };
  },
  computed:{
    bids(){
       return this.$store.state.bids
    }
  },
  methods:{          
    async fetchOneAuctionItem(){
      let id = this.$route.params.id;
      let oneitem = await fetch('/rest/auctions/' + id)
      oneitem = await oneitem.json()
      this.oneitem = oneitem;
    },
    getBidderInfo(){
      let id = this.$route.params.id;
      for (let bid of this.bids) {
        if (+bid.auction_id == id) {
          this.bidsList.push(bid)
        }        
      }
    },
    getHighestBid(){
      this.highestBid = Math.max.apply(Math, this.bidsList.map(m => m.bid))
    },
    newBid(auctionId){
      if (this.bid<=this.highestBid) {
        alert(`Please write a value more than ${this.highestBid}`)
      }else if(this.bid <= this.oneitem.initial_price ){
        alert(`Please write a value more than ${this.oneitem.initial_price}`)
      }else{
        let data = {
          auction_id: auctionId,
          bid: +this.bid,
          bidder_id: 3,
          created_at: Date.now()
        }
        console.log('BID DATA: ', data);
        sendBidData(data)
      }
    },
  },
  created() {
    this.getBidderInfo()
    this.fetchOneAuctionItem();
    this.$store.dispatch('fetchAllBids');
    this.getHighestBid();
  }
}