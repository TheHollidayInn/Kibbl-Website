<template lang="pug">
.container-fluid(ng-class="{collapsed: filterCollapsed}")
  .row
    .col-12.header
      h1(v-if='!loading') Pets
      h1.loader(v-if='loading') Loading...
    .col-3.d-none.d-sm-none.d-md-block.filters
      .form-group
        label Search
        input.form-control(ng-model='filters.search', type='text')
      .form-group
        label Location
        input.form-control(ng-model='filters.location', type='text', googleplace-autocomplete, googleplace-autocomplete-place='filters.autocomplete')
      .form-group(input-field='')
        label Type
        br
        select.form-control(ng-model='filters.type')
          option(v-for='option in petTypes', value="option.value") {{option.key}}
      .form-group
        label Breed
        input.form-control(ng-model='filters.breed', type='text', uib-typeahead="breed for breed in currentBreeds | filter:$viewValue | limitTo:8" )
      .form-group(input-field='')
        label Age
        br
        select.form-control(ng-model='filters.age')
          option(v-for='option in petAges', value="option.value") {{option.key}}
      .form-group(input-field='')
        label Gender
        br
        select.form-control(ng-model='filters.gender')
          option(v-for='option in petGenders', value="option.value") {{option.key}}
      .form-group
        button.btn.btn-primary.btn-raised.hidden-xs(ng-click='filter()') Filter
    .col-12.col-md-9
      .row(infinite-scroll="scroll()", infinite-scroll-distance="1")
        .col-12.col-md-4.grid-item(v-for="pet in pets")
          pet-list-item(:pet='pet')
</template>

<script>
  import axios from 'axios'
  import PetListItem from './PetListItem'

  export default {
    name: 'PetList',
    components: {
      PetListItem
    },
    data () {
      return {
        pets: [
          {
            __v: 0,
            animal: 'Cat',
            lastUpdate: '2016-12-07T20:32:04.000Z',
            description: '3-4 MOTHS OLD, AVAILABLE NOW. FERAL BARN CAT.\nAdoption fee is $60. It pays to have the dog spayed or neutered; Rabies, Bordetella and DHPP Vaccines; treatment for fleas and ticks as needed, 1st month heartworm preventative, Deworming for hook and round worms, pre-surgical pain medications, occult heartworm test, and a Microchip.\nRemember to share the posts and &  like the Denton Animal Shelter Facebook page! \nAdoption hours are Monday - Saturday 10 AM - 5 PM.  Please forward any questions about dogs to animal.services@cityofdenton.com.',
            sex: 'M',
            name: 'EPIC-BARN CAT',
            shelterPetId: '66897',
            petId: '36919577',
            size: 'S',
            age: 'Young',
            status: 'A',
            _id: '59f32b1fe754d021eb77c9e1',
            locationCoords: { coordinates: [ 0, 0 ], type: 'Point' },
            breeds: [ 'Tabby - Orange' ],
            media: [],
            contact:
            {
              phone: null,
              state: 'TX',
              address2: null,
              email: 'gnelsen@live.com',
              zip: '76205',
              fax: null,
              address1: '3717 N Elm Street'
            },
            createdAt: '2017-10-27T12:48:31.187Z'
          }
        ],
        loading: false,
        petTypes: [],
        petAges: [],
        petGenders: [],
        search: '',
        location: ''
      }
    },
    mounted () {
      axios.get('/api/v1/pets')
        .then((response) => {
          this.pets = response.data.pets
        })
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
