<template lang="pug">
div
  .container-fluid.banner
    .col-12.col-md-6.offset-md-3
      h1 Following
  .container
    .row(v-if='following.length === 0')
      .col-12
        h2.text-center No subscriptions yet!
    .row
      .col-12
        .list-group(v-for="notification in following")
          .list-group-item
            .row-picture(v-if='notification.shelterId && notification.shelterId.facebook && notification.shelterId.facebook.cover')
              img.circle(:src='notification.shelterId.facebook.cover', alt='icon')
            .row-picture(v-else)
              .image-circle(style='background-image:url(../images/kibbl-logo-dog.png)')
            .row-content
              h4.list-group-item-heading {{notification.shelterId.name}}
              p.list-group-item-text {{notification.shelterId.description}}
              a.btn.btn-flat.btn-raised.btn-primary(:href='`/shelters/${notification.shelterId._id}`') View
              //- a.btn.btn-flat.btn-raised.btn-warning(ng-click='unsubscribe(notification.shelterId._id, $index)') Unsubscribe
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'FollowingList',
    data () {
      return {
        following: []
      }
    },
    mounted () {
      axios.get('/api/v1/notifications')
        .then(response => {
          this.following = response.data.data
        })
    }
  }
</script>

<style>
  .list-group-item {
    margin-bottom: 1em !important;
    margin-top: 1em !important;
  }
</style>
