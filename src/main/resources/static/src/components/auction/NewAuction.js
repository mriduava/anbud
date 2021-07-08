export default {
  template:`
  <div class="container">
    <div class="row mt-4">
      <div class="col-lg-3 border rounded bg-light"></div>
      <div class="col-lg-6">
        <h4>Create Ad</h4>
        <hr />
        <form>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text pr-4" id="inputGroup-sizing-default">Item name</span>
          </div>
          <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
        </div>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text pr-1" id="inputGroup-sizing-default">Starting price</span>
          </div>
          <input type="number" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">SEK</span>
          </div>
        </div>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text pr-3" id="inputGroup-sizing-default">Image URL</span>
          </div>
          <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
        </div>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span style="padding-right:30px;" class="input-group-text" id="inputGroup-sizing-default">Ad length</span>
          </div>
          <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
        </div>
        <button type="submit" class="btn btn-sm btn-outline-success d-block px-5 float-right">Submit</button>
        </form>
      </div>
      <div class="col-lg-3 border rounded bg-light"></div>
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
  }
}