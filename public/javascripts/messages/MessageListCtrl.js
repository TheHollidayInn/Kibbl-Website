angular.module('Messages')
	.controller('MessageListCtrl', ['$scope', 'MessageService', 
		function ($scope, MessageService) {
			$scope.messages = [];

			MessageService.getMessages()
				.then(function (messages) {
					$scope.messages = messages.data;
				});
		}]);