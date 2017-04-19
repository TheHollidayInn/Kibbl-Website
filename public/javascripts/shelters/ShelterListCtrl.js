angular.module('Shelters')
	.controller('ShelterListCtrl', ['$scope', 'ShelterService', 'FiltersService', '$window',
		function ($scope, ShelterService, FiltersService, $window) {
			$scope.shelters = [];
			$scope.loading = true;
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
			$scope.filters = FiltersService.getShelterFilters();
			$scope.shelters = FiltersService.getShelters();
			var initialScrolled = false;

			function getPostCode(place) {
				for (var i = 0; i < place.address_components.length; i++) {
		      for (var j = 0; j < place.address_components[i].types.length; j++) {
		        if (place.address_components[i].types[j] == "postal_code") {
		          return place.address_components[i].long_name;
		        }
		      }
		    }
			}

			$scope.getEvents = function () {
				if ($scope.filters.autocomplete) {
					$scope.filters.zipCode = getPostCode($scope.filters.autocomplete);
				}

				if ($scope.filters.type) $scope.filters.type = $scope.filters.type.name;

				var filters = angular.copy($scope.filters);
				delete filters.autocomplete;

				ShelterService.get(filters)
					.then(function (response) {
						$scope.shelters = $scope.shelters.concat(response.data);
						$scope.loading = false;

						FiltersService.setShelters($scope.shelters);

						var scrollPosition = FiltersService.getShelterScroll();
						if (scrollPosition && !initialScrolled) {
							initialScrolled = true;
							$("body").animate({scrollTop: scrollPosition}, "slow");
						}
					});
			}
			if ($scope.shelters.length === 0) {
				$scope.getEvents();
				$scope.loading = false;
			}

			$scope.filter = function () {
				$scope.shelters = [];
				$scope.getEvents();
				$scope.loading = true;
				FiltersService.setShelterFilters($scope.filters);
			};

			$scope.scroll = function () {
				if (!$scope.shelters[$scope.shelters.length - 1]) return;
				$scope.filters.createdAtBefore = $scope.shelters[$scope.shelters.length - 1].createdAt;
				$scope.getEvents();
				$scope.loading = true;
				FiltersService.setShelterScroll($window.scrollY);
			}

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
