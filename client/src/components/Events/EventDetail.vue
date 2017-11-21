<template lang="pug">
div
  .container-fluid.banner
    .container
      .col-12.col-md-6.offset-md-3
        h1.text-center {{event.name}}
  .container-fluid.container-detail
    .container
      .row
        .col-md-9
          .well.img-feature-wrapper(v-if='event.facebook && event.facebook.cover')
            div.img-feature(:style="`background-image:url(${event.facebook.cover})`")
        .col-md-3.action-buttons
          a.btn.btn-primary(:href="`https://facebook.com/events/${event.id}`", target="_blank") Webpage
          button.btn.btn-raised.btn-primary.btn-favorite(ng-click='favorite()', v-if='!event.favorited')
            | Favorite
          button.btn.btn-raised.btn-primary.btn-favorite-active(ng-click='favorite()', v-if='event.favorited')
            | Remove
  .container(style="margin-top: 2rem;")
    .row
      .col-12.col-md-9
        .well
          h3 Description
          p(style="white-space: pre-wrap;") {{event.description}}
        comments(:item-id='event._id', v-if='event._id')
      .col-12.col-md-3
        .well
          h3 Details
          div(v-if='event.shelterId && event.shelterId.name')
            a(:href='`/shelters/${event.shelterId._id}`', target='_blank') {{event.shelterId.name}}
          div
            strong Start:
            | {{event.start_time}}
          br
          div End: {{event.end_time}}
          br
          div(v-if='event.place')
            | Location: {{event.place.location.street + ', ' + event.place.location.city + ', ' + event.place.location.state}}
        .well.social-buttons
          a.btn.btn-block.btn-raised.btn-facebook(target="_new", :href='`https://www.facebook.com/sharer/sharer.php?u=${facebookUrl}&src=sdkpreparse`')
            i.fa.fa-facebook-official
            |  Share
          a.btn.btn-block.btn-raised.btn-twitter(target="_new", href='twitterUrl')
            i.fa.fa-twitter-square
            |  Tweet
</template>

<script>
  import axios from 'axios'
  import Comments from '@/components/Comments'

  export default {
    name: 'EventDetail',
    components: {
      Comments
    },
    data () {
      return {
        event: {},
        facebookUrl: ''
      }
    },
    mounted () {
      const eventId = this.$route.params.eventId

      axios.get(`/api/v1/events/${eventId}`)
        .then((response) => {
          this.event = response.data.data
        })
    }
  }
</script>

<style scoped>
  .well {
    background: #fff;
    padding: 1em;
  }

  .social-buttons a {
    display: block;
    margin: 0 auto;
    margin-bottom: .5em;
  }

  .action-buttons {
    padding: 1em;
  }

  .action-buttons a {
    margin-right: .5em;
  }

  .action-buttons .btn-favorite {
    background-color: #ff9933;
  }
</style>
