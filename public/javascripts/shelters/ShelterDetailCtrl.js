angular.module('Shelters')
	.controller('ShelterDetailCtrl', ['$scope', '$routeParams', '$http', '$uibModal', '$location', 'NotificationService', 'MessageService',
		function ($scope, $routeParams, $http, $uibModal, $location, NotificationService, MessageService) {
			$scope.shelter = {};
			$scope.contactDetails = {};

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
			$scope.url = $location.absUrl();

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

				var result = NotificationService.subscribe($routeParams.id, $scope.shelter);
			};

			$scope.sendContact = function () {
				let data = angular.copy($scope.contactDetails);
				data.to = 'keithrholliday@gmail.com';
				data.type = 'shelter';
				data.itemId = $scope.shelter._id;

				MessageService.sendMessage(data);
			};

			$scope.favorite = function () {
	      $scope.shelter.favorited = !$scope.shelter.favorited;

	      var url = '/api/v1/favorites';
	      $http({
	        method: 'POST',
	        url: url,
					data: {
						type: 'shelter',
						itemId: $scope.shelter._id,
					},
	      })
	      .then(function (response) {
	        // $scope.pet = response.data.data;
	      });
	    };

			// $scope.contact = function () {
			// 	$uibModal.open({
			// 		// animation: $ctrl.animationsEnabled,
			// 		// ariaLabelledBy: 'modal-title-top',
			// 		// ariaDescribedBy: 'modal-body-top',
			// 		templateUrl: 'contact-modal.html',
			// 		// size: 'sm',
			// 		controller: function($scope) {
			// 			$scope.name = 'top';
			// 		}
			// 	});
			// };
		}]);
