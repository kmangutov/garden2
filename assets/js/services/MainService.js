var service = angular.module('MainService', []);

service.factory('LoginServ', ['$http', function($http){
  var serviceObj = {};

  serviceObj.auth = function (user, password){
      return $http.post('/api/authenticate', {email: user, password: password})
        .success(function(res){

        })
        .error(function(res){

        });
  };

  return serviceObj;
}]);
