import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index.js'

Vue.use(Vuex)

//Firebase method to fetch all the posts - Realtime with .onSnapshot function
fb.postsCollection.orderBy('createdOn','desc').onSnapshot(snapshot => {
  //Retrieved post storage
  let postsArray = []

  snapshot.forEach(shot => {
    let post = shot.data()
    // post.id = shot.id
    postsArray.push(post)
  })

  store.commit('setPosts',postsArray);
});

const store =  new Vuex.Store({
  state: {
    userProfile : {

    },
    posts : []
  },
  mutations: {
    setUserProfile(state,data){
      state.userProfile = data;
    },
    setPosts(state,posts){
      state.posts = posts;
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
    async createPost({state},post){
      await fb.postsCollection.add({
        createdOn : new Date(),
        title : post.title,
        content : post.content,
        userId : fb.auth.currentUser.uid,
        userName : state.userProfile.name,
        comments : 0,
        likes : 0
      })
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
export default store