<template lang="pug">
div
  .container-fluid.banner
    .container
      .col-12.col-md-6.offset-md-3
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
          button.btn.btn-raised.btn-primary(ng-click='subscribe()', v-if='!shelter.subscribed') Subscribe
          button.btn.btn-raised.btn-warning(ng-click='subscribe(true)', v-if='shelter.subscribed') Unubscribe
          button.btn.btn-raised.btn-primary.btn-favorite(ng-click='favorite()', v-if='!shelter.favorited') Favorite
          button.btn.btn-raised.btn-primary.btn-favorite-active(ng-click='favorite()', v-if='shelter.favorited') Remove
  .container(style="margin-top: 2rem;")
    .row
      .col-12.col-md-8
        .well
          a.btn.btn-primary(:href='`/pets/shelter/${shelter._id}`') View Pets
          a.btn.btn-primary(:href='`/events/shelter/${shelter._id}`') View Events
          h3 Description
          p(ng-if='shelter.description') {{shelter.description}}
          p(ng-if='shelter.about') {{shelter.about}}
        //- comments(item-id='shelter._id')
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

  export default {
    name: 'ShelterDetail',
    data () {
      return {
        shelter: {},
        facebookUrl: '',
        twitterUrl: ''
      }
    },
    mounted () {
      const shelterId = this.$route.params.shelterId
      axios.get(`/api/v1/shelters/${shelterId}`)
        .then((response) => {
          this.shelter = response.data.data
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
