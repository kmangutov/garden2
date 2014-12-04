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

  serviceObj.welcome = function (){
      return $http.get('/welcome')
        .success(function(res){

        })
        .error(function(res){

        });
  };

  return serviceObj;
}]);
