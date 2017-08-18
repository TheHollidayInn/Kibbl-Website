angular.module('Pets')
.controller('PetListCtrl', ['$scope', '$http', '$window', 'FiltersService', '$sce', '$routeParams',
  function($scope, $http, $window, FiltersService, $sce, $routeParams) {
    $.material.init()
    $scope.loading = true;
    $scope.pets = [];
    $scope.filters = {};
    $scope.isFavoriting = false;
    $scope.loginDetails = {};
    $scope.type = '';
    $scope.filters = FiltersService.getPetFilters();
		$scope.pets = FiltersService.getPets();

    if ($routeParams.shelterId) {
      $scope.filters.shelterId = $routeParams.shelterId;
    } else if ($scope.filters.shelterId) {
      $scope.pets = [];
      delete $scope.filters.shelterId;
      // Reset cache
      FiltersService.setPets([]);
      FiltersService.setPetScroll(0);
    }

    $scope.breeds = {};
    $scope.breeds['Dog'] = [
      'Affenpinscher',
      'Afghan Hound',
      'Airedale Terrier',
      'Akbash',
      'Akita',
      'Alaskan Malamute',
      'American Bulldog',
      'American Eskimo Dog',
      'American Hairless Terrier',
      'American Staffordshire Terrier',
      'American Water Spaniel',
      'Anatolian Shepherd',
      'Appenzell Mountain Dog',
      'Australian Cattle Dog (Blue Heeler)',
      'Australian Kelpie',
      'Australian Shepherd',
      'Australian Terrier',
      'Basenji',
      'Basset Hound',
      'Beagle',
      'Bearded Collie',
      'Beauceron',
      'Bedlington Terrier',
      'Belgian Shepherd Dog Sheepdog',
      'Belgian Shepherd Laekenois',
      'Belgian Shepherd Malinois',
      'Belgian Shepherd Tervuren',
      'Bernese Mountain Dog',
      'Bichon Frise',
      'Black Labrador Retriever',
      'Black Mouth Cur',
      'Black Russian Terrier',
      'Black And Tan Coonhound',
      'Bloodhound',
      'Blue Lacy',
      'Bluetick Coonhound',
      'Boerboel',
      'Bolognese',
      'Border Collie',
      'Border Terrier',
      'Borzoi',
      'Boston Terrier',
      'Bouvier Des Flanders',
      'Boxer',
      'Boykin Spaniel',
      'Briard',
      'Brittany Spaniel',
      'Brussels Griffon',
      'Bull Terrier',
      'Bullmastiff',
      'Cairn Terrier',
      'Canaan Dog',
      'Cane Corso Mastiff',
      'Carolina Dog',
      'Catahoula Leopard Dog',
      'Cattle Dog',
      'Caucasian Sheepdog (Caucasian Ovtcharka)',
      'Cavalier King Charles Spaniel',
      'Chesapeake Bay Retriever',
      'Chihuahua',
      'Chinese Crested Dog',
      'Chinese Foo Dog',
      'Chinook',
      'Chocolate Labrador Retriever',
      'Chow Chow',
      "Cirneco Dell'Etna",
      'Clumber Spaniel',
      'Cockapoo',
      'Cocker Spaniel',
      'Collie',
      'Coonhound',
      'Corgi',
      'Coton De Tulear',
      'Curly-Coated Retriever',
      'Dachshund',
      'Dalmatian',
      'Dandi Dinmont Terrier',
      'Doberman Pinscher',
      'Dogo Argentino',
      'Dogue De Bordeaux',
      'Dutch Shepherd',
      'English Bulldog',
      'English Cocker Spaniel',
      'English Coonhound',
      'English Pointer',
      'English Setter',
      'English Shepherd',
      'English Springer Spaniel',
      'English Toy Spaniel',
      'Entlebucher',
      'Eskimo Dog',
      'Feist',
      'Field Spaniel',
      'Fila Brasileiro',
      'Finnish Lapphund',
      'Finnish Spitz',
      'Flat-Coated Retriever',
      'Fox Terrier',
      'Foxhound',
      'French Bulldog',
      'Galgo Spanish Greyhound',
      'German Pinscher',
      'German Shepherd Dog',
      'German Shorthaired Pointer',
      'German Spitz',
      'German Wirehaired Pointer',
      'Giant Schnauzer',
      'Glen Of Imaal Terrier',
      'Golden Retriever',
      'Gordon Setter',
      'Great Dane',
      'Great Pyrenees',
      'Greater Swiss Mountain Dog',
      'Greyhound',
      'Hamiltonstovare',
      'Harrier',
      'Havanese',
      'Hound',
      'Hovawart',
      'Husky',
      'Ibizan Hound',
      'Icelandic Sheepdog',
      'Illyrian Sheepdog',
      'Irish Setter',
      'Irish Terrier',
      'Irish Water Spaniel',
      'Irish Wolfhound',
      'Italian Greyhound',
      'Italian Spinone',
      'Jack Russell Terrier',
      'Jack Russell Terrier (Parson Russell Terrier)',
      'Japanese Chin',
      'Jindo',
      'Kai Dog',
      'Karelian Bear Dog',
      'Keeshond',
      'Kerry Blue Terrier',
      'Kishu',
      'Klee Kai',
      'Komondor',
      'Kuvasz',
      'Kyi Leo',
      'Labrador Retriever',
      'Lakeland Terrier',
      'Lancashire Heeler',
      'Leonberger',
      'Lhasa Apso',
      'Lowchen',
      'Maltese',
      'Manchester Terrier',
      'Maremma Sheepdog',
      'Mastiff',
      'McNab',
      'Miniature Pinscher',
      'Miniature Schnauzer',
      'Mixed Breed',
      'Mountain Cur',
      'Mountain Dog',
      'Munsterlander',
      'Neapolitan Mastiff',
      'New Guinea Singing Dog',
      'Newfoundland Dog',
      'Norfolk Terrier',
      'Norwegian Buhund',
      'Norwegian Elkhound',
      'Norwegian Lundehund',
      'Norwich Terrier',
      'Nova Scotia Duck-Tolling Retriever',
      'Old English Sheepdog',
      'Otterhound',
      'Papillon',
      'Patterdale Terrier (Fell Terrier)',
      'Pekingese',
      'Peruvian Inca Orchid',
      'Petit Basset Griffon Vendeen',
      'Pharaoh Hound',
      'Pit Bull Terrier',
      'Plott Hound',
      'Podengo Portugueso',
      'Pointer',
      'Polish Lowland Sheepdog',
      'Pomeranian',
      'Poodle',
      'Portuguese Water Dog',
      'Presa Canario',
      'Pug',
      'Puli',
      'Pumi',
      'Rat Terrier',
      'Redbone Coonhound',
      'Retriever',
      'Rhodesian Ridgeback',
      'Rottweiler',
      'Rough Collie',
      'Saint Bernard St. Bernard',
      'Saluki',
      'Samoyed',
      'Sarplaninac',
      'Schipperke',
      'Schnauzer',
      'Scottish Deerhound',
      'Scottish Terrier Scottie',
      'Sealyham Terrier',
      'Setter',
      'Shar Pei',
      'Sheep Dog',
      'Shepherd',
      'Shetland Sheepdog Sheltie',
      'Shiba Inu',
      'Shih Tzu',
      'Siberian Husky',
      'Silky Terrier',
      'Skye Terrier',
      'Sloughi',
      'Smooth Collie',
      'Smooth Fox Terrier',
      'South Russian Ovtcharka',
      'Spaniel',
      'Spanish Water Dog',
      'Spitz',
      'Staffordshire Bull Terrier',
      'Standard Poodle',
      'Standard Schnauzer',
      'Sussex Spaniel',
      'Swedish Vallhund',
      'Terrier',
      'Thai Ridgeback',
      'Tibetan Mastiff',
      'Tibetan Spaniel',
      'Tibetan Terrier',
      'Tosa Inu',
      'Toy Fox Terrier',
      'Treeing Walker Coonhound',
      'Vizsla',
      'Weimaraner',
      'Welsh Corgi',
      'Welsh Springer Spaniel',
      'Welsh Terrier',
      'West Highland White Terrier Westie',
      'Wheaten Terrier',
      'Whippet',
      'White German Shepherd',
      'Wire Fox Terrier',
      'Wire-Haired Pointing Griffon',
      'Wirehaired Dachshund',
      'Wirehaired Terrier',
      'Xoloitzcuintle (Mexican Hairless)',
      'Yellow Labrador Retriever',
      'Yorkshire Terrier Yorkie',
    ];
    $scope.breeds['Cat'] = [
      'Abyssinian',
      'American Curl',
      'American Shorthair',
      'American Wirehair',
      'Applehead Siamese',
      'Balinese',
      'Bengal',
      'Birman',
      'Bobtail',
      'Bombay',
      'British Shorthair',
      'Burmese',
      'Burmilla',
      'Calico',
      'Canadian Hairless',
      'Chartreux',
      'Chausie',
      'Chinchilla',
      'Cornish Rex',
      'Cymric',
      'Devon Rex',
      'Dilute Calico',
      'Dilute Tortoiseshell',
      'Domestic Long Hair',
      'Domestic Long Hair - Brown',
      'Domestic Long Hair - Buff',
      'Domestic Long Hair - Buff And White',
      'Domestic Long Hair - Gray And White',
      'Domestic Long Hair - Orange',
      'Domestic Long Hair - Orange And White',
      'Domestic Long Hair-Black',
      'Domestic Long Hair-Black And White',
      'Domestic Long Hair-Gray',
      'Domestic Long Hair-White',
      'Domestic Medium Hair',
      'Domestic Medium Hair - Brown',
      'Domestic Medium Hair - Buff',
      'Domestic Medium Hair - Buff And White',
      'Domestic Medium Hair - Gray And White',
      'Domestic Medium Hair - Orange And White',
      'Domestic Medium Hair-Black',
      'Domestic Medium Hair-Black And White',
      'Domestic Medium Hair-Gray',
      'Domestic Medium Hair-Orange',
      'Domestic Medium Hair-White',
      'Domestic Short Hair',
      'Domestic Short Hair - Brown',
      'Domestic Short Hair - Buff',
      'Domestic Short Hair - Buff And White',
      'Domestic Short Hair - Gray And White',
      'Domestic Short Hair - Orange And White',
      'Domestic Short Hair-Black',
      'Domestic Short Hair-Black And White',
      'Domestic Short Hair-Gray',
      'Domestic Short Hair-Mitted',
      'Domestic Short Hair-Orange',
      'Domestic Short Hair-White',
      'Egyptian Mau',
      'Exotic Shorthair',
      'Extra-Toes Cat (Hemingway Polydactyl)',
      'Havana',
      'Himalayan',
      'Japanese Bobtail',
      'Javanese',
      'Korat',
      'LaPerm',
      'Maine Coon',
      'Manx',
      'Munchkin',
      'Nebelung',
      'Norwegian Forest Cat',
      'Ocicat',
      'Oriental Long Hair',
      'Oriental Short Hair',
      'Oriental Tabby',
      'Persian',
      'Pixie-Bob',
      'Ragamuffin',
      'Ragdoll',
      'Russian Blue',
      'Scottish Fold',
      'Selkirk Rex',
      'Siamese',
      'Siberian',
      'Silver',
      'Singapura',
      'Snowshoe',
      'Somali',
      'Sphynx (Hairless Cat)',
      'Tabby',
      'Tabby - Brown',
      'Tabby - Grey',
      'Tabby - Orange',
      'Tabby - Black',
      'Tabby - Buff',
      'Tabby - White',
      'Tiger',
      'Tonkinese',
      'Torbie',
      'Tortoiseshell',
      'Turkish Angora',
      'Turkish Van',
      'Tuxedo',
    ];
    $scope.breeds['All'] = $scope.breeds['Dog'].concat($scope.breeds['Cat']);
    $scope.currentBreeds = $scope.breeds['All'];

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
        value: 'Male',
        key: "Male"
      },
      {
        value: 'Female',
        key: "Female"
      },
      // {
      //   value: 'U',
      //   key: "Unkown"
      // },
    ];

    $scope.offset = 0;
    $scope.limit = 20;

    var initialScrolled = false;

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

      $http({
        method: 'GET',
        url: url,
      })
      .then(function (response) {
        $scope.pets = $scope.pets.concat(response.data.pets);
        $scope.loading = false;

        FiltersService.setPets($scope.pets);

				scrollToLastPosition();
      })
      .catch(function (response) {
        $scope.loading = false;
      })
    };

    if ($scope.pets.length === 0) {
      $scope.sendRequest();
    } else {
      $scope.loading = false;
      scrollToLastPosition();
    }

    function scrollToLastPosition () {
      var scrollPosition = FiltersService.getPetScroll();
      if (scrollPosition && !initialScrolled) {
        initialScrolled = true;
        $("body").animate({scrollTop: scrollPosition}, "slow");
      }
    }

    $scope.$watch('filters.type', function (newValue, oldValue) {
      $scope.currentBreeds = $scope.breeds['All'];
      if ($scope.filters.type) $scope.currentBreeds = $scope.breeds[$scope.filters.type];
    });

    $scope.filter = function () {
      $("body").animate({scrollTop: 0}, "slow");
			$scope.pets = [];
			$scope.sendRequest();
      $scope.loading = true;
      FiltersService.setPetFilters($scope.filters);
		};

    function scroll () {
      if ($scope.loading) return;
      if (!$scope.pets[$scope.pets.length - 1]) return;
      if ($scope.filters.lastUpdatedBefore === $scope.pets[$scope.pets.length -1].lastUpdate) return;
			$scope.filters.lastUpdatedBefore = $scope.pets[$scope.pets.length -1].lastUpdate;
			$scope.sendRequest();
      $scope.loading = true;
      FiltersService.setPetScroll($window.scrollY);
		}

    $scope.scroll = _.throttle(scroll, 3000);

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

    $scope.toHtml = function (text) {
      return decodeHTMLEntities(text);
    };

    function decodeHTMLEntities(text) {
      if (!text) return;
      
      var entities = [
          ['amp', '&'],
          ['apos', '\''],
          ['#x27', '\''],
          ['#x2F', '/'],
          ['#39', '\''],
          ['#47', '/'],
          ['lt', '<'],
          ['gt', '>'],
          ['nbsp', ' '],
          ['quot', '"'],
          ['ldquo', '"'],
          ['rsquo', '"'],
          ['#039', '\''],
      ];

      for (var i = 0, max = entities.length; i < max; ++i)
          text = text.replace(new RegExp('&'+entities[i][0]+';', 'g'), entities[i][1]);

      return text;
    }

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

    $scope.toggleFilter = function () {
      $scope.filterCollapsed = false;
      $("body").animate({scrollTop: 0}, "slow");
    }
  }]);
