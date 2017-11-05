<template lang="pug">
.well.col-md-12
  .col-md-6.col-md-offset-3
    .form
      legend Reset Password
      .form-group
        label(for='password') New Password
        input.form-control(type='password', ng-model='password', name='password', value='', placeholder='New password', autofocus=true)
      .form-group
        label(for='confirm') Confirm Password
        input.form-control(type='password', ng-model='passwordConfirm', name='confirm', value='', placeholder='Confirm password')
      .form-group
        button.btn.btn-primary(type='submit', ng-click='send()') Update Password
</template>

<script>
  export default {
    name: 'ResetPage'
  }
</script>

<style>

</style>
