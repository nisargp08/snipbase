//Library Import
import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '../firebase.js'
//Component Import
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path : '/',
    name : 'Dashboard',
    component : Dashboard,
    //Authenticated
    meta : {
      requiresAuth : true
    }
  },
  {
    path : '/post/create',
    name : 'CreatePost',
    component : () => import(/* webpackChunkName : "CreatePost"*/ '../views/Posts/CreatePost.vue'),
    //Authenticated
    meta : {
      requiresAuth : true
    }
  },
  {
    path : '/post/:postId',
    name : 'ViewPost',
    props : true,
    component : () => import(/*webpackChunkName : "CreatePost"*/ '../views/Posts/Post.vue'),
    //Authenticated
    meta : {
      requiresAuth : true
    }
  },
  {
    path : '/post/:postId/edit',
    name : 'EditPost',
    props : true,
    component : () => import(/*webpackChunkName : "EditPost"*/ '../views/Posts/EditPost.vue'),
    //Authenticated
    meta : {
      requiresAuth : true
    }
  },
  {
    path : '/login',
    name : 'Login',
    component : () => import(/* webpackChunkName : "Login"*/ '../views/Login.vue'),
  },
  {
    path : '/signup',
    name : 'Signup',
    component : () => import(/* webpackChunkName : "Signup"*/ '../views/Signup.vue'),
  },
  {
    path : '/settings',
    name : 'Settings',
    component : () => import(/* webpackChunkName : "Settings"*/ '../views/Settings.vue'),
    //Authenticated
    meta : {
      requiresAuth : true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/*Settings Navigation guard - Starts*/
//Following functions will be executed beforeEach route change or redirection
router.beforeEach((to,from,next) => {
  //Will check if the path user wants to go to needs authentication or not
  //If the route has 'meta { requiresAuth : true }  then will return true else false
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if(requiresAuth && !auth.currentUser){
    //If route requires authentication and auth.currentUser(user not authenticated) then go '/login'
    next('/login')
  } else {
    //Else go where user wants to go
    next()
  }
})
/*Settings Navigation guard - Ends*/

export default router
