<template lang="pug">
.container-fluid
  .row
    .col-12
      h1 Favorites
    .col-12.text-center(v-if='favorites.length === 0')
      h2 No messages yet!
  .row
    .col-6.offset-3
      .list-group(v-for="favorite in favorites")
        .list-group-item(v-if='favorite.petID')
          .row-picture(v-if='favorite.petID.media[0].urlSecureThumbnail')
            img.circle(ng-src='favorite.petID.media[0].urlSecureThumbnail', alt='icon')
          .row-picture(v-if='!favorite.petID.media[0].urlSecureThumbnail')
            img.circle(ng-src='../images/kibbl-logo-dog.png', alt='icon')
          .row-content
            h4.list-group-item-heading {{favorite.petID.name}}
            p.list-group-item-text {{favorite.petID.description | limitTo:140}}
            a.btn.btn-flat.btn-raised.btn-primary(href='`/pets/${favorite.petID._id}`') View
            a.btn.btn-flat.btn-raised.btn-warning(ng-click='unfavorite(favorite.petID._id, $index)') Unfavorite

        .list-group-item(v-if='favorite.shelterId')
          .row-picture(v-if='favorite.shelterId.facebook.cover')
            img.circle(ng-src='${favorite.shelterId.facebook.cover}', alt='icon')
          .row-picture(v-if='!favorite.shelterId.facebook.cover')
            img.circle(ng-src='../images/kibbl-logo-dog.png', alt='icon')
          .row-content
            h4.list-group-item-heading {{favorite.shelterId.name}}
            p.list-group-item-text {{favorite.shelterId.description | limitTo:140}}
            a.btn.btn-flat.btn-raised.btn-primary(href='`/shelters/${favorite.shelterId._id}`') View
            a.btn.btn-flat.btn-raised.btn-warning(ng-click='unfavorite(favorite.shelterId._id, index)') Unfavorite

        .list-group-item(v-if='favorite.eventId')
          .row-picture(v-if='favorite.eventId.facebook.cover')
            img.circle(ng-src='favorite.eventId.facebook.cover', alt='icon')
          .row-picture(v-if='!favorite.eventId.facebook.cover')
            img.circle(ng-src='../images/kibbl-logo-dog.png', alt='icon')
          .row-content
            h4.list-group-item-heading {{favorite.eventId.name}}
            p.list-group-item-text {{favorite.eventId.description | limitTo:140}}
            a.btn.btn-flat.btn-raised.btn-primary(href='`/events/${favorite.eventId._id}`') View
            a.btn.btn-flat.btn-raised.btn-warning(ng-click='unfavorite(favorite.eventId._id, index)') Unfavorite

        .list-group-separator
</template>

<script>
  export default {
    name: 'FavoritesList',
    data () {
      return {
        favorites: []
      }
    }
  }
</script>

<style scoped>
  .container-fluid {
    margin-top: 2em;
  }
</style>
