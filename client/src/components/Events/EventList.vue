<template lang="pug">
.container-fluid(ng-class="{collapsed: filterCollapsed}")
  .row
    .col-12.header
      h1(v-if='!loading') Events
      h1.loader(v-if='loading') Loading...
    .col-3.filters
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
    .col-9
      .row(infinite-scroll="scroll()", v-for="(events, key) in groupedEvents")
        h2.col-12.text-center {{key}}
        .col-12.col-md-4.grid-item(v-for="event in events")
          event-list-item(:event='event')
</template>

<script>
  import EventListItem from './EventListItem'

  export default {
    name: 'EventList',
    components: {
      EventListItem
    },
    data () {
      return {
        loading: false
      }
    },
    computed: {
      groupedEvents () {
        return {
          'Thurday': [
            {
              time: '8:30 am – 1 pm',
              date: '2001-09-16T05:00:00.000Z',
              location: 'Parfet Park, Downtown Golden',
              description: 'We are excited to announce that we have a new, dedicated website for Toby’s Pet Parade & Fair! On the website, you’ll find all the information you need about how to register for the Parade, costume ideas, details about the Fair and more!\nThe second annual event will be held on Saturday, September 16 in downtown Golden, CO. Dress up your dog in their best costume and join us for a celebration to benefit Foothills Animal Shelter. From a pet costume parade and contests, to flyball and agility demos, to family-friendly games and activities, you’re sure to find something for everyone, all while helping us raise critical funds to support the homeless pets at Foothills Animal Shelter!\nCLICK HERE TO LEARN MORE ABOUT TOBY’S PET PARADE & FAIR.\n- See more at: http://foothillsanimalshelter.org/newsevents/events/tobys-pet-parade-fair/#sthash.ocE0RFRD.dpuf',
              name: 'Toby’s Pet Parade & Fair',
              _id: '59f32b19d0573a21ce72e8e7',
              createdAt: '2017-10-27T12:48:25.339Z'
            }
          ]
        }
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
