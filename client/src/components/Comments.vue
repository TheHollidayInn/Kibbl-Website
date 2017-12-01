<template lang="pug">
div
  .well.col-md-12
    h3.col-md-12 Comments
    .col-md-12
      textarea.form-control(placeholder="What do you think?", v-model='commentText')
      button.btn.btn-primary.pull-right(@click='addComment(commentText, itemId)') Send

  .well.col-md-12(style='margin-top: .5rem;', v-for='comment in comments')
    | {{comment.text}}
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Comments',
    props: ['itemId'],
    data () {
      return {
        comments: [],
        commentText: ''
      }
    },
    mounted () {
      axios.get(`/api/v1/comments?itemId=${this.itemId}`)
      .then((response) => {
        this.comments = response.data.comments
      })
      .catch(() => {
      })
    },
    methods: {
      addComment () {
        if (!this.commentText) return
        axios.post('/api/v1/comments', {
          itemId: this.itemId,
          text: this.commentText
        })
        .then((response) => {
          this.comments.push(response.data.comment)
          this.commentText = ''
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
      }
    }
  }
</script>

<style>
.well {
  background: #fff;
  margin-top: 1em;
  padding: 1em;
}
</style>
