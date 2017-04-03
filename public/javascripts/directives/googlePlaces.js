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
});
