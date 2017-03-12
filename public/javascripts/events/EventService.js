angular.module('Events')
.factory('EventService', ['$http', '$rootScope',
  function ($http, $rootScope) {
    var api = {};

    api.getEvents = function () {
      var url = '/api/v1/events';

      return $http({
        method: 'GET',
        url: url,
      })
      .then(function (response) {
        let events = response.data;
        //$rootScope.$broadcast('events', events); // @TODO: use event bus. See Angular 
        return events;
      })
    };

    return api;
  }]);