<template lang="pug">
div
  .container-fluid.banner
    .container
      .col-12
        h1.text-center {{shelter.name}}
  .container-fluid.container-detail
    .container
      .row
        .col-md-6
          .well.img-feature-wrapper(v-if='shelter.facebook && shelter.facebook.cover')
            div.img-feature(:style="`background-image:url(${shelter.facebook.cover})`")
        .col-md-6.action-buttons
          a.btn.btn-primary(v-if='shelter.facebook && shelter.facebook.id',
            :href='`http://facebook.com/${shelter.facebook.id}`', target="_blank") Facebook Page
          button.btn.btn-raised.btn-primary(@click='subscribe()', v-if='!shelter.subscribed') Subscribe
          button.btn.btn-raised.btn-warning(@click='subscribe(true)', v-if='shelter.subscribed') Unubscribe
          button.btn.btn-raised.btn-primary.btn-favorite(@click='favorite()', v-if='!shelter.favorited') Favorite
          button.btn.btn-raised.btn-primary.btn-favorite-active(@click='favorite()', v-if='shelter.favorited') Remove
  .container(style="margin-top: 2rem;")
    .row
      .col-12.col-md-8
        .well.description
          router-link.btn.btn-primary(:to="{ name: 'ShelterPetList', params: { shelterId: shelter._id } }") View Pets
          router-link.btn.btn-primary(:to="{ name: 'ShelterEventList', params: { shelterId: shelter._id } }") View Events
          h3 Description
          p(ng-if='shelter.description') {{shelter.description}}
          p(ng-if='shelter.about') {{shelter.about}}
        comments(:item-id='shelter._id', v-if='shelter._id')
      .col-12.col-md-4
        .well
          h3 Contact
          div
            div(ng-if="shelter.email") {{shelter.email}}
            div(ng-if="shelter.phone") {{shelter.phone}}
        .well.social-buttons
          a.btn.btn-block.btn-raised.btn-facebook(target="_new", :href='`https://www.facebook.com/sharer/sharer.php?u=${facebookUrl}&src=sdkpreparse`')
            i.fa.fa-facebook-official
            |  Share
          a.btn.btn-block.btn-raised.btn-twitter(target="_new", :href='twitterUrl')
            i.fa.fa-twitter-square
            |  Tweet
</template>

<script>
  import axios from 'axios'
  import Comments from '@/components/Comments'
  import { parameterize } from '@/libs/queryHelper'

  export default {
    name: 'ShelterDetail',
    components: {
      Comments
    },
    data () {
      return {
        shelter: {}
      }
    },
    mounted () {
      const shelterId = this.$route.params.shelterId
      axios.get(`/api/v1/shelters/${shelterId}`)
        .then((response) => {
          this.shelter = response.data.data
        })
    },
    computed: {
      twitterUrl () {
        const url = window.location.href
        const tweetDetails = {
          url,
          text: 'Check out this amazing shelter on Kibbl: '
        }
        return 'https://twitter.com/intent/tweet?' + parameterize(tweetDetails)
      },
      facebookUrl () {
        const url = window.location.href
        return `https://www.facebook.com/sharer/sharer.php?u=${url}&src=sdkpreparse`
      }
    },
    methods: {
      favorite () {
        this.$set(this.shelter, 'favorited', !this.shelter.favorited)

        axios.post('/api/v1/favorites', {
          type: 'shelter',
          itemId: this.shelter._id
        })
      },
      subscribe (unsubscribe) {
        if (unsubscribe && !confirm('Are you sure you want to unsubscribe?')) return
        this.$set(this.shelter, 'subscribed', !this.shelter.subscribed)

        axios.post('/api/v1/notifications', {
          shelterId: this.shelter._id
        })
        .catch(response => {
          const message = response.data.message
          alert(message)
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

  .action-buttons button, .description .btn {
    margin-right: .5em;
  }

  .action-buttons .btn-favorite {
    background-color: #ff9933;
  }
</style>
