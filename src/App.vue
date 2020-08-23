<template>
  <div id="app">
    <site-nav v-if="showNav"></site-nav>
    <transition enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut" mode="out-in">
    <router-view/>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import siteNav from './views/SiteNav.vue'

export default {
  name : "app",
  components : {
    siteNav
  },
  computed : {
    ...mapState(['userProfile']),
    showNav(){
      return Object.keys(this.userProfile).length > 0;
    }
  }
}
</script>
<style lang="scss">
</style>
