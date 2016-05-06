angular.module('PetApp')
.controller('PetsCtrl', ['$scope', '$http',
  function($scope, $http) {

    $scope.pets = [
      {
        name: "test"
      },
      {
        name: "test2"
      }
    ]

    $scope.filters = {}
    $scope.type = '';

    sendRequest();
    function sendRequest() {
      var url = '/pets';

      if ($scope.filters) {
        url += '?' + $.param($scope.filters);
      }

      $http({
        method: 'GET',
        url: url,
      })
      .then(function (response) {
        console.log(response);
        $scope.pets = response.data;
      })
    }

    $scope.$watch('filters', function (oldValue, newValue) {
      if(oldValue == newValue) return;
      sendRequest();
    }, true)

  }]);
