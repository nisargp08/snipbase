<template>
  <div class="settings-view">
    <section class="section">
      <div class="container py-4 my-5">
        <h2 class="title has-text-centered mb-6">User Settings</h2>
        <div class="columns">
          <div class="column is-4 is-offset-2">
            <img src="https://api.adorable.io/avatars/285/abott@adorable.png" alt />
          </div>
          <div class="column is-6">
            <form @submit.prevent>
              <div class="field">
                <div class="control">
                  <b-field label="Full Name" for="name">
                    <b-input type="text" id="name" v-model.trim="name"></b-input>
                  </b-field>
                </div>
              </div>
              <!-- <div class="field">
                <div class="control">
                  <b-field label="Email">
                    <b-input type="email" :value="userPr" readonly></b-input>
                  </b-field>
                </div>
              </div>-->
              <!-- <div class="field">
                <div class="control">
                  <b-field label="Password" password-reveal>
                    <b-input type="password" v-model.trim="password"></b-input>
                  </b-field>
                </div>
              </div>-->
              <div class="field">
                <div class="control">
                  <b-button type="is-success" @click="updateProfile()">Update</b-button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "settings",
  data() {
    return {
      name: "",
      password: "",
      showSuccess: false,
    };
  },
  computed: {
    ...mapState(["userProfile"]),
  },
  methods: {
    updateProfile() {
      this.$store.dispatch("updateProfile", {
        name: this.name !== "" ? this.name : this.userProfile.name,
      });

      this.name = "";
      //Showing propile update alert
      this.$buefy.toast.open({
        message: "Profile Successfully Updated !",
        type: "is-success",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>