angular.module('Messages')
	.controller('MessageDetailCtrl', ['$scope', '$routeParams', '$http',
		function ($scope, $routeParams, $http) {
			$scope.messages = [];

			$scope.convoEmail = $routeParams.id;

			sendRequest();
			function sendRequest() {
				var url = '/api/v1/contacts/conversations/' + $routeParams.id;

				$http({
					method: 'GET',
					url: url,
				})
				.then(function (response) {
					$scope.messages = response.data.data;
				})
			}

			$scope.sendMessage = function (text) {
				$scope.text = '';
				var url = '/api/v1/contacts/';
				var data = {};
				data.email = $routeParams.id;
				data.originalContactId = $scope.messages[0].originalContactId;
				data.inReplyTo = $scope.messages[0].messageId;
				data.message = text;

				$http({
					method: 'POST',
					url: url,
					data: data,
				})
				.then(function (response) {
					$scope.messages.push(response.data.data);
				})
			};
		}]);
