angular.module('Shelters')
	.controller('ShelterListCtrl', ['$scope', 'ShelterService',
		function ($scope, ShelterService) {
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

			ShelterService.get()
				.then(function (opportunites) {
					$scope.events = opportunites;
				});
		}]);