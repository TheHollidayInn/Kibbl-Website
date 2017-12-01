<template lang="pug">
div
  .container-fluid.banner
    .col-12.col-md-6.offset-md-3
      h1 Favorites
  .container
    .row.well
      .col-12.text-center(v-if='favorites.length === 0')
        h2 No messages yet!
    .row
      .col-12.col-md-6.offset-md-3
        .list-group(v-for="favorite in favorites")
          .list-group-item(v-if='favorite.petID')
            .row-picture(v-if='favorite.petID && favorite.petID.media && favorite.petID.media[0] && favorite.petID.media[0].urlSecureThumbnail')
              img.circle(:src='favorite.petID.media[0].urlSecureThumbnail', alt='icon')
            .row-picture(v-else)
              //- img.circle(src='../assets/kibbl-logo-dog.png', alt='icon')
            .row-content
              h4.list-group-item-heading {{favorite.petID.name}}
              //- p.list-group-item-text {{favorite.petID.description | limitTo:140}}
              a.btn.btn-flat.btn-raised.btn-primary(:href='`/pets/${favorite.petID._id}`') View
              //- a.btn.btn-flat.btn-raised.btn-warning(ng-click='unfavorite(favorite.petID._id, $index)') Unfavorite
          .list-group-item(v-if='favorite.shelterId')
            .row-picture(v-if='favorite.shelterId && favorite.shelterId.facebook && favorite.shelterId.facebook.cover')
              img.circle(:src='favorite.shelterId.facebook.cover', alt='icon')
            .row-picture(v-else)
              //- img.circle(src='../assets/kibbl-logo-dog.png', alt='icon')
            .row-content
              h4.list-group-item-heading {{favorite.shelterId.name}}
              p.list-group-item-text {{favorite.shelterId.description}}
              a.btn.btn-flat.btn-raised.btn-primary(:href='`/shelters/${favorite.shelterId._id}`') View
              //- a.btn.btn-flat.btn-raised.btn-warning(ng-click='unfavorite(favorite.shelterId._id, index)') Unfavorite
          .list-group-item(v-if='favorite.eventId')
            .row-picture(v-if='favorite.eventId && favorite.eventId.facebook && favorite.eventId.facebook.cover')
              img.circle(:src='favorite.eventId.facebook.cover', alt='icon')
            .row-picture(v-else)
              //- .img-circle(src='../assets/kibbl-logo-dog.png', alt='icon')
            .row-content
              h4.list-group-item-heading {{favorite.eventId.name}}
              p.list-group-item-text {{favorite.eventId.description}}
              a.btn.btn-flat.btn-raised.btn-primary(:href='`/events/${favorite.eventId._id}`') View
              //- a.btn.btn-flat.btn-raised.btn-warning(ng-click='unfavorite(favorite.eventId._id, index)') Unfavorite
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'FavoritesList',
    data () {
      return {
        favorites: []
      }
    },
    mounted () {
      axios.get('api/v1/favorites')
        .then(response => {
          this.favorites = response.data.data
        })
    },
    methods: {
      unfavorite (id, index) {
        if (!confirm('Are you sure you want to unfavorite?')) return
        this.favorites.splice(index, 1)
        axios.post('/api/v1/pets/' + id + '/favorite')
      }
    }
  }
</script>

<style scoped>
  .container-fluid {

  }
</style>
