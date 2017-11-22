<template lang="pug">
.container-fluid
  .row
    .col-12.header
      h1(v-if='!loading') Events
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
        label Between
        datepicker.form-control(:value='filters.startDate', v-on:selected="updateStartDate")
      .form-group
        label And
        datepicker.form-control(:value='filters.endDate', v-on:selected="updateEndDate")
      .form-group
        button.btn.btn-primary.btn-raised.hidden-xs(@click='filter()') Filter
    .col-12.col-md-9
      .row(infinite-scroll="scroll()", v-for="(events, key) in groupedEvents")
        h2.col-12.text-center {{key}}
        .col-12.col-md-4.grid-item(v-for="event in events")
          event-list-item(:event='event')
</template>

<script>
  import axios from 'axios'
  import groupBy from 'lodash/groupBy'
  import EventListItem from './EventListItem'
  import Datepicker from 'vuejs-datepicker'
  import VueGoogleAutocomplete from 'vue-google-autocomplete'
  import filtersMixin from '@/mixins/filtersMixin'

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  export default {
    name: 'EventList',
    mixins: [filtersMixin],
    components: {
      EventListItem,
      Datepicker,
      VueGoogleAutocomplete
    },
    data () {
      return {
        loading: false,
        events: [],
        filters: {
          search: ''
        }
      }
    },
    mounted () {
      this.loadEvents()
    },
    beforeRouteUpdate (to, from, next) {
      this.loadEvents()
      next()
    },
    watch: {
      '$route' (to, from) {
        this.loadEvents()
      }
    },
    computed: {
      groupedEvents () {
        return groupBy(this.events, (group) => {
          const date = new Date(group.start_time)
          return monthNames[date.getMonth()] + ' ' + date.getDate()
        })
      }
    },
    methods: {
      loadEvents () {
        let params = {}
        if (this.$route.params.shelterId) params.shelterId = this.$route.params.shelterId

        axios.get('/api/v1/events', {params})
          .then((response) => {
            this.events = response.data.data
          })
      },
      filter () {
        axios.get('/api/v1/events', {params: this.filters})
          .then((response) => {
            this.events = response.data.data
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
