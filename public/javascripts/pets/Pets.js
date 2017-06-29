angular.module('Pets', ['ngRoute'])

.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/pets', {
        templateUrl: 'pet-list.html',
        controller: 'PetListCtrl'
      })
      .when('/pets/:petId', {
        templateUrl: 'pet-detail.html',
        controller: 'PetDetailCtrl'
      });
  }]);
