angular.module('Volunteer')
.controller('VolunteerDetailCtrl', ['$scope', '$routeParams', '$http',
		function ($scope, $routeParams, $http) {
		$scope.volunteer = {};

		sendRequest();
		function sendRequest() {
			var url = '/api/v1/volunteer/' + $routeParams.id;

			$http({
				method: 'GET',
				url: url,
			})
			.then(function (response) {
				$scope.volunteer = response.data.data;
			})
		}
	}]);