<template lang="pug">
.well.col-12
  .col-12.col-md-6.offset-md-3
    .form
      legend Forgot Password
      .form-group
        label(for='email') Email
        input.form-control(type='text', name='email', autofocus, v-model='email')
      button.btn.btn-primary(@click='send()', ng-disabled='!email') Reset Password
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'ForgotPassword',
    data () {
      return {
        email: ''
      }
    },
    methods: {
      send () {
        axios.post('/api/v1/forgot-password', {email: this.email})
        .then(function (response) {
          alert('An email has been sent with instruction on how to change your password')
        })
        .catch(function (response) {
          alert(response.data.message)
        })
      }
    }
  }
</script>

<style scoped>
  .well {
    padding-top: 2em;
    padding-bottom: 2em;
  }
</style>
