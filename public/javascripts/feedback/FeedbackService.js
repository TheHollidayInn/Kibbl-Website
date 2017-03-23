angular.module('Feedback')
.factory('FeedbackService', ['$http', '$rootScope', '$httpParamSerializer',
  function ($http, $rootScope, $httpParamSerializer) {
    var api = {};

    api.getFeedbacks = function () {
      var url = '/api/v1/feedback';

      return $http({
        method: 'GET',
        url: url,
      })
      .then(function (response) {
        let events = response.data;
        //$rootScope.$broadcast('events', events); // @TODO: use event bus. See Angular
        return events;
      })
      .catch(function (err) {

      });
    };

    api.addFeedback = function (text) {
      var url = '/api/v1/feedback';

      return $http({
        method: 'POST',
        url: url,
        data: {
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
