/**
 * Created by R3alFr3e on 12/3/14.
 */
var mainCtrl = angular.module('MainCtrl',[]);
mainCtrl.controller('MainController', function($scope,$http,$log){
    $scope.tagline = "This is SPARTA!";
    $scope.data;

    //$http.get("http://localhost:1337/main")
    //  .success(function(data){
    //      $scope.data = data;
    //      $log.info("Success get index");
    //  });
});
