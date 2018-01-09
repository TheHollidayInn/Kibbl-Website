<template lang="pug">
section.background.container-fluid
  .container
    .row
      .col-12.col-md-6.text-center
        img(src="https://gallery.mailchimp.com/2116c7fd08e32fb02b8884e88/images/4984a247-bb60-4a3f-8db4-33b91bd30de7.gif", alt="Kibbl Logo", class="banner-logo")
      .col-12.col-md-6
        h1 Keep up to date with local rescues
        h3 Subscribe to local rescues and start receiving notifications when they add events or new adoptable pets.
        .form-row
          .col-12
            .card
              .card-height-indicator
              .card-content
                .card-body(style='height:auto;')
                  // Begin MailChimp Signup Form
                  link(href='//cdn-images.mailchimp.com/embedcode/slim-10_7.css', rel='stylesheet', type='text/css')
                  #mc_embed_signup
                    form#mc-embedded-subscribe-form.validate(action='https://kibbl.us13.list-manage.com/subscribe/post?u=2116c7fd08e32fb02b8884e88&id=af9c71806a', method='post', name='mc-embedded-subscribe-form', target='_blank', novalidate='')
                      #mc_embed_signup_scroll
                        label(for='mce-EMAIL') Sign up for the Beta
                        input#mce-EMAIL.email(type='email', value='', name='EMAIL', placeholder='email address', required='')
                        // real people should not fill this in and expect good things - do not remove this or risk form bot signups
                        div(style='position: absolute; left: -5000px;', aria-hidden='true')
                          input(type='text', name='b_2116c7fd08e32fb02b8884e88_af9c71806a', tabindex='-1', value='')
                        .clear
                          input#mc-embedded-subscribe.button(type='submit', value='Subscribe', name='subscribe')
                  // End mc_embed_signup

                   h2.text-center Sign up for the Beta
                   form(@submit.prevent='login()')
                    .form-group.input-field
                      label Email
                      input.form-control(type='text', name='email', v-model='email')
                    button.btn.btn-primary.btn-raised.btn-lg(type='submit') Signup
</template>

<script>
  export default {
    name: 'BetaPage',
    methods: {
    }
  }
</script>

<style scoped>
  a:hover {
    cursor: pointer
  }

  h1, h2 {
    color: #fff;
    font-size: 28px;
    margin: 0 auto;
  }

  h1 {
    font-size: 44px;
    margin-top: 2em;
    text-align: left;
    color: #4F2748;
    font-weight: bold;
    margin-bottom: .5em;
  }

  h2 {
    font-size: 24px;
    width: auto;
    color: #2c3e50;
  }

  h3 {
    font-size: 18px;
    text-align: left;
    color: #4F2748;
    margin-bottom: 1em;
  }

  .container-fluid {
    background: #ff9933 !important;
  }

  .background {
    min-height: 100%;
    padding-bottom: 15em;
  }

  .featurette-divider {
    display: none;
  }

  .app-images {
    margin-top: 4em;
    margin-bottom: 4em;
  }

  #mc_embed_signup{
    background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif;
  }

  .form-row {
    /* margin-bottom: 4em; */
  }

  .banner-logo {
    width: 60%;
    margin-top: 2em;
  }
</style>
