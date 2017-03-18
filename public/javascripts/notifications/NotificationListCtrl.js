angular.module('Notifications')
	.controller('NotificationListCtrl', ['$scope', 'NotificationService', 
		function ($scope, NotificationService) {
			$scope.notifications = [];

			NotificationService.getNotifications()
				.then(function (notifications) {
					$scope.notifications = notifications;
				});
		}]);