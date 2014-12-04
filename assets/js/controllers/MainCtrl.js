/**
 * Created by R3alFr3e on 12/3/14.
 */
var mainCtrl = angular.module('MainCtrl',['ngCookies']);
mainCtrl.controller('MainController', function($scope, $location, $log, $cookieStore, LoginServ){
    $scope.tagline = "This is SPARTA!";
    $scope.formData = {};
    $scope.isSuccessed = true;
    $scope.islogged = false;
    $scope.result;
    $scope.user;
    $scope.user_data = $cookieStore.get('user_data');

    $scope.loginUser = function(){
       $log.warn($scope.formData.usr + " vs " + $scope.formData.pw);
       LoginServ.auth($scope.formData.usr, $scope.formData.pw)
          .success(function(data){
              $log.warn("success to login with " + $scope.formData['usr']);
              $scope.isSuccessed = true;
              $scope.islogged = true;
              $scope.result = data;
              $scope.user = data.user.email;
              $cookieStore.put('user_data', data);
              $location.url('/welcome');
          })
          .error(function(data){
              $log.error("error with " + data);
              $scope.islogged = false;
              $scope.isSuccessed = false;
              $scope.result = data.error;
          });
    }

});


