angular.module('Messages')
	.controller('MessageDetailCtrl', ['$scope', 
		function ($scope) {
			$scope.message = {
        name: 'TEsting',
      };
		}]);