angular.module('Shelters')
	.controller('ShelterDetailCtrl', ['$scope', '$routeParams', '$http', '$uibModal',
		function ($scope, $routeParams, $http, $uibModal) {
			$scope.shelter = {};
			$scope.contactDetails = {};

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