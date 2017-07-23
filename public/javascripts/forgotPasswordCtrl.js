angular.module('Kibbl')
	.controller('ForgotPasswordCtrl', ['$scope', '$routeParams', '$http',
		function ($scope, $routeParams, $http) {
			$scope.email = '';

			$scope.send = function (text) {

				var url = '/api/v1/forgot-password';
				var data = {};
				data.email = $scope.email;

				$http({
					method: 'POST',
					url: url,
					data: data,
				})
				.then(function (response) {
					alert("An email has been sent with instruction on how to change your password");
				})
				.catch(function (response) {
					alert(response.data.message);
				})
			};
		}]);
