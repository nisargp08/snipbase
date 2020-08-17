<template>
<div class="forgot-password-view">
    <form @submit.prevent>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title is-size-5">Reset Password</p>
            </header>
            <section class="modal-card-body">
                <div v-if="!isSuccess">
                    <b-field label="Email">
                        <b-input type="email" v-model.trim="email" placeholder="snipbase@email.com" required>
                        </b-input>
                    </b-field>
                </div>
                <div v-else>
                    <p style="color : green">Success! Check your email for a reset link.</p>
                </div>
                <p v-if="errorMsg !== ''" class="error-msg"><small>{{ errorMsg }}</small></p>
            </section>
            <footer class="modal-card-foot">
                <button v-if="isSuccess" class="button" type="button" @click="$parent.close()">Close</button>
                <button v-else class="button is-primary" @click="resetPassword()">Send Resent Link</button>
            </footer>
        </div>
    </form>
</div>
</template>

<script>
import { auth } from '@/firebase'

export default {
    name: "forgotPassword",
    data() {
        return {
            email: '',
            isSuccess: false,
            errorMsg: ''
        }
    },
    methods: {
        async resetPassword() {
            this.errorMsg = ''
            try{
              await auth.sendPasswordResetEmail(this.email)
              this.isSuccess = true
            } catch(err){
              this.errorMsg = err.message
            }
        }
    }
}
</script>

<style>
</style>
