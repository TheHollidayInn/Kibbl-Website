angular.module('Shelters')
.factory('ShelterService', ['$http', '$rootScope',
  function ($http, $rootScope) {
    var api = {};

    api.get = function () {
      var url = '/api/v1/shelters';

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

    api.getShelter = function (id) {
      var url = '/api/v1/shelters/' + id;

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