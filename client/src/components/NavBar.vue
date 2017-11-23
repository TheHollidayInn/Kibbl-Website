<template lang="pug">
nav.navbar.navbar-expand-lg.navbar-light.bg-light
  a.navbar-brand(href='/#/home')
    div.logo1
    div.logo2
  button.navbar-toggler(type='button',
    data-toggle='collapse',
    data-target='#navbarSupportedContent',
    aria-controls='navbarSupportedContent',
    aria-expanded='false', aria-label='Toggle navigation')
    span.navbar-toggler-icon
  #navbarSupportedContent.collapse.navbar-collapse
    ul.navbar-nav.mr-auto
      li.nav-item
        router-link.nav-link(:to="{ path: '/home' }")
          | Home
          span.sr-only (current)
      li.nav-item
        router-link.nav-link(:to="{ path: '/events' }") Events
      li.nav-item
        router-link.nav-link(:to="{ path: '/pets' }") Pets
      li.nav-item
        router-link.nav-link(:to="{ path: '/shelters' }") Shelters
    ul.navbar-nav.my-2.my-lg-0
      li.nav-item
        router-link.nav-link(:to="{ path: '/notifications' }", v-if='isLoggedIn')
          img(src='../assets/bell-icon.png', width="30px", height="30px")
      li.nav-item(v-if='!isLoggedIn')
        router-link.nav-link(:to="{ path: '/register' }") Register
      li.nav-item(v-if='!isLoggedIn')
        router-link.nav-link(:to="{ path: '/login' }") Login
      b-dropdown.nav-item(text='Profile', v-if='isLoggedIn')
        b-dropdown-item
          router-link.dropdown-item(:to="{ path: '/favorites' }") Favorites
        b-dropdown-item
          router-link.dropdown-item(:to="{ path: '/following' }") Following
        b-dropdown-divider
        b-dropdown-item
          a.dropdown-item(href="#", @click='logout()') Logout
      li.nav-item
        router-link.nav-link(:to="{ path: '/feedback' }") Feedback
</template>

<script>
  export default {
    name: 'NavBar',
    computed: {
      isLoggedIn () {
        return Boolean(this.$store.state.token)
      }
    },
    methods: {
      logout () {
        localStorage.setItem('user-token', '')
        this.$store.commit('setToken', '')
        this.$router.push('Home')
      }
    }
  }
</script>

<style scoped>
  /* Smartphones (portrait) ----------- */
  @media only screen and (max-width : 520px) {
    .navbar-brand {
      margin-left: 0px !important;
    }
  }

  .router-link-exact-active {
    font-weight: bold;
  }

  .navbar, .navbar.navbar-default {
    background-color: #fff !important;
    color: #ff9933 !important;
    /*color: rgba(255,255,255,.84);*/
  }

  .navbar-default .navbar-nav>li>a {
    /*color: #752F00 !important;*/
    color: #ff9933 !important;
  }

  .navbar-fixed-top  {
    -webkit-backface-visibility: hidden;
  }

  .navbar.navbar-default.main-nav {
    margin-bottom: 0px;
  }

  .logo1 {
    background-image: url('../assets/kibbl-logo-dog.png');
    height: 35px;
    width: 60px;
    background-size: 100%;
    background-position: -10px -13px;
    background-repeat: no-repeat;
    overflow: none;
    display: inline-block;
    vertical-align: bottom;
  }

  .logo2 {
    background-image: url('../assets/kibbl-logo-word.png');
    height: 35px;
    width: 80px;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: -10px 0px;
    overflow: none;
    display: inline-block;
    vertical-align: bottom;
  }
</style>

<style>
  .b-dropdown .btn-secondary, .b-dropdown .btn-secondary:active {
    background-color: transparent !important;
    border-color: transparent !important;
    box-shadow: none !important;
    color: rgba(0, 0, 0, 0.5) !important;
    margin-top: -.2em;
  }
</style>
