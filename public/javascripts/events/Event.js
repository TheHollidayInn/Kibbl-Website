angular.module('Events', ['ngRoute'])

.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/events', {
        templateUrl: 'event-list.html',
        controller: 'EventListCtrl'
      })
      .when('/events/:id', {
        templateUrl: 'event-detail.html',
        controller: 'EventDetailCtrl'
      })
      .when('/events/shelter/:shelterId', {
        templateUrl: 'event-list.html',
        controller: 'EventListCtrl'
      });
  }]);
