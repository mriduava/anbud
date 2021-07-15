export default {
  name: "navbar",
  template:`
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-warning">
        <div class="container">
          <a class="navbar-brand text-success">
            <router-link to="/" style="text-decoration: none; color: inherit;"><h2 class="mb-0">ANBUD</h2></router-link>
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
             <ul class="navbar-nav ml-auto mb-2 mb-lg-0">            
             
                <li class="nav-item mt-2 mr-3" >
                  <router-link to="/newauction" style="text-decoration: none; color: inherit;"><h5>Create Ad</h5></router-link>
                </li>
                <li class="nav-item mt-2 mr-3" >
                  <a v-if="isLoggedin" style="text-decoration: none; color: inherit;"><h5>{{name}}</h5></a>
                </li>
                <li class="nav-item mt-2" v-if="isLoggedin">
                  <a v-if="isLoggedin" @click.prevent="logoutButton" style="text-decoration: none; color: inherit; cursor:pointer;"><h5>Logout</h5></a>
                </li>
              
                <li class="nav-item mt-2" v-if="!isLoggedin">
                  <router-link  to="/register" style="text-decoration: none; color: inherit;"><h5>Sign in</h5></router-link>
                </li>
            
            </ul>
          </div>
        </div>
      </nav>
    </div>
  `,
  data() {
    return {
      isLoggedin: false,
      name: "User"
    };
  },
  computed:{
    userStatus(){
      if (this.$store.state.user !== null) {
        this.isLoggedin = true;
        this.name =  this.$store.state.user.name
      }
      this.isLoggedin = false;
    }
  },
  methods: {
    logoutButton() {
      fetch('/logout')
      this.$store.commit('setUser', null)
    }
  },
  watch:{
    isLoggedin(){
      this.userStatus();
      this.logoutButton();
    }
  }
}