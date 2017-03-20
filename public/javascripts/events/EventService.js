angular.module('Events')
.factory('EventService', ['$http', '$rootScope', '$httpParamSerializer',
  function ($http, $rootScope, $httpParamSerializer) {
    var api = {};

    api.getEvents = function (data) {
      var url = '/api/v1/events?' + $httpParamSerializer(data);

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

    api.getEvent = function (id) {
      var url = '/api/v1/events/' + id;

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
