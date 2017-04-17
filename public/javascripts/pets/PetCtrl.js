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
      // {
      //   value: 'Bird',
      //   key: "Bird"
      // },
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

    function getPostCode(place) {
			for (var i = 0; i < place.address_components.length; i++) {
	      for (var j = 0; j < place.address_components[i].types.length; j++) {
	        if (place.address_components[i].types[j] == "postal_code") {
	          return place.address_components[i].long_name;
	        }
	      }
	    }
		}

    $scope.sendRequest = function () {
      var url = '/api/v1/pets';

      // if ($scope.filters.autocomplete) {
			// 	$scope.filters.zipCode = getPostCode($scope.filters.autocomplete);
			// }

      $scope.filters.offset = $scope.offset;

      var filters = angular.copy($scope.filters);
			delete filters.autocomplete;

      if (filters) {
        url += '?' + $.param(filters);
      }
      console.log(filters)
      $http({
        method: 'GET',
        url: url,
      })
      .then(function (response) {
        $scope.pets = $scope.pets.concat(response.data.pets);
      })
    };
    $scope.sendRequest();

    $scope.filter = function () {
			$scope.pets = [];
			$scope.sendRequest();
		};

    $scope.scroll = function () {
      if (!$scope.pets[$scope.pets.length - 1]) return;
      if ($scope.filters.createdAtBefore === $scope.events[$scope.events.length -1].start_time) return;
			$scope.filters.lastUpdatedBefore = $scope.pets[$scope.pets.length -1].lastUpdate;
			$scope.sendRequest();
		}

    // $scope.queryPage = function (page) {
    //   $scope.offset = page * $scope.limit;
    //   window.scrollTo(0, 0);
    //   sendRequest();
    // }

    // $scope.$watch('filters', function (oldValue, newValue) {
    //   if(oldValue == newValue) return;
    //   sendRequest();
    // }, true);

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
