export default {
  template:`
  <div class="container">
    <div class="row mt-4">
      <div class="col-lg-4 col-md-6" v-for="(item, index) of items" :key="index">
        <router-link :to="'/' + item.id" style="text-decoration: none; color: inherit;">
          <div id="item-card" class="card my-3">
            <img :src="item.item_image" class="card-img-top" alt="mriduava@gmail.com" style={{height:250px]}>
            <div class="card-body">
              <h5 class="card-title">{{item.item_name}}</h5>
              <h6 class="text-secondary">Seller: <span class="text-uppercase text-success">{{item.user.name}}</span></h6>
            </div>
            <ul class="list-group">
              <li class="list-group-item">{{item.initial_price}} SEK</li>
              <li class="list-group-item">Ends: {{converttime(item.stop_date)}}</li>
            </ul>
          </div>
        </router-link>
      </div>
    </div>
  </div>
  `,
  computed:{
    items(){
      return this.$store.state.auctions
    }
  },
  methods:{
    converttime(timestamp){
      return new Date(timestamp).toLocaleString()
    }
  },
  created() {
    this.$store.dispatch('fetchAllAuctionItems')
  }
}