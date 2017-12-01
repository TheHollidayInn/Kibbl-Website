<template lang="pug">
router-link(:to="{ path: `/events/${event._id}` }")
  .grid-content.gradient
    .col-12.text-center
      .image-circle-default(v-if='!event.facebook || !event.facebook.cover')
      .image-circle(v-if='event.facebook && event.facebook.cover', :style='`background-image:url(${event.facebook.cover})`')
    .col-12
      h3 {{event.name}}
      h5 {{startTime}}
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'EventListItem',
    props: ['event'],
    computed: {
      startTime () {
        return moment(this.event.start_time).format('LLLL')
      }
    }
  }
</script>

<style scoped>
  .image-circle-default {
    background-image: url('../../assets/kibbl-logo-dog.png');
    width: 100px;
    height: 100px;
    margin: 0 auto;
    background-size: cover;
  }
</style>
