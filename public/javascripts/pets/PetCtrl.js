angular.module('Pets')
.controller('PetListCtrl', ['$scope', '$http', '$window',
  function($scope, $http, $window) {
    $.material.init()

    $scope.pets = [];
    $scope.filters = {};
    $scope.isFavoriting = false;
    $scope.loginDetails = {};
    $scope.type = '';

    $scope.petTypes = [
      {
        value: '',
        key: "All"
      },
      {
        value: 'Dog',
        key: "Dog"
      },
      {
        value: 'Cat',
        key: "Cat"
      },
      {
        value: 'Bird',
        key: "Bird"
      },
    ];
    $scope.petAges = [
      {
        value: '',
        key: "All"
      },
      {
        value: 'Baby',
        key: "Baby"
      },
      {
        value: 'Young',
        key: "Young"
      },
      {
        value: 'Adult',
        key: "Adult"
      },
      {
        value: 'Senior',
        key: "Senior"
      },
    ];

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

    $scope.sendRequest = function () {
      var url = '/api/v1/pets';

      $scope.filters.offset = $scope.offset;

      if ($scope.filters) {
        url += '?' + $.param($scope.filters);
      }

      $http({
        method: 'GET',
        url: url,
      })
      .then(function (response) {
        $scope.pets = $scope.pets.concat(response.data.pets);
      })
    };
    $scope.sendRequest();

    $scope.scroll = function () {
      if (!$scope.pets[$scope.pets.length - 1]) return;
			$scope.filters.createdAtBefore = $scope.pets[$scope.pets.length -1].createdAt;
			$scope.sendRequest();
		}

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
        url: '/api/v1//contacts',
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
        url: '/api/v1//login-angular',
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
