angular.module('Kibbl')
.factory('FiltersService', ['$localStorage',
  function ($localStorage) {
    var api = {};

    api.events = [];
    api.eventScrollPosition = 0;

    api.filters = {
      'pets': {},
      'events': {},
      'shelters': {},
    };

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

    return api;
  }]);
