<template lang="pug">
.well.col-12
  .col-12.col-md-6.offset-md-3
    .form
      legend Reset Password
      .form-group
        label(for='password') New Password
        input.form-control(type='password', v-model='password', name='password',
          value='', placeholder='New password', autofocus=true)
      .form-group
        label(for='confirm') Confirm Password
        input.form-control(type='password', v-model='passwordConfirm',
          name='confirm', value='', placeholder='Confirm password')
      .form-group
        button.btn.btn-primary(type='submit', @click='send()') Update Password
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'ResetPage',
    data () {
      return {
        password: '',
        passwordConfirm: ''
      }
    },
    methods: {
      send () {
        if (this.password !== this.passwordConfirm) {
          alert('Passwords do not match')
          return
        }

        axios.post('/api/v1/reset', {
          token: this.$route.query.token,
          password: this.password
        })
        .then(function (response) {
          window.location.href = '/login'
          alert(response.data.message)
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
