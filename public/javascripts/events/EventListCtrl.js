angular.module('Events')
	.controller('EventListCtrl', ['$scope', 'EventService', 
		function ($scope, EventService) {
			$scope.events = [
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

			EventService.getEvents()
				.then(function (events) {
					$scope.events = events;
				});
		}]);