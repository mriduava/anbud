 import AuctionItem from './AuctionItem.js'

 export default{
  components:{
    AuctionItem
  },
  template:`
    <div>
      <AuctionItem
        v-for="item of items" 
        :items = "item"
        :key="item.id"
      />
    </div>
  `,
  computed:{
    items(){
      return this.$store.state.auctions
    }
  }
}