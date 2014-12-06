/**
 * Created by R3alFr3e on 12/3/14.
 */
var volunteerCtrl = angular.module('VolunteerCtrl', []);
volunteerCtrl.controller('VolunteerController', function($scope, $window, $log){

    $scope.tagline = "YEEEE GEEE!";

    $scope.userinfo;
    $scope.token;
    $scope.isAdmin;
    $scope.status = false;
    $scope.statusMessage = '';

    $scope.freetimes = [];

    $scope.init = function(){
        if($window.sessionStorage.token &&
          $window.sessionStorage.userinfo){
            $scope.userinfo = $window.sessionStorage.userinfo;
            $scope.token = $window.sessionStorage.token;
            $scope.isAdmin = $window.sessionStorage.isAdmin;
            $scope.status = true;
        }
        else {
            $scope.statusMessage = "Please log in D:";
        }

        //query free times
    };

    $scope.init();

    $scope.addtime = function(){

    };

    $scope.removetime = function(){

    };
   //function to handle add free time
   //function to handle remove free time
});
