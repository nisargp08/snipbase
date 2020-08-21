<template>
<div class="post-component">
    <!-- When fetching post details -->
    <template v-if="loading">
        <div class="loader-wrapper">
            <grid-loader :loading="loading"></grid-loader>
        </div>
    </template>
    <!-- If any error encountered during fetching post details -->
    <template v-if="error">
        {{ error }}
    </template>
    <template v-if="post">
        <div class="container">
            <!-- START ARTICLE -->
            <div class="card article">
                <div class="card-content">
                    <div class="media">
                        <div class="media-center">
                            <img src="http://www.radfaces.com/images/avatars/daria-morgendorffer.jpg" class="author-image" alt="Author Image">
                        </div>
                        <div class="media-content has-text-centered">
                            <p class="title article-title">Sapien eget mi proin sed 🔱</p>
                            <p class="subtitle is-6 article-subtitle">
                                <a href="#">@daria</a> on February 17, 2018
                            </p>
                        </div>
                    </div>
                    <div class="content article-body">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Accumsan lacus vel facilisis volutpat est velit egestas. Sapien eget mi proin sed. Sit amet mattis vulputate enim.
                        </p>
                        <p>
                            Commodo ullamcorper a lacus vestibulum sed arcu. Fermentum leo vel orci porta non. Proin fermentum leo vel orci porta non pulvinar. Imperdiet proin fermentum leo vel. Tortor posuere ac ut consequat semper viverra. Vestibulum lectus mauris ultrices eros.
                        </p>
                        <h3 class="has-text-centered">Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi. Cras tincidunt lobortis feugiat vivamus.</h3>
                        <p>
                            In eu mi bibendum neque egestas congue quisque egestas diam. Enim nec dui nunc mattis enim ut tellus. Ut morbi tincidunt augue interdum velit euismod in. At in tellus integer feugiat scelerisque varius morbi enim nunc. Vitae suscipit tellus mauris a diam.
                            Arcu non sodales neque sodales ut etiam sit amet.
                        </p>
                    </div>
                </div>
            </div>
            <!-- END ARTICLE -->
        </div>
    </template>

</div>
</template>

<script>
//Loading Spinner
import GridLoader from 'vue-spinner/src/GridLoader.vue'
import { commentsCollection } from '@/firebase'

export default {
    name: "post",
    components: {
        GridLoader,
    },
    data() {
        return {
            //Tracking variables
            loading: false,
            post: null,
            error: null,
            //postId from the router url
            postId: this.$route.params.postId
        }
    },
    created() {
        // fetch the data when the view is created and the data is
        // already being observed
        this.fetchPostDetails()
    },
    watch: {
        // call again the method if the route changes
        '$route': 'fetchPostDetails'
    },
    methods: {
        async fetchPostDetails() {
            this.error = this.post = null
            this.loading = true
            const fetchedId = this.$route.params.id
            let comments = []
            //Fetch post
            const post = this.$store.state.posts.filter(function (single) {
                if (single.id === fetchedId) {
                    return single;
                }
            });
            //Fetch comments
            const docs = await commentsCollection.where('postId', '==', fetchedId).get()

            docs.forEach(doc => {
                let comment = doc.data()
                comment.id = doc.id
                comments.push(comment);
            })

            //Adding comments objecto to post object
            post[0].commentsData = comments;
            this.loading = false
            if (post.length > 0) {
                //Finally assigning retrieved post to local post
                this.post = post;
            } else {
                //Can show 404 page or some other custom message
                return ;
            }
            // if (err) {
            //     this.error = err.toString()
            // } else {
            //     //Finally assigning retrieved post to local post
            //     this.post = post;
            // }
        }
    }
}
</script>

<style>

</style>
