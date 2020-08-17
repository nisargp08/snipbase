<template>
<div class="auth-view login-view">
    <section class="container">
        <div class="columns is-multiline">
            <div class="column is-8 is-offset-2 register">
                <div class="columns">
                    <div class="column left">
                        <h1 class="title is-1">Snipbase</h1>
                        <h2 class="subtitle colored is-4">
                            Join the Snipbase community to unlock all features
                        </h2>
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                            Corporis ex deleniti aliquam tempora libero excepturi vero
                            soluta odio optio sed.
                        </p>
                    </div>
                    <div class="column right has-text-centered">
                        <h1 class="title is-4">Login</h1>
                        <p class="description">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit
                        </p>
                        <form @submit.prevent>
                            <div class="field">
                                <div class="control">
                                    <b-field>
                                        <b-input type="email" v-model.trim="loginForm.email" placeholder="snipbase@email.com"></b-input>
                                    </b-field>
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <b-field>
                                        <b-input type="password" v-model.trim="loginForm.password" placeholder="******"></b-input>
                                    </b-field>
                                </div>
                            </div>
                            <b-button @click="login()" class="button is-block is-primary is-fullwidth is-medium">
                                Log In
                            </b-button>
                            <br />
                            <small>
                                <div class="extras">
                                    <a @click="forgotPasswordToggle()">Forgot Password</a><br />
                                    <router-link to="/signup">Create an Account</router-link>
                                </div>
                            </small>
                        </form>
                    </div>
                </div>
            </div>
            <div class="column is-8 is-offset-2">
                <br />
                <nav class="level">
                    <div class="level-right">
                        <small class="level-item" style="color: $textLight">
                            &copy; Super Cool Website. All Rights Reserved.
                        </small>
                    </div>
                </nav>
            </div>
        </div>
        <!-- Forgot Password Modal -->
        <!-- <forgot-password></forgot-password> -->
        <b-modal :active.sync="showPasswordReset"
            has-modal-card
            trap-focus
            :destroy-on-hide="false"
            aria-role="dialog"
            aria-modal>
            <forgot-password></forgot-password>
        </b-modal>
    </section>
</div>
</template>

<script>
import ForgotPassword from './ForgotPassword.vue'

export default {
    name : "login",
    components : {
        ForgotPassword
    },
    data(){
        return {
            loginForm : {
                email : '',
                password : ''
            },
            //To hide/show password reset component
            showPasswordReset : false,
        }
    },
    methods : {
        login(){
            this.$store.dispatch('login',{
                email : this.loginForm.email,
                password : this.loginForm.password
            })
        },
        forgotPasswordToggle(){
            this.showPasswordReset = !this.showPasswordReset;
        }
    }
};
</script>
