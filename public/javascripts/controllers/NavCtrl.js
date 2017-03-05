angular.module('Kibbl')
	.controller('NavCtrl', ['$scope', '$location',
		function ($scope, $location) {
      $scope.isActive = function (url) {
        // @TODO: how to not call this so many times
        return $location.path() === '/' + url;
      }
		}]);