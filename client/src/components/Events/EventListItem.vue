<template lang="pug">
a(href='/events/event._id')
  .grid-content.gradient
    .col-12.text-center
      .image-circle-default(v-if='!event.facebook || !event.facebook.cover')
      .image-circle(v-if='event.facebook && event.facebook.cover', :style='`background-image:url(${event.facebook.cover})`')
    .col-12
      h3 {{event.name}}
      h5 {{event.start_time}}
</template>

<script>
  export default {
    name: 'EventListItem',
    props: ['event']
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
