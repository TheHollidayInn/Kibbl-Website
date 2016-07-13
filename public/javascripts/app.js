angular.module('PetApp', ['ngRoute', 'ui.materialize'])

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
      .when('/favorites', {
        templateUrl: 'favorite-list.html',
        controller: 'FavoriteListCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
