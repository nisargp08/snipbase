<template>
<div class="site-nav-component">
    <b-navbar type="is-dark" fixed-top shadow>
        <!-- Brand Logo -->
        <template slot="brand">
            <b-navbar-item to="/" tag="router-link">
                <h3>
                    <i class="fas fa-quidditch pr-1"></i>SnipBase
                </h3>
            </b-navbar-item>
        </template>
        <!-- Left Navigation items -->
        <template slot="start">
            <b-navbar-item to="/" tag="router-link" exact-active-class="exact-active">Dashboard</b-navbar-item>
            <b-navbar-item :to="{name : 'CreatePost'}" tag="router-link" exact-active-class="exact-active">Add Post</b-navbar-item>
        </template>
        <!-- Right Navigation items -->
        <template slot="end">
            <b-navbar-dropdown>
                <template slot="label">
                    <template v-if="userProfile.profilePhoto != ''">
                        <figure class="image is-48x48 is-flex is-aligned-center mr-2">
                            <img class="rounded-corners" :src="userProfile.profilePhoto" style="object-fit:cover">
                        </figure>
                    </template>
                    <template v-else>
                        <i class="far fa-user pr-2 has-text-primary"></i>
                    </template>
                    Hi, {{userProfile.name}}
                </template>
                <b-navbar-item to="/settings" tag="router-link" exact-active-class="exact-active">
                    <i class="fas fa-cog pr-2"></i>Settings
                </b-navbar-item>
                <b-navbar-item @click="logout">
                    <i class="fas fa-sign-out-alt pr-2"></i>Logout
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>
    </b-navbar>
</div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "siteNav",
    methods: {
        logout() {
            this.$store.dispatch("logout");
        },
    },
    computed: {
        ...mapState(["userProfile"]),
    },
};
</script>

<style>
</style>
