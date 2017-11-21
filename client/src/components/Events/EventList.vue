<template lang="pug">
.container-fluid
  .row
    .col-12.header
      h1(v-if='!loading') Events
      h1.loader(v-if='loading') Loading...
    .col-3.d-none.d-sm-none.d-md-block.filters
      .form-group
        label Search
        input.form-control(ng-model='filters.search', type='text')
      .form-group
        label Location
        input.form-control(ng-model='filters.location', type='text', googleplace-autocomplete, googleplace-autocomplete-place='filters.autocomplete')
      .form-group
        label Between
        p.input-group
          input.form-control(type='text',
            uib-datepicker-popup='format',
            ng-model='filters.startDate',
            is-open='popup1.opened',
            datepicker-options='dateOptions', required='true', close-text='Close', alt-input-formats='altInputFormats')
          span.input-group-btn
            button.btn.btn-default(type='button', @click='open1()')
              i.glyphicon.glyphicon-calendar
      .form-group
        label And
        p.input-group
          input.form-control(type='text',
            uib-datepicker-popup='format',
            ng-model='filters.endDate',
            is-open='popup2.opened',
            datepicker-options='dateOptions', required='true', close-text='Close', alt-input-formats='altInputFormats')
          span.input-group-btn
            button.btn.btn-default(type='button', @click='open2()')
              i.glyphicon.glyphicon-calendar
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

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  export default {
    name: 'EventList',
    components: {
      EventListItem
    },
    data () {
      return {
        loading: false,
        events: []
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
