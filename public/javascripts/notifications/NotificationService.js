angular.module('Notifications')
.factory('NotificationService', ['$http', '$rootScope',
  function ($http, $rootScope) {
    var api = {};

    api.getNotifications = function () {
      var url = '/api/v1/notifications';

      return $http({
        method: 'GET',
        url: url,
      })
      .then(function (response) {
        let notifications = response.data.data;
        //$rootScope.$broadcast('notifications', notifications); // @TODO: use notification bus. See Angular 
        return notifications;
      })
    };

    api.subscribe = function (linkId) {
      var url = '/api/v1/notifications';

      return $http({
        method: 'POST',
        url: url,
        data: {
          shelterId: linkId,
        },
      })
      .then(function (response) {
        let notifications = response.data.data;
        //$rootScope.$broadcast('notifications', notifications); // @TODO: use notification bus. See Angular 
        return notifications;
      })
    };


    return api;
  }]);