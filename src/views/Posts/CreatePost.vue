<template>
<div class="container my-5">
    <div class="box">
        <h2 class="is-size-3 has-text-weight-bold">Create Post</h2>
        <hr class="mt-2">
        <form @submit.prevent>
            <!-- Post title -->
            <b-field label="Post Title" label-position="on-border">
                <b-input type="text" v-model.trim="postDetails.title"></b-input>
            </b-field>
            <!-- Post content -->
            <b-field label="Post Content" label-position="on-border">
                <b-input type="textarea" v-model.trim="postDetails.content"></b-input>
            </b-field>
            <!-- Submit post button -->
            <b-field>
                <b-button type="is-success" @click="submitPost()" :disabled="validatePost">Create Post</b-button>
            </b-field>
        </form>
    </div>
</div>
</template>

<script>
export default {
    name : "createPost",
    data(){
        return {
            postDetails : {
                title : '',
                content : '',
            }
        }
    },
    computed : {
        //Simple empty check 
        validatePost(){
            if(this.postDetails.title == '' || this.postDetails.content == ''){
                return true;
            } else {
                return false;
            }
            
        }
    },
    methods : {
        submitPost(){
            const post = {
                title : this.postDetails.title,
                content : this.postDetails.content
            }
            //Calling action 'createPost' and sending 'post' as parameter
            this.$store.dispatch('createPost',post);
            //Clearing out title and content form field after submission
            this.postDetails.title = '',
            this.postDetails.content = ''
        }
    }
}
</script>

<style>

</style>
