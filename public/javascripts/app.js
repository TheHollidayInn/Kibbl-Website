angular.module('Kibbl', ['ngRoute', 'Volunteer', 'Events', 'Pets'])

.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
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
