<template lang="pug">
a(:href='`/pets/${pet._id}`')
  .grid-content.gradient
    .col-md-4
      .image-circle(v-if='!thumbnail', style='background-image:url(../assets/kibbl-logo-dog.png)')
      .image-circle(v-if='thumbnail', :style='`background-image:url(${thumbnail})`')
    .col-md-8
      h3 {{pet.name}}
      h5 {{description}} ...
</template>

<script>
  export default {
    name: 'PetNotification',
    props: ['pet'],
    computed: {
      thumbnail () {
        if (!this.pet || !this.pet.media || !this.pet.media[0] || !this.pet.media[0].urlSecureThumbnail) return false
        return this.pet.media[0].urlSecureThumbnail
      },
      description () {
        // limitTo: 100
        return this.pet.description
      }
    }
  }
</script>
