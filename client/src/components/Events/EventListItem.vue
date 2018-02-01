<template lang="pug">
router-link(:to="{ path: `/events/${event._id}` }")
  .wrap
    .col-12.default-image(v-if='!image')
    .col-12.image(v-else, :style='`background-image:url(${image})`')
    .content
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
      },
      image () {
        if (!this.event.facebook || !this.event.facebook.cover) return false
        return this.event.facebook.cover
      }
    }
  }
</script>

<style scoped>
  .default-image {
    background-image: url('../../assets/kibbl-logo-dog.png');
    width: 100%;
    height: 220px;
    margin: 0 auto;
    background-size: cover;
    background-position: center;
  }

  .wrap {
    border-radius: 8px;
    -webkit-box-shadow: 0 1px 4px rgba(0,0,0,.1);
    box-shadow: 0 1px 4px rgba(0,0,0,.1);
  }

  .image {
    border-radius: 8px 8px 0 0;
    width: 100%;
    height: 220px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .content {
    border-radius: 0 0 8px 8px;
    color: #931D10;
    padding: 1em;
    background: #fff;
  }

  .content h3 {
    font-size: 20px !important;
  }
</style>
