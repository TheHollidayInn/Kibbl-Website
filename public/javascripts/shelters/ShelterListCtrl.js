angular.module('Shelters')
	.controller('ShelterListCtrl', ['$scope', 
		function ($scope) {
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