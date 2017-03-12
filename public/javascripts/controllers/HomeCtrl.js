angular.module('Kibbl')
.controller('HomeCtrl', ['$scope', '$localStorage', 'Auth',
	function ($scope, $localStorage, Auth) {
		amplitude.getInstance().logEvent('VISIT_HOME');
		
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

		$scope.pets = [
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

		$scope.opportunities = [
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

		$scope.shelters = [
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
		$scope.token = $localStorage.token;
		$scope.tokenClaims = Auth.getTokenClaims();

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