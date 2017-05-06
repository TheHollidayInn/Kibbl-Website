angular.module('Notifications')
	.controller('NotificationUpdatesCtrl', ['$scope', 'NotificationService',
		function ($scope, NotificationService) {
			$scope.notifications = [];

			NotificationService.getUpdates()
				.then(function (notifications) {
					$scope.notifications = notifications;
				});
		}]);
