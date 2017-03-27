angular.module('Pets')
.controller('PetDetailCtrl', ['$scope', '$http', '$routeParams', '$location', 'MessageService',
  function($scope, $http, $routeParams, $location, MessageService) {
    $scope.pet = {};

    // Social stuffs @TODO: Make a directive
    $scope.tweetDetails = {
      url: $location.absUrl(),
      text: 'Check out this amazing event on Kibbl: ',
    };
    $scope.twitterUrl = 'https://twitter.com/intent/tweet?' + $.param($scope.tweetDetails)

    $scope.faceBookDetails = {
      api_key: 1773720656197985,
      href: $location.absUrl(),
    };
    $scope.facebookUrl = 'https://www.facebook.com/login.php?' + $.param($scope.faceBookDetails);

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

    $scope.sendContact = function () {
      let data = angular.copy($scope.contactDetails);
      data.to = 'keithrholliday@gmail.com';
      data.type = 'pet';
      data.itemId = $scope.pet._id;

      MessageService.sendMessage(data);
    };
  }]);
