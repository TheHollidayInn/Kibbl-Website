angular.module('Notifications')
	.controller('NotificationListCtrl', ['$scope', 'NotificationService', 
		function ($scope, NotificationService) {
			$scope.notifications = [];

			NotificationService.getNotifications()
				.then(function (notifications) {
					$scope.notifications = notifications;
				});

			$scope.unsubscribe = function (linkId, $index) {
				if (!confirm('Are you sure you want to unsubscribe?'));

      	$scope.notifications.splice($index, 1);

				NotificationService.subscribe(linkId);
			}
		}]);