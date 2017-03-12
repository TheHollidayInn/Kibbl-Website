angular.module('Messages')
.factory('MessageService', ['$http', '$rootScope',
  function ($http, $rootScope) {
    var api = {};

    api.getMessages = function () {
      var url = '/api/v1/pets';

      return $http({
        method: 'GET',
        url: url,
      })
      .then(function (response) {
        let messages = response.data.pets;
        //$rootScope.$broadcast('messages', messages); // @TODO: use message bus. See Angular 
        return messages;
      })
    };

    return api;
  }]);