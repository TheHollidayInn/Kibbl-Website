<template lang="pug">
.container-fluid
  .row
    .col-12.header
      h1(v-if='!loading') Pets
      h1.loader(v-if='loading') Loading...
    .col-3.d-none.d-sm-none.d-md-block.filters
      .form-group
        label Search
        input.form-control(v-model='filters.search', type='text')
      .form-group
        label Location
        vue-google-autocomplete(
          id="map"
          classname="form-control"
          placeholder="Location"
          v-on:placechanged="getAddressData",
          type="locality"
        )
      .form-group(input-field='')
        label Type
        br
        select.form-control(v-model='filters.type')
          option(v-for='option in petTypes', :value="option.value") {{option.key}}
      .form-group
        label Breed
        select.form-control(v-model='filters.breed')
          option(v-for='option in petBreeds', :value="option") {{option}}
      .form-group
        label Age
        br
        select.form-control(v-model='filters.age')
          option(v-for='option in petAges', :value="option.value") {{option.key}}
      .form-group(input-field='')
        label Gender
        br
        select.form-control(v-model='filters.gender')
          option(v-for='option in petGenders', :value="option.value") {{option.key}}
      .form-group
        button.btn.btn-primary.btn-raised.hidden-xs(@click='filter()') Filter
    .col-12.col-md-9
      .row(infinite-scroll="scroll()", infinite-scroll-distance="1")
        .col-12.col-md-4.grid-item(v-for="pet in pets")
          pet-list-item(:pet='pet')
</template>

<script>
  import axios from 'axios'
  import PetListItem from './PetListItem'
  import VueGoogleAutocomplete from 'vue-google-autocomplete'
  import filtersMixin from '@/mixins/filtersMixin'
  import {DOG_BREEDS, CAT_BREEDS} from './filters.js'

  export default {
    name: 'PetList',
    mixins: [filtersMixin],
    components: {
      PetListItem,
      VueGoogleAutocomplete
    },
    data () {
      return {
        pets: [],
        loading: false,
        petAges: [
          {
            value: '',
            key: 'All'
          },
          {
            value: 'Baby',
            key: 'Baby'
          },
          {
            value: 'Young',
            key: 'Young'
          },
          {
            value: 'Adult',
            key: 'Adult'
          },
          {
            value: 'Senior',
            key: 'Senior'
          }
        ],
        petGenders: [
          {
            value: '',
            key: 'All'
          },
          {
            value: 'Male',
            key: 'Male'
          },
          {
            value: 'Female',
            key: 'Female'
          }
          // {
          //   value: 'U',
          //   key: "Unkown"
          // },
        ],
        petTypes: [
          {
            value: '',
            key: 'All'
          },
          {
            value: 'Dog',
            key: 'Dog'
          },
          {
            value: 'Cat',
            key: 'Cat'
          }
          // {
          //   value: 'Bird',
          //   key: "Bird"
          // },
        ],
        filters: {
          search: '',
          location: ''
        }
      }
    },
    mounted () {
      this.loadPets()
    },
    beforeRouteUpdate (to, from, next) {
      this.loadPets()
      next()
    },
    watch: {
      '$route' (to, from) {
        this.loadPets()
      }
    },
    computed: {
      petBreeds () {
        const ALL_BREEDS = DOG_BREEDS.concat(CAT_BREEDS)
        return ALL_BREEDS
      }
    },
    methods: {
      loadPets () {
        let params = {}
        if (this.$route.params.shelterId) params.shelterId = this.$route.params.shelterId

        axios.get('/api/v1/pets', {params})
          .then((response) => {
            this.pets = response.data.pets
          })
      },
      filter () {
        axios.get('/api/v1/pets', {params: this.filters})
          .then((response) => {
            this.pets = response.data.pets
          })
      }
    }
  }
</script>

<style scoped>
  .header {
    background: #fff;
    padding: 2em;
    margin-bottom: 1em;
  }

  .filters {
    text-align: left;
    padding-left: 1.5em;
  }

  .grid-item {
    height:200px;
    overflow:hidden;
    border-radius: 5px;
  }
</style>
