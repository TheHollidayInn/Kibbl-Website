angular.module('Kibbl', ['ngRoute', 
  'Volunteer', 'Events', 'Pets', 'Shelters', 'Messages', 'Notifications'])

.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/favorites', {
        templateUrl: 'favorite-list.html',
        controller: 'FavoriteListCtrl'
      })
      .when('/', {
        templateUrl: 'home.html',
        controller: 'HomeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  }]);
