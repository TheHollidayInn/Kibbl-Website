angular.module('Kibbl')
	.controller('HomeCtrl', ['$scope', 
		function ($scope) {
      console.log("home")
			$scope.events = [
				{
					name: 'Test 1',
				},
				{
					name: 'Test 2',
				},
				{
					name: 'Test 3',
				},
			];
		}]);