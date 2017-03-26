angular.module('Comments')
.directive('comments', [function () {
  return {
    restrict: 'E',
    scope: {
      itemId: '=',
    },
    bindToController: {
      itemId: '='
    },
    controller: 'CommentListCtrl',
    templateUrl: '/comments-directive.html',
    link: function postLink(scope, element, attrs, model) {
    }
  };
}]);
