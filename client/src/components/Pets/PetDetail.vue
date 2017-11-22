<template lang="pug">
div
  .container-fluid.banner
    .container
      h1.text-center {{pet.name}}
  .container-fluid.container-detail
    .container
      .row
        .col-md-9
          .well.img-feature-wrapper(v-if='pet.media && pet.media[0] && pet.media[0].urlSecureFullsize')
            div.img-feature(:style="`background-image:url(${pet.media[0].urlSecureFullsize})`")
        .col-md-3.action-buttons
          a.btn.btn-primary(v-if='pet.contact && pet.contact.url', :href="pet.contact.url", target="_blank") Webpage
          button.btn.btn-raised.btn-primary.btn-favorite(@click='favorite()', v-if='!pet.favorited')
            | Favorite
          button.btn.btn-raised.btn-primary.btn-favorite-active(@click='favorite()', v-if='pet.favorited')
            | Remove
  .container(style="margin-top: 2rem;")
    .row
      .col-md-8
        .well
          h3 Description
          p(style="white-space: pre-wrap;") {{description}}
        comments(:item-id='pet._id', v-if='pet._id')
      .col-md-3
        .well
          h3 Details
          ul
            li(v-if='pet.shelterId && pet.shelterId.name')
              a(:href='`/shelters/${pet.shelterId._id}`', target='_blank') {{pet.shelterId.name}}
            li Age: {{pet.age}}
            li Type: {{pet.animal}}
            //li Updated: {{pet.lastUpdate | date}}
          div(v-if='pet.contact && (pet.contact.email || pet.contact.phone)')
            h3 Contact
            div {{pet.contact.email}}
            div {{pet.contact.phone}}
          h3 Breed
          ul
            li(v-for="breed in pet.breeds") {{breed}}
          a.btn.btn-primary(ng-if='pet.contact.url', href="pet.contact.url", target="_blank") Webpage
        .well.social-buttons
          a.btn.btn-block.btn-raised.btn-facebook(target="_new", :href='`https://www.facebook.com/sharer/sharer.php?u={{facebookUrl}}&src=sdkpreparse`')
            i.fa.fa-facebook-official
            |  Share
          a.btn.btn-block.btn-raised.btn-twitter(target="_new", :href='twitterUrl')
            i.fa.fa-twitter-square
            |  Tweet
</template>

<script>
  import axios from 'axios'
  import Comments from '@/components/Comments'
  import { parameterize } from '@/libs/queryHelper'

  export default {
    name: 'PetDetail',
    components: {
      Comments
    },
    data () {
      return {
        pet: {}
      }
    },
    mounted () {
      const petId = this.$route.params.petId

      axios.get(`/api/v1/pets/${petId}`)
        .then((response) => {
          this.pet = response.data.data
        })
    },
    computed: {
      twitterUrl () {
        const url = window.location.href
        const tweetDetails = {
          url,
          text: 'Check out this amazing pet on Kibbl: '
        }
        return 'https://twitter.com/intent/tweet?' + parameterize(tweetDetails)
      },
      facebookUrl () {
        const url = window.location.href
        return `https://www.facebook.com/sharer/sharer.php?u=${url}&src=sdkpreparse`
      },
      description () {
        let text = this.pet.description
        if (!text) return ''

        const entities = [
          ['amp', '&'],
          ['apos', '\''],
          ['#x27', '\''],
          ['#x2F', '/'],
          ['#39', '\''],
          ['#47', '/'],
          ['lt', '<'],
          ['gt', '>'],
          ['nbsp', ' '],
          ['quot', '"'],
          ['ldquo', '"'],
          ['rsquo', '"'],
          ['#039', '\'']
        ]

        for (let i = 0, max = entities.length; i < max; ++i) {
          text = text.replace(new RegExp('&' + entities[i][0] + ';', 'g'), entities[i][1])
        }

        let tweetShit = `Tweet!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='//platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','twitter-wjs');  (function() {var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;po.src = 'https://apis.google.com/js/plusone.js';var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s); })();`
        let tweetShitIndex = text.indexOf(tweetShit)
        if (tweetShitIndex !== -1) {
          text = text.replace(tweetShit, '')
        }

        return text
      }
    },
    methods: {
      favorite () {
        this.pet.favorited = !this.pet.favorited

        axios.post('/api/v1/favorites', {
          type: 'pet',
          itemId: this.pet._id
        })
      }
    }
  }
</script>

<style scoped>
  .well {
    background: #fff;
    padding: 1em;
  }

  .social-buttons a {
    display: block;
    margin: 0 auto;
    margin-bottom: .5em;
  }

  .action-buttons {
    padding: 1em;
  }

  .action-buttons a {
    margin-right: .5em;
  }

  .action-buttons .btn-favorite {
    background-color: #ff9933;
  }
</style>
