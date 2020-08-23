<template>
<div class="settings-view">
    <section class="section">
        <div class="container py-4 my-5">
            <h2 class="title has-text-centered mb-6">User Settings</h2>
            <div class="columns">
                <div class="column is-4 is-offset-2 is-relative">
                    <div class="is-flex has-flex-direction-column is-justified-center is-aligned-center">
                        <h3 class="is-size-6 has-text-weight-bold mb-2">Profile Picture</h3>
                        <!-- Error message container -->
                        <div class="notification is-danger is-light" v-if="uploadError">
                            <p>Error Uploading Image ! Please try again ...</p>
                        </div>
                        <!-- Profile Photo Container -->
                        <div class="box">
                            <!-- Profile photo if exists -->
                            <template v-if="userProfile.profilePhoto != ''">
                                <figure class="image">
                                    <img class="rounded-corners profile-photo" :src="userProfile.profilePhoto" alt />
                                </figure>
                            </template>
                            <!-- Placeholder Image -->
                            <template v-else>
                                <figure class="image">
                                    <i class="far fa-user fa-5x has-text-primary"></i>
                                </figure>
                            </template>
                        </div>
                        <!-- <img src="https://api.adorable.io/avatars/285/abott@adorable.png" alt /> -->
                        <!-- Upload Progress bar -->
                        <transition enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut" mode="out-in">
                            <progress class="progress is-success my-2" :value="uploadValue" v-if="uploadValue"></progress>
                        </transition>
                        <!-- selected photo name before upload -->
                        <p>{{ selectedFile.name }}</p>
                        <!-- Profile Photo upload -->
                        <form @submit.prevent>
                            <div class="buttons">
                                <b-button type="is-success my-2" @click="uploadPhoto()" size="is-small" v-if="selectedFile != ''"><i class="fas fa-cloud-upload-alt pr-2"></i>Upload</b-button>
                                <b-dropdown aria-role="list">
                                    <b-button class="my-2" type="is-dark" size="is-small" slot="trigger" slot-scope="{active}">
                                        <span><i class="fas fa-pen pr-2"></i>Edit Photo <i class="fas pl-2" :class="active ? 'fa-caret-up' : 'fa-caret-down'"></i></span>
                                    </b-button>
                                    <b-dropdown-item aria-role="listitem" @click="$refs.photoUpload.click()">Upload a photo...</b-dropdown-item>
                                    <b-dropdown-item v-if="userProfile.profilePhoto != ''" aria-role="listitem" @click="confirmRemove()">Remove photo</b-dropdown-item>
                                </b-dropdown>
                            </div>
                            <b-field class="is-hidden">
                                <input type="file" @change="onFileSelected($event)" ref="photoUpload" accept="image/*">
                            </b-field>
                        </form>
                        <!-- {{ userProfile.profilePhoto}} -->
                    </div>
                </div>
                <!-- User Info Form -->
                <div class="column is-6">
                    <form @submit.prevent>
                        <div class="field">
                            <div class="control">
                                <b-field label="Full Name" for="name">
                                    <b-input type="text" id="name" v-model.trim="name"></b-input>
                                </b-field>
                            </div>
                        </div>
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
import { storage, storageRef, profilePhoto } from "@/firebase";
import { helperFunctions } from "@/mixins/helperFunctions.js";

export default {
    name: "settings",
    mixins : [helperFunctions],
    data() {
        return {
            name: "",
            password: "",
            selectedFile: "",
            //FIle Upload
            uploadValue: "",
            uploadError: ""
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
        //Called when profile photo is changed
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
        },
        //When user hits upload button
        uploadPhoto() {
            if (this.selectedFile) {
                //Removing old photo if replacing profile photo with another image
                if (this.userProfile.profilePhoto != "") {
                    this.removePhoto();
                }
                //Storing inside users/profile-photo
                var profilePhotoRef = storageRef.child(profilePhoto + this.selectedFile.name);
                //Uploading file to firebase
                const upload = profilePhotoRef.put(this.selectedFile);
                //Measing upload value for progress bar
                upload.on(`state_changed`, snapshot => {
                        this.uploadValue = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    }, error => { this.uploadError = error.message },
                    () => {
                        if (this.uploadValue == 100) {
                            this.uploadValue = "";
                            this.selectedFile = "";
                        }
                        //Getting downloadable link to store in users db as profile photo link
                        upload.snapshot.ref.getDownloadURL().then((url) => {
                            //Calling action to upload/update photo link in firebase and state
                            this.$store.dispatch('uploadUserProfilePhoto', url);
                            //Generating toast to acknowledge user
                            this.generateToast("Profile Photo Successfully Updated!", "is-success")
                        }).catch(function (error) {
                            //Generating toast to acknowledge user
                            this.generateSnackbar(error, "is-danger")
                        })
                    })
            }
        },
        //Confirm Remove Photo Alert
        confirmRemove() {
            this.$buefy.dialog.confirm({
                title: 'Remove Profile Photo',
                message: 'Are you sure you want to <b>remove</b> your profile photo? This action cannot be undone.',
                confirmText: 'Remove',
                type: 'is-danger',
                hasIcon: true,
                iconPack: 'fas',
                icon: 'exclamation-circle',
                onConfirm: () => this.removePhoto()
            })
        },
        //On remove confirm
        removePhoto() {
            //Getting the reference from url to delete
            let photo = storage.refFromURL(this.userProfile.profilePhoto);
            //Dispatching action to remove the photo url from db
            this.$store.dispatch('removeUserProfilePhoto');
            //Deleting file
            photo.delete().then(function () {
                //Generating toast to acknowledge user
                // console.log("Image deleted");
                // this.generateToast("Photo Successfully Deleted!", "is-success")
            }).catch(function (error) {
                console.log(error);
                // this.generateSnackbar(error, "is-danger")
            })
        },
    },
};
</script>

<style lang="scss" scoped>
</style>
