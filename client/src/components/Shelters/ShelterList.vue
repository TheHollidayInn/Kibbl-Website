<template lang="pug">
.container-fluid(ng-class="{collapsed: filterCollapsed}")
  .row
    .col-12.header
      h1(v-if='!loading') Shelters
      h1.loader(v-if='loading') Loading...
    .col-3.d-none.d-sm-none.d-md-block.filters
      .form-group
        label Search
        input.form-control(v-model='filters.search', type='text')
      .form-group
        label Location
        input.form-control(v-model='filters.location', type='text', googleplace-autocomplete, googleplace-autocomplete-place='filters.autocomplete')
      .form-group
        button.btn.btn-primary.btn-raised(@click='filter()') Filter
    .col-12.col-md-9
      .row(infinite-scroll="scroll()", infinite-scroll-distance="1")
        .col-12.col-md-4.grid-item(v-for="shelter in shelters")
          shelter-list-item(:shelter='shelter')
</template>

<script>
  import axios from 'axios'
  import ShelterListItem from './ShelterListItem'

  export default {
    name: 'ShelterList',
    components: {
      ShelterListItem
    },
    data () {
      return {
        loading: false,
        filters: {
          search: '',
          location: ''
        },
        shelters: [
          {
            __v: 0,
            description: 'Foothills Animal Shelter is an open-admissions facility, which means we never turn away an animal. We care for more than 9,500 orphaned cats, kittens, dogs, puppies and critters every year with a compassionate team of staff and volunteers. (Unfortunately, we can not accept wild animals; they should be taken to organizations who specialize in their care.) We are a true community resource and offer a variety of services including pet adoption, Jefferson County pet licensing, affordable spaying and neutering, vaccinations, microchipping and lost and found pets. We are committed to our important mission and the life-saving work that we do every day of the year. - See more at: http://foothillsanimalshelter.org/about/about-foothills-animal-shelter/#sthash.A5jTVepq.dpuf',
            name: 'Foothills Animal Shelter',
            _id: '59f32cd04b8bfc226327da06',
            createdAt: '2017-10-27T12:55:44.493Z',
            locationCoords: { coordinates: [ 0, 0 ], type: 'Point' }
          }
        ]
      }
    },
    mounted () {
      axios.get('/api/v1/shelters')
        .then((response) => {
          this.shelters = response.data.data
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
