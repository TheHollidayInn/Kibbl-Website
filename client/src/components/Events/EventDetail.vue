<template lang="pug">
div
  .container-fluid.banner
    .container
      .col-12
        h1.text-center {{event.name}}
  .container-fluid.container-detail
    .container
      .row
        .col-md-9
          .well.img-feature-wrapper(v-if='event.facebook && event.facebook.cover')
            div.img-feature(:style="`background-image:url(${event.facebook.cover})`")
        .col-md-3.action-buttons
          a.btn.btn-primary(:href="`https://facebook.com/events/${event.id}`", target="_blank") Webpage
          button.btn.btn-favorite(@click='favorite()', v-if='!event.favorited') Favorite
          button.btn.btn-favorite-active(@click='favorite()', v-if='event.favorited') Remove
  .container(style="margin-top: 2rem;")
    .row
      .col-12.col-md-9
        .well
          h3 Description
          p(style="white-space: pre-wrap;") {{event.description}}
        comments(:item-id='event._id', v-if='event._id')
      .col-12.col-md-3
        .well.details
          h3 Details
          div(v-if='event.shelterId && event.shelterId.name')
            a(:href='`/shelters/${event.shelterId._id}`', target='_blank') {{event.shelterId.name}}
          div
            strong Start:
            | {{startTime}}
          div
            strong End:
            | {{endTime}}
          div(v-if='event.place && event.place.location')
            | Location: {{event.place.location.street + ', ' + event.place.location.city + ', ' + event.place.location.state}}
        .well.social-buttons
          a.btn.btn-block.btn-raised.btn-facebook(target="_new", :href='facebookUrl')
            i.fa.fa-facebook-official
            |  Share
          a.btn.btn-block.btn-raised.btn-twitter(target="_new", :href='twitterUrl')
            i.fa.fa-twitter-square
            |  Tweet
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'
  import Comments from '@/components/Comments'
  import { parameterize } from '@/libs/queryHelper'

  export default {
    name: 'EventDetail',
    components: {
      Comments
    },
    metaInfo () {
      return {
        title: this.event.name,
        meta: [
          { 'og:title': this.event.name },
          { 'og:description': this.event.description },
          { 'og:image': this.image },
          { 'og:url': window.location.href },
          { 'twitter:title': this.event.name },
          { 'twitter:description': this.event.description },
          { 'twitter:image': this.image },
          { 'twitter:card': this.event.description }
        ]
      }
    },
    data () {
      return {
        event: {}
      }
    },
    computed: {
      facebookUrl () {
        const url = window.location.href
        return `https://www.facebook.com/sharer/sharer.php?u=${url}&src=sdkpreparse`
      },
      twitterUrl () {
        const url = window.location.href
        const tweetDetails = {
          url,
          text: 'Check out this amazing event on Kibbl: '
        }
        return 'https://twitter.com/intent/tweet?' + parameterize(tweetDetails)
      },
      startTime () {
        return moment(this.event.start_time).format('LLLL')
      },
      endTime () {
        return moment(this.event.end_time).format('LLLL')
      },
      image () {
        if (!this.event.facebook || !this.event.facebook.cover) return ''
        return this.event.facebook.cover
      }
    },
    mounted () {
      const eventId = this.$route.params.eventId

      axios.get(`/api/v1/events/${eventId}`)
        .then((response) => {
          this.event = response.data.data
        })
    },
    methods: {
      favorite () {
        this.event.favorited = !this.event.favorited

        axios.post('/api/v1/favorites', {
          type: 'event',
          itemId: this.event._id
        })
      }
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

  .details strong {
    margin-right: .5em
  }
</style>
