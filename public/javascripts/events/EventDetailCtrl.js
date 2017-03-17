angular.module('Events')
	.controller('EventDetailCtrl', ['$scope', '$routeParams', '$http',
		function ($scope, $routeParams, $http) {
			$scope.event = {};

			sendRequest();
			function sendRequest() {
				var url = '/api/v1/events/' + $routeParams.id;

				$http({
					method: 'GET',
					url: url,
				})
				.then(function (response) {
					$scope.event = response.data.data;
				})
			}
		}]);