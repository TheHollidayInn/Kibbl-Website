angular.module('Volunteer')
	.controller('VolunteerCtrl', ['$scope', 'VolunteerService',
		function ($scope, VolunteerService) {
			$scope.opportunites = [
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

			VolunteerService.get()
				.then(function (opportunites) {
					$scope.opportunites = opportunites;
				});
		}]);