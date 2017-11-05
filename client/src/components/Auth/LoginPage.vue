<template lang="pug">
section.container
  .col-12.col-md-6.offset-md-3
    .card
      .card-height-indicator
      .card-content
        .card-body(style='height:auto;')
           h2 Login
           form(@submit.prevent='login()')
            .form-group.input-field
              label Email
              input.form-control(type='text', name='email', v-model='email')
            .form-group.input-field
              label Password
              input.form-control(type='password', name='password', v-model='password')
            button.btn.btn-primary.btn-raised.btn-lg(type='submit') Login
            hr
            p
              button.btn.btn-facebook.btn-raised.btn-lg(fb-login type="button", style='background-color:#3b5998') Facebook
            p
              | Need an account?
              a(href='/#/register') Register
</template>

<script>
  export default {
    name: 'LoginPage',
    data () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      login () {
        console.log(this.email, this.password)
      }
    }
  }
</script>

<style scoped>
  .container {
    margin-top: 2em;
  }
</style>
