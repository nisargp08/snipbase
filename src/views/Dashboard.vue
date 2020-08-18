<template>
<div class="dashboard-view">
    <div class="container my-5">
        <div class="box">
            <h2 class="is-size-3 has-text-weight-bold has-text-left">Posts</h2>
            <hr class="mt-2">
            <div class="content">
                <div v-if="posts.length">
                    <div class="columns is-multiline">
                        <div v-for="post in posts" :key="post.id">
                            <div class="column">
                                <div class="card">
                                    <div class="card-image">
                                        <div class="image is-4by3">
                                            <img src="https://source.unsplash.com/random/1280x960" alt="Blog Image">
                                        </div>
                                    </div>
                                    <div class="card-content">
                                        <p class="title is-4">{{ post.title }}</p>
                                        <p class="subtitle is-6"><i class="fas fa-user pr-2"></i>{{post.userName}} - <span class="is-capitalized has-text-weight-light">{{ post.createdOn | formatDate }}</span></p>
                                        <p>{{post.content | trimLength }}</p>
                                        <p>{{post.url }}</p>
                                    </div>
                                    <div class="card-footer">
                                        <span class="card-footer-item"><i class="fas fa-comments has-text-primary pr-2"></i>Comments ({{ post.comments}})</span>
                                        <span class="card-footer-item"><i class="fas fa-heart has-text-danger pr-2"></i>Likes ({{ post.likes}})</span>
                                        <span class="card-footer-item"><a href="#">Read More</a></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
import { mapState } from 'vuex'
import moment from 'moment'

export default {
    name: "dashboard",
    computed: {
        ...mapState(['userProfile', 'posts']),
    },
    filters: {
        formatDate(val) {
            if (!val) return '-'

            let date = val.toDate()
            return moment(date).fromNow()
        },
        trimLength(val) {
            if (val.length < 200) { return val }
            return `${val.substring(0,200)}...`
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
