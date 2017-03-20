angular.module('Events')
.controller('EventListCtrl', ['$scope', 'EventService', 
	function ($scope, EventService) {
		$scope.events = [];
		$scope.eventTypes = [
			{
				id: 1,
				name: 'type1',
			},
			{
				id: 2,
				name: 'type2',
			},
		];
		$scope.filters = {};

		$scope.getEvents = function () {
			EventService.getEvents($scope.filters)
			.then(function (response) {
				$scope.events = response.data;
			});
		}
		$scope.getEvents();

		$scope.dateOptions = {
			// dateDisabled: disabled,
			formatYear: 'yy',
			maxDate: new Date(2020, 5, 22),
			minDate: new Date(),
			startingDay: 1
		};

		$scope.open1 = function() {
			$scope.popup1.opened = true;
		};

		$scope.open2 = function() {
			$scope.popup2.opened = true;
		};

		$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		$scope.format = $scope.formats[0];

		$scope.popup1 = {
			opened: false
		};

		$scope.popup2 = {
			opened: false
		};
			
	}]);