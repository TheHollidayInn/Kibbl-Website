angular.module('Notifications')
.factory('NotificationService', ['$http', '$rootScope',
  function ($http, $rootScope) {
    var api = {};

    api.getNotifications = function () {
      var url = '/api/v1/pets';

      return $http({
        method: 'GET',
        url: url,
      })
      .then(function (response) {
        let notifications = response.data.pets;
        //$rootScope.$broadcast('notifications', notifications); // @TODO: use notification bus. See Angular 
        return notifications;
      })
    };

    return api;
  }]);