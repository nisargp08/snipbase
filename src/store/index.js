import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userProfile : {

    }
  },
  mutations: {
    setUserProfile(state,data){
      state.userProfile = data;
    }
  },
  actions: {
    async login({dispatch},form){
      //sign user in
      const { user } = await fb.auth.signInWithEmailAndPassword(form.email,form.password)
      //Fetch user profile and set in state
      dispatch('fetchUserProfile',user)
    },
    async signup({dispatch},form){
      //Sign up user
      const {user} = await fb.auth.createUserWithEmailAndPassword(form.email,form.password)

      //Create user profile object in userCollections
      await fb.usersCollection.doc(user.uid).set({
        name : form.name
      })

      //Fetch user profile and set in state
      dispatch('fetchUserProfile',user)
    },
    async fetchUserProfile({commit},user){
      //Fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get()

      //set user profile in state
      commit('setUserProfile', userProfile.data())

      //Change route to dashboard
      if(router.currentRoute.path === '/login'){
        router.push('/')
      }
    },
    async logout({commit}){
      await fb.auth.signOut()

      //Clear userProfile and redirect to /login
      commit('setUserProfile',[])
      router.push('/login')
    },
  },
  modules: {
  }
})
