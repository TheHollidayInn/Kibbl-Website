<template lang="pug">
router-link(:to="{ path: `/shelters/${shelter._id}` }")
  .grid-content.gradient
    .col-12.text-center
      .image-circle-default(v-if='!image')
      .image-circle(v-if='image', :style='`background-image:url(${image})`')
    .col-12
      h3 {{shelter.name}}
      //- h5(v-if='shelter.description && !shelter.about') {{shelter.description}}
      //- h5(v-if='shelter.about') {{shelter.about}}
</template>

<script>
  export default {
    name: 'ShelterListItem',
    props: ['shelter'],
    computed: {
      image () {
        if (!this.shelter || !this.shelter.facebook || !this.shelter.facebook.cover) return false
        return this.shelter.facebook.cover
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
