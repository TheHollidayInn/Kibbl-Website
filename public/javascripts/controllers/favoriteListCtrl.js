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
        $scope.favorites = response.data.data;
      })
      .catch(function (err) {
        console.log(err);
        // @TODO: Login check
      })
    }

    $scope.unfavorite = function (id, $index) {
      if (!confirm('Are you sure you want to unfavorite?'));

      $scope.favorites.splice($index, 1);

      var url = '/api/v1/pets/' + id + '/favorite';
      $http({
        method: 'POST',
        url: url,
      })
      .then(function (response) {
        // $scope.pet = response.data.data;
      });
    };
  }]);
