angular.module('Volunteer', ['ngRoute'])

.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/volunteer', {
        templateUrl: 'volunteer-list.html',
        controller: 'VolunteerCtrl'
      })
      .when('/volunteer/:id', {
        templateUrl: 'volunteer-detail.html',
        controller: 'VolunteerDetailCtrl'
      });
  }]);