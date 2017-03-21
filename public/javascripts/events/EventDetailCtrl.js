angular.module('Events')
	.controller('EventDetailCtrl', ['$scope', '$routeParams', '$http', '$location',
		function ($scope, $routeParams, $http, $location) {
			$scope.event = {};
			$scope.url = $location.absUrl();
			$scope.tweetDetails = {
				url: $location.absUrl(),
			};
			console.log($.param($scope.tweetDetails))
			$scope.faceBookDetails = {
				skip_api_login: 1,
				api_key: 1467820943460899,
				signed_next: 1,
				next: 'https%3A%2F%2Fwww.facebook.com%2Fv2.2%2Fdialog%2Fshare%3Fhref%3Dhttps%253A%252F%252Fwww.producthunt.com%252Fposts%252Fnoun-project-for-mac-2-0%26quote%26client_id%3D1467820943460899%26ret%3Dlogin&',
			};
			$scope.facebookUrl = 'https://www.facebook.com/login.php?' + $.param($scope.faceBookDetails);

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

			$scope.favorite = function () {
	      $scope.event.favorited = !$scope.event.favorited;

	      var url = '/api/v1/favorites';
	      $http({
	        method: 'POST',
	        url: url,
					data: {
						type: 'event',
						itemId: $scope.event._id,
					},
	      })
	      .then(function (response) {
	        // $scope.pet = response.data.data;
	      });
	    };

			$scope.sendContact = function () {
				let data = angular.copy($scope.contactDetails);
				data.to = 'keithrholliday@gmail.com';

				var url = '/api/v1/contacts/';
				$http({
					method: 'POST',
					url: url,
					data: data,
				})
				.then(function (response) {
					console.log(response)
				})
			};
		}]);
