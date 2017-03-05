angular.module('Kibbl', ['ngRoute', 'Volunteer', 'Events', 'Pets', 'Shelters'])

.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/favorites', {
        templateUrl: 'favorite-list.html',
        controller: 'FavoriteListCtrl'
      })
      .otherwise({
        redirectTo: '/volunteer'
      });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  }]);
