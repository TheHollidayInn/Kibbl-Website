angular.module('Comments')
.factory('CommentService', ['$http', '$rootScope', '$httpParamSerializer',
  function ($http, $rootScope, $httpParamSerializer) {
    var api = {};

    api.getComments = function (itemId) {
      var url = '/api/v1/comments?itemId=' + itemId;

      return $http({
        method: 'GET',
        url: url,
      })
      .then(function (response) {
        let events = response.data;
        //$rootScope.$broadcast('events', events); // @TODO: use event bus. See Angular
        return events;
      })
    };

    api.addComment = function (itemId, text) {
      var url = '/api/v1/comments';

      return $http({
        method: 'GET',
        url: url,
        data: {
          itemId: itemId,
          text: text,
        },
      })
      .then(function (response) {
        let events = response.data;
        //$rootScope.$broadcast('events', events); // @TODO: use event bus. See Angular
        return events;
      })
    };

    return api;
  }]);
