angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 1000);
angular.module('Kibbl', ['ngRoute', 'ngStorage', 'ui.bootstrap', 'socialLogin', 'sticky',
  'angulartics',
  'angulartics.google.analytics', 'infinite-scroll',
  'Volunteer', 'Events', 'Pets', 'Shelters', 'Messages', 'Notifications', 'Comments', 'Feedback'])
.constant('urls', {
  BASE: '/',
  BASE_API: '/api/v1/'
})
.config(['$routeProvider', '$locationProvider', '$httpProvider', 'socialProvider',
  function($routeProvider, $locationProvider, $httpProvider, socialProvider) {
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

    // socialProvider.setGoogleKey("YOUR GOOGLE CLIENT ID");
    // socialProvider.setLinkedInKey("YOUR LINKEDIN CLIENT ID");
    socialProvider.setFbKey({appId: "1773720656197985", apiVersion: "v2.8"});

    // use the HTML5 History API
    $locationProvider.hashPrefix('!');
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
          if ((response.status === 401 || response.status === 403) && response.data.message === 'No token provided.') {
            $location.path('/login');
          }
          return $q.reject(response);
        }
      };
    }]);
  }]);
