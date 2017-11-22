<template lang="pug">
div
  .container-fluid.banner
    .col-12.col-md-6.offset-md-3
      h1 Notifications
  .container
    .row(v-if='notifications.length === 0')
      .col-12.col-md-6.offset-md-3.well
        h2.text-center No subscriptions yet!
    .row
      .col-12.col-md-6.offset-md-3.well(v-for="notification in notifications")
        notification(:notification='notification')
</template>

<script>
  import axios from 'axios'
  import Notification from './Notification'

  export default {
    name: 'NotificationList',
    components: {
      Notification
    },
    data () {
      return {
        notifications: []
      }
    },
    mounted () {
      axios.get('/api/v1/notifications/user-notifications')
        .then(response => {
          this.notifications = response.data.data
        })
    }
  }
</script>

<style>
  .well {
    background-color: #fff;
    padding: 1em;
    margin-top: 1em;
  }
</style>
