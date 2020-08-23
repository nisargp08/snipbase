import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from './firebase'

//Plugins
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import 'animate.css/animate.css'
//SCSS
import './assets/scss/app.scss'
//Use the plugin
Vue.use(Buefy);

Vue.config.productionTip = false

let app
auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
  //TO maintain state on page refresh/reload
  if (user) {
    store.dispatch('fetchUserProfile', user)
  }
})

