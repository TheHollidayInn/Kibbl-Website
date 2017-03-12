angular.module('Messages')
.factory('MessageService', ['$http', '$rootScope',
  function ($http, $rootScope) {
    var api = {};

    api.getMessages = function () {
      var url = '/api/v1/contacts/conversations';

      return $http({
        method: 'GET',
        url: url,
      })
      .then(function (response) {
        let messages = response.data;
        //$rootScope.$broadcast('messages', messages); // @TODO: use message bus. See Angular 
        return messages;
      })
    };

    api.getMessage = function (id) {
      var url = '/api/v1/contact/conversation' + id;

      return $http({
        method: 'GET',
        url: url,
      })
      .then(function (response) {
        let messages = response.data;
        //$rootScope.$broadcast('messages', messages); // @TODO: use message bus. See Angular 
        return messages;
      })
    };

    return api;
  }]);