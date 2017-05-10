angular.module('Kibbl')
.directive('googleplaceAutocomplete', function () {
  return {
    restrict: 'EA',
    require: 'ngModel',
    scope: {
      googleplaceAutocompletePlace: '=?',
      googleplaceAutocomplete: '=',
    },
    link: function postLink(scope, element, attrs, model) {
      var options = scope.googleplaceAutocomplete;
      // @TODO: How to get city zipCode
      var options = {
        types: ['(cities)'],
        componentRestrictions: {
          country: 'us'
        }
      };
      var autocomplete = new google.maps.places.Autocomplete(element[0], options);

      google.maps.event.addListener(autocomplete, 'place_changed', function () {
        scope.$apply(function () {
          scope.googleplaceAutocompletePlace = autocomplete.getPlace();
          model.$setViewValue(element.val());
        });
      });

      scope.$on('$destroy', function () {
        google.maps.event.clearInstanceListeners(element[0]);
      });
    }
  };
})
.directive('windowResize', ['$window', function ($window) {
   return {
      link: link,
      restrict: 'A',
   };
   function link(scope, element, attrs){
     scope.width = $window.innerWidth;

     angular.element($window).bind('load', function(){
       scope.width = $window.innerWidth;
       console.log(scope.width)
       if (scope.width <= 500) {
         scope.filterCollapsed = true;
       }
       // manuall $digest required as resize event
       // is outside of angular
       scope.$digest();
     });
   }
}]);
