angular.module('Shelters')
	.controller('ShelterDetailCtrl', ['$scope', '$routeParams', '$http',
		function ($scope, $routeParams, $http) {
			$scope.shelter = {};

			sendRequest();
			function sendRequest() {
				var url = '/api/v1/shelters/' + $routeParams.id;

				$http({
					method: 'GET',
					url: url,
				})
				.then(function (response) {
					$scope.shelter = response.data.data;
				})
			}

			$scope.subscribe = function (unsubscribe) {
				if (unsubscribe && !confirm('Are you sure you want to unsubscribe?')) return;

				$scope.shelter.subscribed = !$scope.shelter.subscribed;

				var url = '/api/v1/notifications/';
				$http({
					method: 'POST',
					url: url,
					data: {
						shelterId: $routeParams.id,
					},
				})
				.then(function (response) {
					
				})
			};

		}]);