angular.module('Volunteer')
.factory('VolunteerService', ['$http', '$rootScope', '$httpParamSerializer',
  function ($http, $rootScope, $httpParamSerializer) {
    var api = {};

    api.get = function (data) {
      var url = '/api/v1/volunteer?' + $httpParamSerializer(data);

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

    api.getVolunteer = function (id) {
      var url = '/api/v1/volunteer/' + id;

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
