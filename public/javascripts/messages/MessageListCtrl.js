angular.module('Messages')
	.controller('MessageListCtrl', ['$scope', 'MessageService', 
		function ($scope, MessageService) {
			$scope.messages = [
				{
					name: 'Test 1',
				},
				{
					name: 'Test 2',
				},
				{
					name: 'Test 3',
				},
			];

			MessageService.getMessages()
				.then(function (messages) {
					$scope.messages = messages;
				});
		}]);