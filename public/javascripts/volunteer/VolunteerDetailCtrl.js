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

		$scope.favorite = function () {
			$scope.volunteer.favorited = !$scope.volunteer.favorited;

			var url = '/api/v1/favorites';
			$http({
				method: 'POST',
				url: url,
				data: {
					type: 'volunteer',
					itemId: $scope.volunteer._id,
				},
			})
			.then(function (response) {
				// $scope.pet = response.data.data;
			});
		};
	}]);
