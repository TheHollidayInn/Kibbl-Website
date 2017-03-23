angular.module('Kibbl')
   .factory('Auth', ['$http', '$localStorage', 'urls', '$rootScope',
    function ($http, $localStorage, urls, $rootScope) {

      $rootScope.$on('event:social-sign-in-success', function(event, userDetails){
        var data = {
          network: userDetails.provider,
          accessToken: userDetails.token,
        };
        $http.post('/api/v1/auth/social', data)
          .then(function (response) {
            $localStorage.token = response.data.token;
      			window.location = "/";
          });
      });

       function urlBase64Decode(str) {
           var output = str.replace('-', '+').replace('_', '/');
           switch (output.length % 4) {
               case 0:
                   break;
               case 2:
                   output += '==';
                   break;
               case 3:
                   output += '=';
                   break;
               default:
                   throw 'Illegal base64url string!';
           }
           return window.atob(output);
       }

       function getClaimsFromToken() {
           var token = $localStorage.token;
           var user = {};
           if (typeof token !== 'undefined') {
               var encoded = token.split('.')[1];
               user = JSON.parse(urlBase64Decode(encoded));
           }
           return user._doc;
       }

       var tokenClaims = getClaimsFromToken();

       return {
           register: function (data, success, error) {
               return $http.post(urls.BASE_API + 'register', data);
           },
           login: function (data, success, error) {
               return $http.post(urls.BASE_API + 'login', data);
           },
           logout: function (success) {
              if (!confirm('Are you sure you want to logout?')) return;
               tokenClaims = {};
               delete $localStorage.token;
               return $http.post(urls.BASE_API + 'logout', {});
            //    success();
           },
           getTokenClaims: function () {
               return tokenClaims;
           }
       };
   }
   ]);
