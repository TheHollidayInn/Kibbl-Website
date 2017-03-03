angular.module('Kibbl')
.controller('FavoriteListCtrl', ['$scope', '$http',
  function($scope, $http) {
    $scope.favorites = [];

    sendRequest();
    function sendRequest() {
      var url = '/favorites';

      $http({
        method: 'GET',
        url: url,
      })
      .then(function (response) {
        $scope.favorites = response.data;
      })
    }
  }]);
