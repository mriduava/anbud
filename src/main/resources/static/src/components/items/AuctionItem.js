export default {
  template:`
    <div class="auction-item">
      <hr/>
      <h6 class="text-info">{{items.item_name}}</h6>
    </div>
  `,
  props: ['items'],
  computed:{
    time(){
      return new Date(this.items.start_date).toLocaleString()
    }
  }
}