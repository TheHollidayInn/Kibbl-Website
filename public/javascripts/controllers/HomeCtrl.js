angular.module('Kibbl')
.controller('HomeCtrl', ['$scope', '$localStorage', 'Auth', '$http',
	function ($scope, $localStorage, Auth, $http) {
		amplitude.getInstance().logEvent('VISIT_HOME');
		
		$scope.events = [];
		$scope.pets = [];
		$scope.opportunities = [];
		$scope.shelters = [];

		$scope.token = $localStorage.token;
		$scope.tokenClaims = Auth.getTokenClaims();

		$http.get('/api/v1/latest', {})
			.then(function (response) {
				var latest = response.data.data;
				$scope.events = latest.events;
				$scope.pets = latest.pets;
				$scope.opportunities = latest.volunteerOpportunity;
				$scope.shelters = latest.shelters;
			});

		function successAuth(res) {
			$localStorage.token = res.data.token;
			window.location = "/";
		}
		
		$scope.login = function () {
			var formData = {
				email: $scope.email,
				password: $scope.password,
			};

			Auth.login(formData)
				.then(successAuth)
				.catch(function (error) {
					alert(error.data.message);
				})
		};

		$scope.register = function () {
			var formData = {
				email: $scope.email,
				password: $scope.password,
			};

			Auth.register(formData)
				.then(successAuth)
				.catch(function (error) {
					alert(error.data.message);
				})
		};
	}]);