angular.module('PetApp', ['ngRoute'])

.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
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

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  }]);
