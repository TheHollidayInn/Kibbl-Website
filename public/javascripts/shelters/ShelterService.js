angular.module('Shelters')
.factory('ShelterService', ['$http', '$rootScope',
  function ($http, $rootScope) {
    var api = {};

    api.get = function () {
      var url = '/api/v1/pets';

      return $http({
        method: 'GET',
        url: url,
      })
      .then(function (response) {
        let events = response.data.pets;
        //$rootScope.$broadcast('events', events); // @TODO: use event bus. See Angular 
        return events;
      })
    };

    return api;
  }]);