angular.module('Kibbl')
.controller('FavoriteListCtrl', ['$scope', '$http',
  function($scope, $http) {
    $scope.favorites = [];

    sendRequest();
    function sendRequest() {
      var url = '/api/v1/favorites';

      $http({
        method: 'GET',
        url: url,
      })
      .then(function (response) {
        $scope.favorites = response.data;
      })
      .catch(function (err) {
        console.log(err);
        // @TODO: Login check
      })
    }
  }]);
