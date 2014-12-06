/**
 * Created by R3alFr3e on 12/4/14.
 */
var service = angular.module('AuthService', []);

service.factory('AuthServ', ['$http', function($http, $window, $location){
  var serviceObj = {};

  serviceObj.auth = function (user, password){
    return $http.post('/api/authenticate', {email: user, password: password});
  };

  serviceObj.register = function(user, password){
    return $http.post('/api/register', {email:user, password:password});
  };

  serviceObj.logout = function (){

  }

  return serviceObj;

}]);

