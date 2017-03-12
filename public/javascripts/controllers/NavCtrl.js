angular.module('Kibbl')
.controller('NavCtrl', ['$scope', '$location', 'Auth',
  function ($scope, $location, Auth) {
    $scope.isActive = function (url) {
      // @TODO: how to not call this so many times
      return $location.path() === '/' + url;
    };
    
    $scope.isLoggedIn = function () {
      let user = Auth.getTokenClaims()
      return !!user.email;
    }

    $scope.logout = function () {
      Auth.logout()
        .then(function () {
          window.location = '/';
        });
    };
  }]);