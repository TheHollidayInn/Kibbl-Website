angular.module('Shelters')
	.controller('ShelterListCtrl', ['$scope', 'ShelterService',
		function ($scope, ShelterService) {
			$scope.shelters = [
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
				.then(function (response) {
					$scope.shelters = response.data;
				});
		}]);