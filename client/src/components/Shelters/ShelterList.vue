<template lang="pug">
.container-fluid
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
        vue-google-autocomplete(
          id="map"
          classname="form-control"
          placeholder="Location"
          v-on:placechanged="getAddressData",
          type="locality"
        )
      .form-group
        button.btn.btn-primary.btn-raised(@click='filter()') Filter
    .col-12.col-md-9
      .row(infinite-scroll="scroll()", infinite-scroll-distance="1")
        .col-12.col-md-4.grid-item(v-for="shelter in shelters")
          shelter-list-item(:shelter='shelter')
    .col-12.col-md-9.offset-md-3.text-center
      button.btn.btn-primary.load-more(@click='loadMore()') Load More
</template>

<script>
  import axios from 'axios'
  import ShelterListItem from './ShelterListItem'
  import Datepicker from 'vuejs-datepicker'
  import VueGoogleAutocomplete from 'vue-google-autocomplete'
  import filtersMixin from '@/mixins/filtersMixin'

  export default {
    name: 'ShelterList',
    mixins: [filtersMixin],
    components: {
      ShelterListItem,
      Datepicker,
      VueGoogleAutocomplete
    },
    data () {
      return {
        loading: false,
        filters: {
          search: '',
          location: ''
        },
        shelters: []
      }
    },
    metaInfo () {
      let title = 'Shelters'

      if (this.filters.search) {
        title = `${this.filters.search} Animal Shelter`
      }

      return {
        title,
        meta: [
          { 'og:title': title },
          { 'og:description': title },
          { 'og:url': window.location.href },
          { 'twitter:title': title },
          { 'twitter:description': title },
          { 'twitter:card': title }
        ]
      }
    },
    mounted () {
      let city = this.$route.params.city
      if (city) {
        city = city.split(',')[0]
        this.filters.search = city
      }

      this.filter()
    },
    methods: {
      filter () {
        axios.get('/api/v1/shelters', {params: this.filters})
          .then((response) => {
            this.shelters = response.data.data
          })
      },
      loadMore () {
        let params = {}
        if (this.$route.params.shelterId) params.shelterId = this.$route.params.shelterId

        const lastEvent = this.shelters[this.shelters.length - 1]
        params.createdAtBefore = lastEvent.createdAt

        axios.get('/api/v1/shelters', {params})
          .then((response) => {
            this.shelters = this.shelters.concat(response.data.data)
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

  .load-more {
    margin: 1em auto;
  }
</style>
