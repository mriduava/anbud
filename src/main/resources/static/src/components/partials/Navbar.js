export default {
  name: "navbar",
  template:`
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <a class="navbar-brand text-success" href="/"><h4 class="mb-0">ANBUD</h4></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
             <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
           
              <li class="nav-item mt-2">
                <router-link to="/register">Loggain</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  `
}