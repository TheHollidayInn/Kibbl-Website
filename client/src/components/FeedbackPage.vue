<template lang="pug">
  section.container
    .row
      .col-12.col-md-6.offset-md-3.well
        h2 Have some feedback or questions?
        h3 Feel free to reach out :)
        div Email: admin@kibbl.io
        div
          a(href='https://twitter.com/kibbl_app/', target='_blank') Twitter
        div
          a(href='https://www.facebook.com/kibblapp/', target='_blank') Facebook
        div Just click the message icon at the bottom right and send us a message
</template>

<script>
  export default {
    name: 'FeedbackPage'
  }
</script>

<style>
  .well {
    margin-top: 1em;
    padding: 2em;
    background-color: #fff;
  }
</style>
