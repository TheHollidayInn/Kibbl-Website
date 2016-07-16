angular.module('PetApp')
.controller('PetsCtrl', ['$scope', '$http',
  function($scope, $http) {

    //@TOOD: Move to directive
    // $('select').material_select();

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
        $scope.pets = response.data;
        setTimeout(function(){ $('.modal-trigger').leanModal(); }, 1000);
      })
    }

    $scope.$watch('filters', function (oldValue, newValue) {
      if(oldValue == newValue) return;
      sendRequest();
    }, true)

    $scope.selectedPet = {};
    $scope.selectPet = function (pet) {
      $scope.selectedPet = pet;
    }

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
    }

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
    }
  }]);
