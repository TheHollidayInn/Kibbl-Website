<template lang="pug">
router-link(:to="{ path: `/pets/${pet._id}` }")
  .grid-content.gradient
    .col-12.text-center
      .image-circle-default(v-if='!image')
      .image-circle(v-else, :style='`background-image:url(${image})`')
    .col-12
      h3 {{pet.name}}
      //- h5 {{pet.description}}
</template>

<script>
  export default {
    name: 'PetListItem',
    props: ['pet'],
    computed: {
      image () {
        if (!this.pet.media || !this.pet.media[0] || !this.pet.media[0].urlSecureThumbnail) return false
        return this.pet.media[0].urlSecureThumbnail
      }
    }
  }
</script>

<style scoped>
  .image-circle-default {
    background-image: url('../../assets/kibbl-logo-dog.png');
    width: 100px;
    height: 100px;
    margin: 0 auto;
    background-size: cover;
  }
</style>
