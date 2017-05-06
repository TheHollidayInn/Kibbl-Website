angular.module('Notifications', ['ngRoute'])

.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/notifications', {
        templateUrl: 'notification-list.html',
        controller: 'NotificationListCtrl'
      })
      .when('/notifications-updates', {
        templateUrl: 'notification-updates.html',
        controller: 'NotificationUpdatesCtrl'
      });
  }]);
