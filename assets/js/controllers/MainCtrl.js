/**
 * Created by R3alFr3e on 12/3/14.
 */
var mainCtrl = angular.module('MainCtrl',['ngCookies']);
mainCtrl.controller('MainController', function($scope, $location, $log, $window, $cookieStore, LoginServ){
    $scope.tagline = "This is SPARTA!";
    $scope.formData = {};
    $scope.isSuccessed = true;
    $scope.islogged = false;
    $scope.result;

    $scope.loginUser = function(){
       $log.warn($scope.formData.usr + " vs " + $scope.formData.pw);
       LoginServ.auth($scope.formData.usr, $scope.formData.pw)
          .success(function(data){
              $log.info("success to login with " + $scope.formData['usr']);
              $scope.isSuccessed = true;
              $scope.islogged = true;

              $window.sessionStorage.token = data.token;
              $window.sessionStorage.userinfo = data.user.email;
              $log.info(data.user.email);

              $location.url('/volunteer');
          })
          .error(function(data){
              $log.error("error with " + data);
              $scope.islogged = false;
              $scope.isSuccessed = false;
              $scope.result = data.error;
          });
    }

});


