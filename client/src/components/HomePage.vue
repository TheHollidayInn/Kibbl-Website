<template lang="pug">
div
  .container-fluid.banner
    .container
      img.banner-logo(src="../assets/kibbl-logo.svg", alt="Kibbl Logo")
      h2.text-center(style='color:#fff;') Helping animals made easy
  .container-fluid.how-section
    .container
      .row.how-title
        .col-12.h2.text-center How to Kibbl
      .row
        .col-md-4
          .text-center
            span.how-icon
          .h3.text-center Find What You Want
          p.text-center Find events, pets and shelters
        .col-md-4
          .text-center
            span.how-icon.how-2
          .h3.text-center Get Notified
          p.text-center Subscribe to shelters to get notified about activity
        .col-md-4
          .text-center
            span.how-icon.how-3
          .h3.text-center Communicate
          //- p.text-center Send messages to talk with shelters
          p.text-center Chat with a community of animal lovers
  .container-fluid.new-section(style="background:#fff;")
    div.row
      h2.col-12.text-center Latest Events
      .col-12.text-center
        a.btn.btn-flat.btn-primary(href='/events') View More
      .col-md-12.text-center
        .loader(v-if='loading') Loading...
      .col-12.col-md-4.grid-item(v-for="event in events")
        event-list-item(:event='event')
    div.row
      h2.col-12.text-center Latest Pets
      .col-md-12.text-center
        a.btn.btn-flat.btn-primary(href='/pets') View More
      .col-md-12.text-center
        .loader(v-if='loading') Loading...
      .col-12.col-md-4.grid-item(v-for="pet in pets")
        pet-list-item(:pet='pet')
    div.row
      h2.col-12.text-center Latest Shelters
      .col-md-12.text-center
        a.btn.btn-flat.btn-primary(href='/shelters') View More
      .col-md-12.text-center
        .loader(v-if='loading') Loading...
      .col-12.col-md-4.grid-item(v-for="shelter in shelters")
        shelter-list-item(:shelter='shelter')
</template>

<script>
import EventListItem from './Events/EventListItem'
import PetListItem from './Pets/PetListItem'
import ShelterListItem from './Shelters/ShelterListItem'

export default {
  name: 'HomePage',
  components: {
    EventListItem,
    PetListItem,
    ShelterListItem
  },
  data () {
    return {
      loading: false,
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
      shelters: [
        {
          __v: 0,
          description: 'Foothills Animal Shelter is an open-admissions facility, which means we never turn away an animal. We care for more than 9,500 orphaned cats, kittens, dogs, puppies and critters every year with a compassionate team of staff and volunteers. (Unfortunately, we can not accept wild animals; they should be taken to organizations who specialize in their care.) We are a true community resource and offer a variety of services including pet adoption, Jefferson County pet licensing, affordable spaying and neutering, vaccinations, microchipping and lost and found pets. We are committed to our important mission and the life-saving work that we do every day of the year. - See more at: http://foothillsanimalshelter.org/about/about-foothills-animal-shelter/#sthash.A5jTVepq.dpuf',
          name: 'Foothills Animal Shelter',
          _id: '59f32cd04b8bfc226327da06',
          createdAt: '2017-10-27T12:55:44.493Z',
          locationCoords: { coordinates: [ 0, 0 ], type: 'Point' }
        }
      ],
      events: [
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
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .grid-item {
    height:200px;
    overflow:hidden;
    border-radius: 5px;
  }

  .new-section h2 {
    margin-top: .5rem;
    margin-bottom: .5rem;
  }

  .how-section {
    background: #fff;
    padding: 3rem;
  }

  .how-title {
    margin: 2rem;
    margin-bottom: 6rem;
  }

  .how-icon {
    background: url('../assets/search-icon.png');
    height: 100px;
    width: 100px;
    background-size: 80%;
    background-repeat: no-repeat;
    display: inline-block;
  }

  .how-icon.how-2 {
    background: url('../assets/bell-icon.png');
    background-size: 80%;
    background-repeat: no-repeat;
  }

  .how-icon.how-3 {
    background: url('../assets/message-icon.png');
    background-size: 80%;
    background-repeat: no-repeat;
  }
</style>
