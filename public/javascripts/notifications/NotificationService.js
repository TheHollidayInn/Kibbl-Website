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

    api.subscribe = function (linkId, item) {
      var url = '/api/v1/notifications';

      return $http({
        method: 'POST',
        url: url,
        data: {
          shelterId: linkId,
        },
      })
      .then(function (response) {
        var notifications = response.data.data;
        //$rootScope.$broadcast('notifications', notifications); // @TODO: use notification bus. See Angular
        return notifications;
      })
      .catch(function (response) {
        var message = response.data.message
        item.subscribed = !item.subscribed;
        alert(message);
      });
    };


    return api;
  }]);
