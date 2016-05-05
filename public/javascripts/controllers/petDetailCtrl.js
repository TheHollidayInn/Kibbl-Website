angular.module('PetApp')
.controller('PetsDetailCtrl', ['$scope', '$http', '$routeParams',
  function($scope, $http, $routeParams) {

    $scope.pet = {};

    sendRequest();
    function sendRequest() {
      var url = '/pets/' + $routeParams.petId;;

      $http({
        method: 'GET',
        url: url,
      })
      .then(function (response) {
        console.log(response);
        $scope.pet = response.data;
      })
    }

  }]);
