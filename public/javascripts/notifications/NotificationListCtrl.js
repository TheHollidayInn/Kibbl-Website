angular.module('Notifications')
	.controller('NotificationListCtrl', ['$scope', 'NotificationService', 
		function ($scope, NotificationService) {
			$scope.notifications = [
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

			NotificationService.getNotifications()
				.then(function (notifications) {
					$scope.notifications = notifications;
				});
		}]);