<template lang="pug">
.well.col-md-12
  .col-md-6.col-md-offset-3
    .form
      legend Forgot Password
      .form-group
        label(for='email') Email
        input.form-control(type='text', name='email', autofocus, ng-model='email')
      button.btn.btn-primary(ng-click='send()', ng-disabled='!email') Reset Password
</template>

<script>
  export default {
    name: 'ForgotPassword'
  }
</script>

<style>

</style>
