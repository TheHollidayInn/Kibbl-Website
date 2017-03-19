angular.module('Messages')
	.controller('MessageDetailCtrl', ['$scope', 
		function ($scope) {
			$scope.message = {
        name: 'TEsting',
      };

			// sendRequest();
			// function sendRequest() {
			// 	var url = '/api/v1/events/' + $routeParams.id;

			// 	$http({
			// 		method: 'GET',
			// 		url: url,
			// 	})
			// 	.then(function (response) {
			// 		$scope.event = response.data.data;
			// 	})
			// }
		}]);