angular.module('Messages', ['ngRoute'])

.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/messages', {
        templateUrl: 'message-list.html',
        controller: 'MessageListCtrl'
      })
      .when('/messages/:id', {
        templateUrl: 'message-detail.html',
        controller: 'MessageDetailCtrl'
      });
  }]);