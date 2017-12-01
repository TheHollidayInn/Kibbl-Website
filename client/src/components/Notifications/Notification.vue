<template lang="pug">
div(v-if='notification')
  h3.text-center {{notification.shelterId.name}} {{checkDate}}
  .col-md-12(v-if='notification.newPets.length > 0')
    h4.text-center New Pets
    .row
      .col-md-4.grid-item(v-for="pet in notification.newPets", style="height:200px; overflow:hidden; border-radius: 5px;")
        pet-notification(:pet='pet')
  div.col-md-12(v-if='notification.updatedPets.length > 0')
    h4.text-center Updated Pets
    .row
      div.col-md-4.grid-item(v-for="pet in notification.updatedPets", style="height:200px; overflow:hidden; border-radius: 5px;")
        pet-notification(:pet='pet')
  div.col-md-12(v-if='notification.newEvents.length > 0')
    h4.text-center New Events
    .row
      .col-md-4.grid-item(v-for="event in notification.newEvents", style="height:200px; overflow:hidden; border-radius: 5px;")
        event-notification(:event='event')
  div.col-md-12(v-if='notification.updatedEvents.length > 0')
    h4.text-center Updated Events
    .row
      .col-md-4.grid-item(v-for="event in notification.updatedEvents", style="height:200px; overflow:hidden; border-radius: 5px;")
        event-notification(:event='event')
</template>

<script>
  import moment from 'moment'
  import PetNotification from './PetNotification'
  import EventNotification from './EventNotification'

  export default {
    name: 'Notification',
    props: ['notification'],
    components: {
      PetNotification,
      EventNotification
    },
    computed: {
      checkDate () {
        return moment(this.notification.checkDate).format('MM-DD-YYYY')
      }
    }
  }
</script>
