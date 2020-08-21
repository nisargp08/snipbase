import Vue from "vue";
import Vuex from "vuex";
import * as fb from "../firebase";
import router from "../router/index.js";

Vue.use(Vuex);

//Firebase method to fetch all the posts - Realtime with .onSnapshot function
fb.postsCollection.orderBy("createdOn", "desc").onSnapshot((snapshot) => {
  //Retrieved post storage
  let postsArray = [];

  snapshot.forEach((shot) => {
    let post = shot.data();
    post.id = shot.id;

    postsArray.push(post);
  });

  store.commit("setPosts", postsArray);
});

const store = new Vuex.Store({
  state: {
    userProfile: {},
    posts: [],
  },
  mutations: {
    setUserProfile(state, data) {
      state.userProfile = data;
    },
    setPosts(state, posts) {
      state.posts = posts;
    },
  },
  actions: {
    async login({ dispatch }, form) {
      //sign user in
      const { user } = await fb.auth.signInWithEmailAndPassword(
        form.email,
        form.password
      );
      //Fetch user profile and set in state
      dispatch("fetchUserProfile", user);
    },
    async signup({ dispatch }, form) {
      //Sign up user
      const { user } = await fb.auth.createUserWithEmailAndPassword(
        form.email,
        form.password
      );

      //Create user profile object in userCollections
      await fb.usersCollection.doc(user.uid).set({
        name: form.name,
      });

      //Fetch user profile and set in state
      dispatch("fetchUserProfile", user);
    },
    async createPost({ state }, post) {
      await fb.postsCollection.add({
        createdOn: new Date(),
        title: post.title,
        content: post.content,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.name,
        comments: 0,
        likes: 0,
      });
    },
    /* eslint-disable no-unused-vars */
    async likePost({ commit }, post) {
      const userId = fb.auth.currentUser.uid;
      const docId = `${userId}_${post.id}`;

      //Check if user has liked the post
      const doc = await fb.likesCollection.doc(docId).get();
      if (doc.exists) {
        return;
      }

      //Add like
      await fb.likesCollection.doc(docId).set({
        postId: post.id,
        userId: userId,
      });

      //Update post like count
      fb.postsCollection.doc(post.id).update({
        likes: post.likesCount + 1,
      });
    },
    /* eslint-enable no-unused-vars */
    async fetchUserProfile({ commit }, user) {
      //Fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get();

      //set user profile in state
      commit("setUserProfile", userProfile.data());

      //Change route to dashboard
      if (router.currentRoute.path === "/login") {
        router.push("/");
      }
    },
    async logout({ commit }) {
      await fb.auth.signOut();

      //Clear userProfile and redirect to /login
      commit("setUserProfile", []);
      router.push("/login");
    },
    async updateProfile({ dispatch }, user) {
      const userId = fb.auth.currentUser.uid
      //Update user object 
      await fb.usersCollection.doc(userId).update({
        name: user.name
      })

      dispatch('fetchUserProfile', { uid: userId })

      //update all posts by user
      const postDocs = await fb.postsCollection.where('userId', '==', userId).get()
      postDocs.forEach(doc => {
        fb.postsCollection.doc(doc.id).update({
          userName: user.name
        })
      })

      //Update all comments by the user
      const commentDocs = await fb.commentsCollection.where('userId', '==', userId).get()
      commentDocs.forEach(doc => {
        fb.commentsCollection.doc(doc.id).update({
          userName: user.name
        })
      })
    }
  },
  modules: {},
});
export default store;
