<template lang="pug">
section.container
  .col-12.col-md-6.offset-md-3
    .card
      .card-height-indicator
      .card-content
        .card-body(style='height:auto;')
          h2 Register
          form(@submit.prevent='register()')
            .form-group
              label Email
              input.form-control(type='text', name='email', v-model='email')
            .form-group
              label Password
              input.form-control(type='password', name='password', v-model='password')
            button.btn.btn-primary.btn-raised.btn-lg Register
          hr
          p
            button.btn.btn-facebook.btn-raised.btn-lg(fb-login type="button", style='background-color:#3b5998') Facebook
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'RegisterPage',
    data () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      register () {
        axios.post('/api/v1/register', {
          email: this.email,
          password: this.password
        })
        .then(response => {
          // @TODO: Set in store
          localStorage.setItem('user-token', response.data.token)
        })
        .catch(err => {
          alert(err.response.data.message)
        })
      }
    }
  }
</script>

<style scoped>
  .container {
    margin-top: 2em;
  }
</style>
