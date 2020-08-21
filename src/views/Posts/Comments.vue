<template>
<div class="comments-modal">
    <div class="modal-card">
        <header class="modal-card-head">
            <span class="brand-color modal-card-title"><b>{{post.title}}</b> - <small class="has-text-black">Comments</small></span>
            <button type="button" class="delete" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
            <div class="box">
                <form @submit.prevent>
                    <!-- Comment Box -->
                    <article class="media">
                        <div class="media-left">
                            <figure class="image is-128x128">
                                <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
                            </figure>
                        </div>
                        <div class="media-content">
                            <div class="content">
                                <p class="p-0 m-0">
                                    <strong>John Smith</strong> <small>@jsmith</small>
                                    <br>
                                    <b-field>
                                        <b-input maxlength="255" v-model.trim="comment" type="textarea" aria-placeholder="Write a comment..."></b-input>
                                    </b-field>
                                    <b-button type="is-success" @click="addComment()" :disabled="comment == ''">Post Comment</b-button>
                                </p>
                            </div>
                        </div>
                    </article>
                </form>
            </div>
            <hr>
            <!-- Comments -->
            <article class="media">
                <div class="media-left">
                    <figure class="image is-64x64">
                        <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
                    </figure>
                </div>
                <div class="media-content">
                    <div class="content">
                        <p>
                            <strong>John Smith</strong> <small>@jsmith</small> - 10m
                            <br>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, sapiente.
                        </p>
                    </div>
                </div>
            </article>
        </section>
    </div>
</div>
</template>

<script>
import { postsCollection, commentsCollection, auth } from '@/firebase'

export default {
    name: "comments",
    props: ['post'],
    data() {
        return {
            comment: '',
        }
    },
    methods: {
        async addComment() {
            //create comment
            await commentsCollection.add({
                createdOn: new Date(),
                content: this.comment,
                postId: this.post.id,
                userId: auth.currentUser.uid,
                userName: this.$store.state.userProfile.name
            });

            //Update comment count on post
            await postsCollection.doc(this.post.id).update({
                comments: parseInt(this.post.comments) + 1
            })
        },
        closeModal() {
            this.$parent.close();
        }
    }
}
</script>

<style>

</style>
