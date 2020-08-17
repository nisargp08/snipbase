<template>
<div class="site-nav-component">
    <b-navbar type="is-black" fixed-top shadow>
        <!-- Brand Logo -->
        <template slot="brand">
            <b-navbar-item to="/" tag="router-link">
                <h3>Snipbase</h3>
            </b-navbar-item>
        </template>
        <!-- Left Navigation items -->
        <template slot="start">
            <b-navbar-item to="/" tag="router-link" exact-active-class="exact-active">Dashboard</b-navbar-item>
        </template>
        <!-- Right Navigation items -->
        <template slot="end">
            <b-navbar-dropdown label="Username">
                <b-navbar-item to="/settings" tag="router-link" exact-active-class="exact-active">
                    Settings
                </b-navbar-item>
                <b-navbar-item @click="logout">
                    Logout
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>
    </b-navbar>
</div>
</template>

<script>
export default {
    name: 'siteNav',
    methods : {
        logout(){
            this.$store.dispatch('logout');
        }
    }
}
</script>

<style>

</style>
