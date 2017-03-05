angular.module('Shelters', ['ngRoute'])

.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/shelters', {
        templateUrl: 'shelter-list.html',
        controller: 'ShelterListCtrl'
      })
      .when('/shelters/:id', {
        templateUrl: 'shelter-detail.html',
        controller: 'ShelterDetailCtrl'
      });
  }]);