angular.module('Pets')
.controller('PetDetailCtrl', ['$scope', '$http', '$routeParams',
  function($scope, $http, $routeParams) {

    $scope.pet = {};

    sendRequest();
    function sendRequest() {
      var url = '/api/v1/pets/' + $routeParams.petId;

      $http({
        method: 'GET',
        url: url,
      })
      .then(function (response) {
        $scope.pet = response.data.data;
      });
    }

    $scope.favorite = function () {
      $scope.pet.favorited = !$scope.pet.favorited;

      var url = '/api/v1/pets/' + $routeParams.petId + '/favorite';
      $http({
        method: 'POST',
        url: url,
      })
      .then(function (response) {
        // $scope.pet = response.data.data;
      });
    };

  }]);
