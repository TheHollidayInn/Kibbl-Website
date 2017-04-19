angular.module('Kibbl')
.factory('FiltersService', ['$localStorage',
  function ($localStorage) {
    var api = {};

    api.events = [];
    api.eventScrollPosition = 0;
    api.pets = [];
    api.petScrollPosition = 0;
    api.shelters = [];
    api.shelterScrollPosition = 0;

    api.filters = {
      'pets': {},
      'events': {},
      'shelters': {},
    };

    // Events
    api.setEventFilters = function (filters) {
      api.filters['events'] = filters;
    };

    api.getEventFilters = function () {
      return api.filters['events'];
    };

    api.setEvents = function (events) {
      api.events = events;
    };

    api.getEvents = function () {
      return api.events;
    };

    api.setEventScroll = function (scrollPosition) {
      api.eventScrollPosition = scrollPosition;
    };

    api.getEventScroll = function () {
      return api.eventScrollPosition;
    };

    // Pets
    api.setPetFilters = function (filters) {
      api.filters['pets'] = filters;
    };

    api.getPetFilters = function () {
      return api.filters['pets'];
    };

    api.setPets = function (pets) {
      api.pets = pets;
    };

    api.getPets = function () {
      return api.pets;
    };

    api.setPetScroll = function (scrollPosition) {
      api.petScrollPosition = scrollPosition;
    };

    api.getPetScroll = function () {
      return api.petScrollPosition;
    };

    //Shelters
    api.setShelterFilters = function (filters) {
      api.filters['shelters'] = filters;
    };

    api.getShelterFilters = function () {
      return api.filters['shelters'];
    };

    api.setShelters = function (shelters) {
      api.shelters = shelters;
    };

    api.getShelters = function () {
      return api.shelters;
    };

    api.setShelterScroll = function (scrollPosition) {
      api.shelterScrollPosition = scrollPosition;
    };

    api.getShelterScroll = function () {
      return api.shelterScrollPosition;
    };

    return api;
  }]);
