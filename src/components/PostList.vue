<template>
  <div id="posts">
    <section v-for="post in posts" :key="post.id">
      <md-card>
        <md-card-header>
          <md-card-header-text>
            <div class="md-display-3">
              {{ post.title }}
            </div>
            <div class="md-subheading">
              By {{ post.user.name}}
            </div>
          </md-card-header-text>
          <md-card-media md-big v-if="post.image">
            <img :src="post.image" />
          </md-card-media>
        </md-card-header>
        <md-card-content>
          <div class="md-headline">
            {{ post.body }}
          </div>
          <br />
          <div>
            <section v-for="comment in post.comments" :key="comment.id">
              <div class="md-body-1">
                {{ comment.body }} <span class="md-caption">({{ comment.user.name }})</span>
              </div>
              <br />
            </section>
          </div>
        </md-card-content>
      </md-card>
      <br />
    </section>
  </div>
</template>

<script>
const fetch = require('node-fetch')

export default {
  created () {
    this.fetchData()
  },
  data () {
    return {
      posts: []
    }
  },
  methods: {
    fetchData: async function () {
      const body = {
        query: 'query { getAllPosts { id title body image user { name } comments { id body user { name } } } }'
      }
      const sendFetch = await fetch('http://localhost:4000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      this.posts = (await sendFetch.json()).data.getAllPosts
    }
  }
}
</script>

<style>
</style>