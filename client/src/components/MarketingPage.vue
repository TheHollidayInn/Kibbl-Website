<template lang="pug">
section.background.container-fluid
  .container
    .row
      .col-12.text-center
        img(src="..//assets/kibbl-logo.svg", alt="Kibbl Logo", class="banner-logo")
    .row
      .col-12.text-center
        h1 Subscribe to local rescues and start receiving notifications when they add events or new adoptable pets.
    .row
      .col-md-12.text-center
        a(@click='openAndroid()', style='display:inline-block;width: 200px;')
          img(src='https://kibblblog.files.wordpress.com/2017/07/4b70f6fae447.png?w=300&h=88',
             alt='', width='100%')
        a(@click='openApple()', style='display:inline-block;width: 200px;')
          img(src='https://kibblblog.files.wordpress.com/2017/07/f06b908907d5.png?w=300&h=89',
          alt='', width='100%')
    .row.app-images
      .col-md-4
        img(src='https://s3.amazonaws.com/testhabitica/kibbl/screen-1.png', width='100%')
      .col-md-4
        img(src='https://s3.amazonaws.com/testhabitica/kibbl/screen-2.png', width='100%')
      .col-md-4
        img(src='https://s3.amazonaws.com/testhabitica/kibbl/screen-3.png', width='100%')
    .row
      .col-md-12.text-center
        a(@click='openAndroid()', style='display:inline-block;width: 200px;')
          img(src='https://kibblblog.files.wordpress.com/2017/07/4b70f6fae447.png?w=300&h=88',
             alt='', width='100%')
        a(@click='openApple()', style='display:inline-block;width: 200px;')
          img(src='https://kibblblog.files.wordpress.com/2017/07/f06b908907d5.png?w=300&h=89',
          alt='', width='100%')
</template>

<script>
  export default {
    name: 'MarketingPage',
    methods: {
      openAndroid () {
        this.$ga.event('download', 'android-app')
        window.location.href = 'https://goo.gl/J37fvk'
      },
      openApple () {
        this.$ga.event('download', 'ios-app')
        window.location.href = 'https://goo.gl/kxGhxe'
      }
    }
  }
</script>

<style>
  .navbar {
    display: none;
  }

  h1 {
    color: #fff;
    font-size: 28px;
    width: 1000px;
    margin: 0 auto;
    margin-bottom: 1.5em;
  }

  .background {
    background: #ff9933 !important;
  }

  .featurette-divider {
    display: none;
  }

  .app-images {
    margin-top: 4em;
    margin-bottom: 4em;
  }
</style>
