angular.module('Events')
	.controller('EventDetailCtrl', ['$scope', '$routeParams', '$http', '$location',
		function ($scope, $routeParams, $http, $location) {
			$scope.event = {};
			$scope.tweetDetails = {
				url: $location.absUrl(),
			};
			console.log($.param($scope.tweetDetails))
			$scope.facebookUrl = 'https://www.facebook.com/login.php?skip_api_login=1&api_key=1467820943460899&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fv2.2%2Fdialog%2Fshare%3Fhref%3Dhttps%253A%252F%252Fwww.producthunt.com%252Fposts%252Fnoun-project-for-mac-2-0%26quote%26client_id%3D1467820943460899%26ret%3Dlogin&cancel_url=https%3A%2F%2Fwww.facebook.com%2Fdialog%2Freturn%2Fclose%3Ferror_code%3D4201%26error_message%3DUser%2Bcanceled%2Bthe%2BDialog%2Bflow%23_%3D_&display=popup&locale=en_US';

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
