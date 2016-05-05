angular.module('PetApp', ['ngRoute'])

.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'pet-list.html',
        controller: 'PetsCtrl'
      })
      .when('/pets/:petId', {
        templateUrl: 'pet-detail.html',
        controller: 'PetsDetailCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
