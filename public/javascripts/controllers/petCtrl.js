angular.module('PetApp')
.controller('PetsCtrl', ['$scope', '$http', '$window',
  function($scope, $http, $window) {
    $scope.pets = [
      {
        name: "test"
      },
      {
        name: "test2"
      }
    ]

    $scope.filters = {};
    $scope.isFavoriting = false;
    $scope.loginDetails = {};
    $scope.type = '';

    $scope.petTypes = ["All", "Dog", "Cat", "Bird"];
    $scope.petAges = ["All", "Baby", "Young", "Adult", "Senior"];

    $scope.petGenders = [
      {
        value: '',
        key: "All"
      },
      {
        value: 'M',
        key: "Male"
      },
      {
        value: 'F',
        key: "Female"
      },
      {
        value: 'U',
        key: "Unkown"
      },
    ];

    $scope.offset = 0;
    $scope.limit = 100;

    sendRequest();
    function sendRequest() {
      var url = '/pets';

      $scope.filters.offset = $scope.offset;

      if ($scope.filters) {
        url += '?' + $.param($scope.filters);
      }

      $http({
        method: 'GET',
        url: url,
      })
      .then(function (response) {
        $scope.pets = response.data.pets;
        // setTimeout(function(){ $('.modal-trigger').leanModal(); }, 1000);
      })
    };

    $scope.queryPage = function (page) {
      $scope.offset = page * $scope.limit;
      window.scrollTo(0, 0);
      sendRequest();
    }

    $scope.$watch('filters', function (oldValue, newValue) {
      if(oldValue == newValue) return;
      sendRequest();
    }, true);

    $scope.selectedPet = {};
    $scope.selectPet = function (pet) {
      $scope.selectedPet = pet;
    };

    $scope.contactDetails = {};
    $scope.sendContact = function () {
      $scope.contactDetails.petId = $scope.selectedPet._id;
      $http({
        method: 'POST',
        url: '/contacts',
        data: $scope.contactDetails,
      })
      .then(function (response) {
        console.log(response);
      })
    };

    $scope.favorite = function (petId, $index) {
      if ($scope.pets[$index].userFavorited) {
        $scope.pets[$index].userFavorited = false;
      } else {
        $scope.pets[$index].userFavorited = true;
      }
      console.log($scope.pets[$index].userFavorited)

      var url = '/pets/' + petId + '/favorite';

      $http({
        method: 'POST',
        url: url,
      })
      .then(function (response) {
        console.log(response);
      })
    };

    $scope.petAboutToFavorite = {
      petId: '',
      index: '',
    };
    $scope.setPetToFavorite = function (petId, $index) {
      $scope.petAboutToFavorite.petId = petId;
      $scope.petAboutToFavorite.index = $index;
    };

    $scope.login = function () {
      $http({
        method: 'POST',
        url: '/login-angular',
        data: $scope.loginDetails,
        // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      })
      .success(function (response) {
        $scope.loginDetails = {};
        console.log(response);
        $scope.favorite($scope.petAboutToFavorite.petId, $scope.petAboutToFavorite.index);
        $scope.petAboutToFavorite = {
          petId: '',
          index: '',
        };
        $window.location.href = '/';
        $('#loginModel').closeModal();
      })
    };
  }]);
