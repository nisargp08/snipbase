<template>
<div class="edit-post-component">
    <div class="container my-5">
        <div class="box">
            <h2 class="is-size-3 has-text-weight-bold">Edit Post - {{ postId }}</h2>
            <hr class="mt-2">
            <form @submit.prevent>
                <!-- Post title -->
                <b-field label="Post Title">
                    <b-input type="text" v-model.trim="postDetails.title" :value="postDetails.title"></b-input>
                </b-field>
                <!-- Post content -->
                <!-- <b-field label="Post Content" label-position="on-border">
                    <b-input type="textarea" v-model.trim="postDetails.content"></b-input>
                </b-field> -->
                <div class="content">
                    <label class="label">Post Content</label>
                    <div class="tiptap-container">
                        <editor-menu-bar :editor="postDetails.content" v-slot="{ commands, isActive }">
                            <button :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
                                Bold
                            </button>
                        </editor-menu-bar>
                        <editor-content :editor="postDetails.content" />
                    </div>
                </div>
                <!-- Submit post button -->
                <b-field>
                    <b-button type="is-success" @click="updatePost()" :disabled="validatePost">Update Post</b-button>
                </b-field>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
//Editor options
import {
    Bold
} from 'tiptap-extensions'
import { helperFunctions } from "@/mixins/helperFunctions.js";

export default {
    name: "editPost",
    props: {
        postId: {
            type: String,
            required: true
        }
    },
    mixins: [helperFunctions],
    data() {
        return {
            fetchedPost: {},
            postDetails: {},
        }
    },
    components: {
        EditorMenuBar,
        EditorContent
    },
    created() {
        this.fetchedPost = this.$store.getters.getSinglePost(this.postId);
        //If post found
        if (this.fetchedPost) {
            //Set post data to edit for
            this.setPostData();
        }
    },
    beforeDestroy() {
        this.postDetails.content.destroy();
    },
    computed: {
        //Simple empty check 
        validatePost() {
            if (this.postDetails.title != this.fetchedPost.title || this.postDetails.content != this.fetchedPost.content) {
                return false;
            } else {
                return true;
            }
        },
    },
    methods: {
        //To set post data to edit form
        setPostData() {
            this.postDetails.title = this.fetchedPost.title;
            this.postDetails.content = new Editor({
                extensions: [
                        new Bold()
                    ],
                content: this.fetchedPost.content,
            });
        },
        //To updatePost
        updatePost() {
            const post = {
                id: this.fetchedPost.id,
                title: this.postDetails.title,
                content: this.postDetails.content
            }
            //Calling action 'editPost' and sending 'post' as parameter
            this.$store.dispatch('editPost', post);
            //Redirect to post detail
            this.$router.push({
                name: "ViewPost",
                params: {
                    postId: this.fetchedPost.id
                }
            });
            this.generateToast("Post Successfully Updated !", "is-success");
        }
    }
}
</script>

<style>

</style>
