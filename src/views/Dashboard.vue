<template>
<div class="dashboard-view">
    <div class="container my-5">
        <div class="box">
            <h2 class="is-size-3 has-text-weight-bold has-text-left">Posts</h2>
            <hr class="mt-2" />
            <div class="content">
                <div v-if="posts.length">
                    <div class="columns is-multiline">
                        <div class="column is-4-desktop is-6-tablet" v-for="post in posts" :key="post.id">
                            <div class="card eq-height-cards">
                                <!-- <div class="card-image">
                                    <div class="image is-4by3">
                                        <img src="https://source.unsplash.com/random/1280x960" alt="Blog Image">
                                    </div>
                                </div>-->
                                <div class="card-content">
                                    <p class="title is-4 my-0 mx-0">{{ post.title }}</p>
                                    <p class="subtitle is-6">
                                        <i class="fas fa-user pr-2"></i>
                                        {{post.userName}} -
                                        <span class="is-capitalized has-text-weight-light">{{ post.createdOn | formatDate }}</span>
                                    </p>
                                    <hr>
                                    <p>{{post.content | trimLength }}</p>
                                    <p>
                                        <a @click="viewPost(post.id)">Read More</a>
                                    </p>
                                </div>
                                <div class="card-footer">
                                    <span class="card-footer-item">
                                        <!-- <a @click="toggleCommentsModal(post)">
                                            <i class="fas fa-comments has-text-primary pr-2"></i>
                                            Comments ({{ post.comments}})
                                        </a> -->
                                        <i class="fas fa-comments has-text-primary pr-2"></i>
                                        Comments ({{ post.comments}})
                                    </span>
                                    <span class="card-footer-item">
                                        <a @click="likePost(post.id,post.likes)">
                                            <i class="fas fa-heart has-text-danger pr-2"></i>
                                            Likes ({{ post.likes}})
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Comment Modal -->
                    <b-modal :active.sync="isCommentModalActive" has-modal-card trap-focus :destroy-on-hide="false" aria-role="dialog" aria-modal>
                        <template>
                            <post-comments :post="selectedPost"></post-comments>
                        </template>
                    </b-modal>
                </div>
                <div v-else>
                    <p class="no-results">There are currently no posts</p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
// import axios from 'axios';
import Comments from "./Posts/Comments.vue";

export default {
    name: "dashboard",
    data() {
        return {
            isCommentModalActive: false,
            selectedPost: {},
        };
    },
    methods: {
        //View full post
        viewPost(postId) {
            this.$router.push({ name: 'ViewPost', params: { postId } })
            // this.$router.push({
            //     path : `/post/${postId}`
                
            // }); // -> /user/123
        },
        //Toggle Comments Modal
        toggleCommentsModal(post) {
            this.isCommentModalActive = !this.isCommentModalActive;

            if (this.isCommentModalActive) {
                this.selectedPost = post;
            } else {
                this.selectedPost = {};
            }
        },
        // Like a post
        likePost(id, likesCount) {
            this.$store.dispatch("likePost", { id, likesCount });
        },
    },
    components: {
        postComments: Comments,
    },
    computed: {
        ...mapState(["userProfile", "posts"]),
    },
    filters: {
        formatDate(val) {
            if (!val) return "-";
            let date = val.toDate();
            return moment(date).fromNow();
        },
        trimLength(val) {
            if (val.length < 200) {
                return val;
            }
            return `${val.substring(0, 200)}...`;
        },
    },
};
</script>

<style lang="scss" scoped>
</style>
