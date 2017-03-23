angular.module('Feedback', ['ngRoute'])

.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/feedback', {
        templateUrl: 'feedback-list.html',
        controller: 'FeedbackListCtrl'
      })
      .when('/feedback/:id', {
        templateUrl: 'event-detail.html',
        controller: 'FeedbackDetailCtrl'
      });
  }]);
