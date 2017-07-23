angular.module('Kibbl')
	.controller('ResetCtrl', ['$scope', '$routeParams', '$http',
		function ($scope, $routeParams, $http) {
			$scope.password = '';
			$scope.passwordConfirm = '';

			$scope.send = function () {
				if ($scope.password !== $scope.passwordConfirm) {
					alert("Passwords don't match");
					return;
				}
				var url = '/api/v1/reset';
				var data = {};
				data.token = $routeParams.token;
				data.password = $scope.password;

				$http({
					method: 'POST',
					url: url,
					data: data,
				})
				.then(function (response) {
					window.location.href = '/login';
					alert(response.data.message);
				})
				.catch(function (response) {
					alert(response.data.message);
				})
			};
		}]);
