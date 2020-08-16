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
                        <h1 class="title is-4">Sign Up</h1>
                        <p class="description">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit
                        </p>
                        <form @submit.prevent>
                            <div class="field">
                                <div class="control">
                                    <b-field>
                                        <b-input type="text" v-model.trim="signupForm.name" placeholder="Snipbase Name"></b-input>
                                    </b-field>
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <b-field>
                                        <b-input type="email" v-model.trim="signupForm.email" placeholder="snipbase@email.com"></b-input>
                                    </b-field>
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <b-field>
                                        <b-input type="password" v-model.trim="signupForm.password" placeholder="******"></b-input>
                                    </b-field>
                                </div>
                            </div>
                            <b-button @click="signup()" class="button is-block is-primary is-fullwidth is-medium">
                                Sign Up
                            </b-button>
                            <br />
                            <small>
                                <div class="extras">
                                   <p>Already have an account ? <router-link to="/login">Log in</router-link></p>
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
    </section>
</div>
</template>

<script>
export default {
    name : "signup",
    data(){
        return {
            signupForm : {
                name : '',
                email : '',
                password : ''
            }
        }
    },
    methods : {
        signup(){
            this.$store.dispatch('signup',{
                name : this.signupForm.name,
                email : this.signupForm.email,
                password : this.signupForm.password
            })
        }
    }
};
</script>
