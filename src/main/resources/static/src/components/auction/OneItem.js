export default {
  template:`
  <div class="container">
    <div class="row mt-4">
      <div class="col-lg-6">
         <img :src="oneitem.item_image" class="item-detail-img rounded" alt="mriduava@gmail.com" style={{height:250px]}>
         <div class="mt-3">
           <h4 class="text-dark">{{oneitem.item_name}}</h4>
           <hr />
           <h5 class="text-secondary">Seller: <span class="text-uppercase text-success">{{oneitem.user.name}}</span></h5>
         </div>
      </div>
      <div class="col-lg-3 bg-light rounded border">
        <div class="d-flex justify-content-between mt-3">
          <h5>Highest Bid</h5>
          <h5>20 SEK</h5>
        </div>
        <div class="d-flex flex-column mt-5">
          <input type="text" class="p-1"/>
          <input type="button" value="PLACE BID" 
            class="mt-1 text-white bg-secondary py-1 rounded" 
            v-bind:style="{'cursor': 'pointer', 'outline': 'none'}"/>
        </div>
      </div>
    </div>
    <div class="col-lg-3">

    </div>
  </div>
  `,
  data() {
    return {
      oneitem: {}
    };
  },
  methods:{          
    async fetchOneAuctionItem(){
      let id = this.$route.params.id;
      let oneitem = await fetch('/rest/auctions/' + id)
      oneitem = await oneitem.json()
      this.oneitem = oneitem;
      console.log(oneitem);
    }
  },
  created() {
    this. fetchOneAuctionItem();
  }
}