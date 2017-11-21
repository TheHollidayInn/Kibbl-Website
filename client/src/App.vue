<template lang="pug">
  div(id="app")
    nav-bar
    router-view
</template>

<script>
  import NavBar from './components/NavBar'
  import axios from 'axios'

  export default {
    name: 'app',
    components: {
      NavBar
    },
    mounted () {
      axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        const userToken = localStorage.getItem('user-token')
        config.headers.Authorization = 'Bearer ' + userToken
        config.headers['x-access-token'] = userToken

        return config
      }, function (error) {
        // Do something with request error
        return Promise.reject(error)
      })
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  body {
    background: #E8E8E8;
  }

  .filter-toggle {
    background-color: #ff9933 !important;
    position: fixed !important;
    bottom: 20px;
    z-index:1000;
    left: 0;
    margin-left: 10em !important;
    height: 50px;
  }

  .collapsed {
    height: 0 !important;
    display: none !important;
  }

  .btn-primary {
    background: #FF5F4A !important;
    border-color: #FF5F4A !important;
    color: #fff !important;
  }

  .img-feature-wrapper {
    width: 185px;
    position: absolute;
    top: -12rem;
    left: 4rem;
  }

  .img-feature {
    background-position: center;
    background-size: cover;
    height: 150px;
    width: 150px;
    background-repeat: no-repeat;
  }

  .banner-logo {
    height: 15rem;
    display: block;
    margin: 0 auto;
  }

  .well, .grid-item .card {
    box-shadow: 0 1px 1.5px rgba(35,45,50,.15) !important;
  }

  .grid-item .card {
    height: 20rem;
  }

  .grid-item .card h3 {
    font-size: 2rem !important;
  }

  .grid-item .card .card-image {
    height: 10rem !important;
  }

  /* Logo */

  .banner-logo1 {
    background-image: url('./assets/kibbl-logo-dog.png');
    height: 60px;
    width: 60px;
    background-size: 100%;
    float: left;
    background-position: -10px -13px;
    background-repeat: no-repeat;
    overflow: none;
  }

  .banner-logo2 {
    background-image: url('./assets/kibbl-logo-word.png');
    height: 60px;
    width: 80px;
    background-size: 100%;
    float: left;
    background-repeat: no-repeat;
    background-position: -10px 0px;
    overflow: none;
  }

  .main.container-fluid {
    padding: 0px;
    margin-top: 50px;
  }

  .image-circle {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    margin: 0 auto;
    background-position: center;
    background-size: cover;
  }

  /* Banner */
  .banner {
    /*background-image: url('//www.petfinder.com/wp-content/uploads/2016/08/slide-1.jpg');*/
    background: #C14216;
    background-size: 100%;
    padding: 5rem;
    background-position: center;
  }

  .banner h1 {
    color: #fff;
    font-size: 55px;
  }

  /* Favorites */
  a.favorited {
    color: grey !important;
    cursor: pointer;
  }

  a.favorited.active {
    color: red !important;
  }

  /* Grid */
  .grid-item {
    margin-bottom: 3rem;
    overflow: none;
  }

  .card-body {
    overflow: hidden;
  }


  .img-display {
    width: 100%;
    height: 200px;
    background-repeat: no-repeat;
  }

  .gradient {
    width: 100%;
    height: 100%;
    background: url('http://unsplash.it/1200x800') center center no-repeat;
    background-size: cover;
    /*position: relative;*/
    border-radius: 5px;
    background-image: linear-gradient(to bottom right, #FF5F4A, #931D10);
  }

  .grid-content.image-display {
    background-size: cover;
    width: 100%;
    height: 100%;
    text-shadow: 2px 2px 2px #222;
  }

  .grid-content {
    color: #fff;
    padding: 1.5rem;
  }

  .grid-item a {
    text-decoration: none !important;
  }

  .grid-item h3 {
    font-size: 16px;
    margin-top: .5em;
  }

  .grid-item h5 {
    font-size: 10px;
  }

  .bg-img {
    width: 100%;
    height: 80%;
    background: url('http://unsplash.it/1200x800') center center no-repeat;
    background-size: cover;
    position: relative;
    border-radius: 5px;
    box-shadow: 0 1px 1.5px rgba(35,45,50,.15) !important;
    /*background-image: linear-gradient(to bottom right, #FF5F4A, #931D10);*/
  }

  .bg-img:after {
    border-radius: 5px;
    content: '';
  	position: absolute;
  	top: 0;
  	right: 0;
  	bottom: 0;
  	left: 0;
  	/*background-image: linear-gradient(to bottom right, #FF5F4A, #931D10);
  	opacity: 0.6;*/
  }

  .container-detail {
    background-color: white !important;
  }

  .btn-favorite-active {
    color: white !important;
    width: 31%;
    text-align: center;
    background-color: gold !important;
  }

  .btn-favorite {
    color: white !important;
    width: 31%;
    text-align: center;
    background-color: gray !important;
  }

  .btn-contact {
    width: 67%;
    text-align: center;
  }

  .btn-twitter {
    color: white !important;
    width: 48%;
    text-align: center;
    background-color: #00aced !important;
  }

  .btn-facebook {
    color: white !important;
    width: 48%;
    text-align: center;
    background-color: #3b5998 !important;
  }

  /* Loading */
  .loader,
  .loader:before,
  .loader:after {
    background: #444;
    -webkit-animation: load1 1s infinite ease-in-out;
    animation: load1 1s infinite ease-in-out;
    width: 1em;
    height: .8em;
  }
  .loader {
    color: #444;
    text-indent: -9999em;
    margin: 22px auto;
    position: relative;
    font-size: 11px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }
  .loader:before,
  .loader:after {
    position: absolute;
    top: 0;
    content: '';
  }
  .loader:before {
    left: -1.5em;
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }
  .loader:after {
    left: 1.5em;
  }
  @-webkit-keyframes load1 {
    0%,
    80%,
    100% {
      box-shadow: 0 0;
      height: .8em;
    }
    40% {
      box-shadow: 0 -2em;
      height: 1em;
    }
  }
  @keyframes load1 {
    0%,
    80%,
    100% {
      box-shadow: 0 0;
      height: .8em;
    }
    40% {
      box-shadow: 0 -2em;
      height: 1em;
    }
  }
</style>
