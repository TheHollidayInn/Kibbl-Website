angular.module('Volunteer')
.factory('VolunteerService', ['$http', '$rootScope',
  function ($http, $rootScope) {
    var api = {};

    api.get = function () {
      var url = '/api/v1/volunteer';

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