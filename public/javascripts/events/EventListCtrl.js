angular.module('Events')
	.controller('EventListCtrl', ['$scope', 'EventService', 
		function ($scope, EventService) {
			$scope.events = [];

			EventService.getEvents()
				.then(function (response) {
					$scope.events = response.data;
				});
		}]);