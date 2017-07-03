angular.module('Events')
	.controller('EventDetailCtrl', ['$scope', '$routeParams', '$http', '$location', 'MessageService',
		function ($scope, $routeParams, $http, $location, MessageService) {
			$scope.event = {};
			$scope.url = $location.absUrl();

			// Social stuffs @TODO: Make a directive
			$scope.tweetDetails = {
				url: $location.absUrl(),
				text: 'Check out this amazing event on Kibbl: ',
			};
			$scope.twitterUrl = 'https://twitter.com/intent/tweet?' + $.param($scope.tweetDetails)

			$scope.url = $location.absUrl();

			sendRequest();
			function sendRequest() {
				var url = '/api/v1/events/' + $routeParams.id;

				$http({
					method: 'GET',
					url: url,
				})
				.then(function (response) {
					$scope.event = response.data.data;

					if (!$scope.event.facebook) $scope.$parent.pageImg = 'https://kibbl.io/images/kibbl-logo-dog.png'
					$scope.$parent.pageImg = $scope.event.facebook.cover || 'https://kibbl.io/images/kibbl-logo-dog.png';
	        $scope.$parent.pageTitle = $scope.event.name;
	        $scope.$parent.pageDesc = $scope.event.description;
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
				data.type = 'event';
				data.itemId = $scope.event._id;

				MessageService.sendMessage(data);
			};
		}]);
