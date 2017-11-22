<template lang="pug">
a(:href='`/events/${event._id}`')
  .grid-content.gradient
    .col-md-4
      .image-circle(v-if='!thumbnail', style='background-image:url(../images/kibbl-logo-dog.png)')
      .image-circle(v-if='thumbnail', :style='`background-image:url(${thumbnail})`')
    .col-md-8
      h3 {{event.name}}
      h5 {{startTime}}
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'EventNotification',
    props: ['event'],
    computed: {
      thumbnail () {
        if (!this.event.facebook || !this.event.facebook.cover) return false
        return this.event.facebook.cover
      },
      startTime () {
        return moment(event.start_time).format('LLLL')
      }
    }
  }
</script>
