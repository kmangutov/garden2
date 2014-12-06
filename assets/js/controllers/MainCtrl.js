/**
 * Created by R3alFr3e on 12/3/14.
 */
var mainCtrl = angular.module('MainCtrl',['ngCookies']);
mainCtrl.controller('MainController', function($scope, $location, $log, $window, $cookieStore, AuthServ){
    $scope.tagline = "This is SPARTA!";
    $scope.formData = {};
    $scope.isSuccessed = true;
    $scope.islogged = false;
    $scope.result;
    $scope.user;

    $scope.init = function(){
      if($window.sessionStorage.token){
        $scope.islogged = true;
        $scope.user = $window.sessionStorage.userinfo;
        $log.info($window.sessionStorage.token);
        $log.info($window.sessionStorage.userinfo);
      }
    };
    $scope.init();

    $scope.login = function(){
        $log.warn($scope.formData.usr + " vs " + $scope.formData.pw);
        AuthServ.auth($scope.formData.usr, $scope.formData.pw)
          .success(function(data){
              $log.info("success to login with " + $scope.formData['usr']);
              $scope.isSuccessed = true;
              $scope.islogged = true;

              $window.sessionStorage.token = data.token;
              $window.sessionStorage.userinfo = data.user.email;
              $window.sessionStorage.isAdmin = data.user.admin;
              $scope.user = data.user.email;

              $log.info("admin " + data.user.admin);
              $log.info(data.user.email);

              $location.url('/volunteer');
          })
          .error(function(data){
              $log.error("error with " + data);
              $scope.islogged = false;
              $scope.isSuccessed = false;
              $scope.result = data.error;
          });
    };

    $scope.signup = function() {
        AuthServ.register($scope.formData.usr, $scope.formData.pw)
          .success(function(data){
              $log.info("success to register with " + $scope.formData['usr']);
              $scope.isSuccessed = true;
              $scope.islogged = true;
              $scope.user = data.user.email;

              $window.sessionStorage.token = data.token;
              $window.sessionStorage.userinfo = data.user.email;
              $window.sessionStorage.isAdmin = data.user.admin;

              $location.url('/volunteer');

          })
          .error(function(data){
              $log.error("error with " + data);
              $scope.islogged = false;
              $scope.isSuccessed = false;
              $scope.result = data.error;
              $log.info(data);
          });
    };


    $scope.logout = function(){
        $log.info("User " + $scope.user + " has been logged out");
        $scope.islogged = false;
        $scope.isSuccessed = true;

        delete $window.sessionStorage.token;
        delete $window.sessionStorage.userinfo;
        delete $window.sessionStorage.isAdmin;

        $location.url('/');
    };

});


