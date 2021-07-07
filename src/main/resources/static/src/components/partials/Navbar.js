export default {
  name: "navbar",
  template:`
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-warning">
        <div class="container">
          <a class="navbar-brand text-success">
            <router-link to="/" style="text-decoration: none; color: inherit;"><h2 class="mb-0">ANBUD</h2></router-link>
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
             <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
           
              <li class="nav-item mt-2">
                <router-link to="/register"><h4>Sign in</h4></router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  `
}