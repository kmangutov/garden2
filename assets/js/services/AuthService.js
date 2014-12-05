/**
 * Created by R3alFr3e on 12/4/14.
 */
var service = angular.module('AuthService', []);

service.factory('AuthServ', ['$http', function($http, $window){
  var serviceObj = {};

  serviceObj.auth = function (user, password){
    return $http.post('/api/authenticate', {email: user, password: password})
      .success(function(res){

      })
      .error(function(res){

      });
  };

  serviceObj.logout = function (){
    return $http.get('/')
      .success(function(res){
          delete $window.sessionStorage.token;
          delete $window.sessionStorage.userinfo;
          delete $window.sessionStorage.isAdmin;
      })
      .error(function(res){

      });
  }
  return serviceObj;
}]);

