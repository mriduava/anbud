export default {
    template: `
        <button v-if="!$store.state.user" @click="signInUser">Sign in with Google</button>
    `,
    data() {
        return {
            auth2: null
        }
    },
    methods: {
        signInUser() {
            this.auth2.grantOfflineAccess().then(this.signInCallback);
        },
        async signInCallback(authResult) {
            console.log('authResult', authResult);
          
            if (authResult['code']) {
              let result = await fetch('/storeauthcode', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/octet-stream; charset=utf-8',
                  'X-Requested-With': 'XMLHttpRequest',
                },
                body: authResult['code']
              });
              if(result.ok) {
                  let user = await fetch('/mypage')
                  user = await user.json()
                  this.$store.commit('setUser', user)
              }
            } else {
              console.error('Google auth error');
            }
          }
    },
    created() {
        const CLIENT_ID = "REPLACE_THIS_WITH_YOUR_CLIENT_ID.apps.googleusercontent.com";
        gapi.load('auth2', () => {
            this.auth2 = gapi.auth2.init({
              client_id: CLIENT_ID,
            });
          });
    }
}