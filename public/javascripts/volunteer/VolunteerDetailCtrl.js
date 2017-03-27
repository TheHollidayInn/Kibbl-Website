angular.module('Volunteer')
.controller('VolunteerDetailCtrl', ['$scope', '$routeParams', '$http', '$location', 'MessageService',
		function ($scope, $routeParams, $http, $location, MessageService) {
		$scope.volunteer = {};

		// Social stuffs @TODO: Make a directive
		$scope.tweetDetails = {
			url: $location.absUrl(),
			text: 'Check out this amazing event on Kibbl: ',
		};
		$scope.twitterUrl = 'https://twitter.com/intent/tweet?' + $.param($scope.tweetDetails)

		$scope.faceBookDetails = {
			api_key: 1773720656197985,
			href: $location.absUrl(),
		};
		$scope.facebookUrl = 'https://www.facebook.com/login.php?' + $.param($scope.faceBookDetails);

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

		$scope.sendContact = function () {
			let data = angular.copy($scope.contactDetails);
			data.to = 'keithrholliday@gmail.com';
			data.type = 'volunteer';
			data.itemId = $scope.volunteer._id;

			MessageService.sendMessage(data);
		};
	}]);
