<template>
<div class="post-component">
    <!-- When fetching post details -->
    <template v-if="loading">
        <div class="loader-wrapper">
            <grid-loader :loading="loading"></grid-loader>
        </div>
    </template>
    <!-- If any error encountered during fetching post details -->
    <template v-if="error">{{ error }}</template>
    <template v-if="post">
        <div class="container">
            <!-- Article Start -->
            <div class="box article">
                <div class="card-content">
                    <div class="media">
                        <div class="media-center">
                            <img src="http://www.radfaces.com/images/avatars/daria-morgendorffer.jpg" class="author-image" alt="Author Image" />
                        </div>
                        <div class="media-content has-text-centered">
                            <p class="title article-title is-size-3-desktop is-size-4-touch">{{ post.title }}</p>
                            <p class="subtitle is-6 article-subtitle">
                                <a>@{{post.userName}}</a>
                                on {{post.createdOn | formatDate }}
                            </p>
                        </div>
                    </div>
                    <div class="content article-body">{{ post.content }}</div>
                </div>
            </div>
            <!-- Article End -->
            <!-- Comment Start -->
            <div class="box comments">
                <!-- COmment box if user logged in -->
                <div class="comment-box">
                    <form @submit.prevent>
                        <article class="media">
                            <div class="media-left">
                                <figure class="image is-64x64 is-flex is-aligned-center is-justified-center">
                                    <template v-if="userProfile.profilePhoto != ''">
                                        <img class="rounded-corners profile-photo" :src="userProfile.profilePhoto" alt />
                                    </template>
                                    <template v-else>
                                        <i class="far fa-user fa-3x  has-text-primary"></i>
                                    </template>
                                </figure>
                            </div>
                            <div class="media-content">
                                <div class="content">
                                    <p>
                                        <strong>{{userProfile.name}}</strong>
                                        <small>
                                            <a>&nbsp;@{{userProfile.name}}</a>
                                        </small>
                                        <br />
                                        <b-field>
                                            <b-input type="textarea" maxlength="255" v-model="comment" placeholder="Write a comment..."></b-input>
                                        </b-field>
                                        <b-button type="is-success" size="is-small" @click="addComment()" :disabled="comment == ''">Comment</b-button>
                                    </p>
                                </div>
                            </div>
                        </article>
                    </form>
                </div>
                <hr />
                <!-- Comment box end -->
                <div class="comment-item" v-for="(comment,index) in post.commentsData" :key="comment.id">
                    <article class="media">
                        <div class="media-left">
                            <figure class="image is-64x64 is-flex is-aligned-center is-justified-center">
                                <template v-if="userProfile.profilePhoto != ''">
                                    <img class="rounded-corners profile-photo" :src="userProfile.profilePhoto" alt />
                                </template>
                                <template v-else>
                                    <i class="far fa-user fa-3x  has-text-primary"></i>
                                </template>
                            </figure>
                            <!-- <figure class="image is-64x64">
                                <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image" />
                            </figure> -->
                        </div>
                        <div class="media-content">
                            <div class="content">
                                <p>
                                    <strong>{{ comment.userName}}</strong>
                                    <small>
                                        <a>&nbsp;@{{comment.userName}}</a>
                                    </small>
                                    - {{comment.createdOn | formatRelativeDate }}
                                    <br />
                                    {{ comment.content}}
                                </p>
                            </div>
                        </div>
                    </article>
                    <!-- So that if does not display <hr> after last comment -->
                    <hr v-if="index != Object.keys(post.commentsData).length - 1" />
                </div>
            </div>
            <!-- Comment End -->
        </div>
    </template>
</div>
</template>

<script>
//Loading Spinner
import GridLoader from "vue-spinner/src/GridLoader.vue";
import moment from "moment";
import { mapState } from "vuex";
import { postsCollection, commentsCollection, auth } from "@/firebase";
import { helperFunctions } from "@/mixins/helperFunctions.js";

export default {
    name: "post",
    mixins: [helperFunctions],
    components: {
        GridLoader,
    },
    data() {
        return {
            //Tracking variables
            loading: false,
            post: null,
            error: null,
            comment: "",
        };
    },
    created() {
        // fetch the data when the view is created and the data is
        // already being observed
        this.fetchPostDetails();
    },
    watch: {
        // call again the method if the route changes
        $route: "fetchPostDetails",
    },
    computed: {
        ...mapState(["userProfile"]),
    },
    filters: {
        formatDate(val) {
            if (!val) return "-";

            let date = val.toDate();
            return moment(date).format("LL");
        },
        formatRelativeDate(val) {
            if (!val) return "-";

            let date = val.toDate();
            return moment(date).fromNow();
        },
    },
    methods: {
        async fetchPostDetails() {
            //To store matched post
            let post;
            this.error = this.post = null;
            this.loading = true;
            const fetchedId = this.$route.params.id;
            let comments = [];
            //Fetch post
            this.$store.state.posts.filter(function (single) {
                if (single.id === fetchedId) {
                    post = single;
                    return;
                }
            });
            //Fetch comments
            const docs = await commentsCollection
                .where("postId", "==", fetchedId)
                .get();

            docs.forEach((doc) => {
                let comment = doc.data();
                comment.id = doc.id;
                comments.push(comment);
            });
            //Adding comments objecto to post object
            post.commentsData = comments;
            this.loading = false;
            if (post) {
                //Finally assigning retrieved post to local post
                this.post = post;
            } else {
                //Can show 404 page or some other custom message
                return;
            }
            // if (err) {
            //     this.error = err.toString()
            // } else {
            //     //Finally assigning retrieved post to local post
            //     this.post = post;
            // }
        },
        async addComment() {
            //create comment
            await commentsCollection.add({
                createdOn: new Date(),
                content: this.comment,
                postId: this.post.id,
                userId: auth.currentUser.uid,
                userName: this.$store.state.userProfile.name,
            });

            //Update comment count on post
            await postsCollection.doc(this.post.id).update({
                comments: parseInt(this.post.comments) + 1,
            });
            //Showing comment added alert
            this.generateToast("Comment Successfully Added !", "is-success");
            // this.$buefy.toast.open({
            //     message: "Comment Successfully Added !",
            //     type: "is-success",
            //     position: "is-bottom",
            // });
            //Clear Comment Box
            this.comment = "";
        },
    },
};
</script>

<style>
</style>
