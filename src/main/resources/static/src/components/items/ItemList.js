export default {
  template:`
  <div class="container">
    <div class="row mt-4">
      <div class="col-lg-4" v-for="(item, index) in items" :key="index">
        <div class="card shadow">
          <img :src="item.item_image" class="card-img-top" alt="mriduava@gmail.com" style={{height:250px]}>
          <div class="card-body">
            <h5 class="card-title">{{item.item_name}}</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Price: {{item.initial_price}} SEK</li>
            <li class="list-group-item">Start: {{start_time}}</li>
            <li class="list-group-item">End: {{end_time}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  `,
  computed:{
    items(){
      return this.$store.state.auctions
    },
    start_time(){
      return new Date(this.items.start_date).toLocaleString()
    },
    end_time(){
      return new Date(this.items.stop_date).toLocaleString()
    }
  }
}