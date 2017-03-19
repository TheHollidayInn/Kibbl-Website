angular.module('Kibbl', ['ngRoute', 'ngStorage', 'ui.bootstrap',
  'Volunteer', 'Events', 'Pets', 'Shelters', 'Messages', 'Notifications'])
.constant('urls', {
  BASE: '/',
  BASE_API: '/api/v1/'
})
.config(['$routeProvider', '$locationProvider', '$httpProvider',
  function($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when('/favorites', {
        templateUrl: 'favorite-list.html',
        controller: 'FavoriteListCtrl'
      })
      .when('/', {
        templateUrl: 'home.html',
        controller: 'HomeCtrl'
      })
      .when('/login', {
        templateUrl: 'login.html',
        controller: 'HomeCtrl'
      })
      .when('/register', {
          templateUrl: 'register.html',
          controller: 'HomeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
      return {
        'request': function (config) {
          config.headers = config.headers || {};
          if ($localStorage.token) {
            config.headers.Authorization = 'Bearer ' + $localStorage.token;
            config.headers['x-access-token'] = $localStorage.token;
          }
          return config;
        },
        'responseError': function (response) {
          // @TODO: Should not redirect after failed login/register
          if (response.status === 401 || response.status === 403) {
            $location.path('/login');
          }
          return $q.reject(response);
        }
      };
    }]);
  }]);
