/**
 * Created by R3alFr3e on 12/3/14.
 */
var stationCtrl = angular.module('StationCtrl', []);
stationCtrl.controller('StationController', function($rootScope, $scope, $log, $window, Station){
    $scope.tagline = "Station list .:|::|::|:."
    $scope.stations = {};
    $scope.selected = [];
    $scope.sideselected = 0;
    $scope.permission = false;

    $scope.result;
    $scope.formData = {};

    $scope.init = function(){
        if($window.sessionStorage.isAdmin &&
          $window.sessionStorage.isAdmin == "true"){
            $scope.permission = true;
        }

        Station.getall()
          .success(function(data){
              $scope.addToStationList(data);
          })
          .error(function(data){

          });
    };
    $scope.init();

    $scope.change = function(id){
        $scope.sideselected = id;
    };

    $scope.updateSelect = function(id) {
        var index = $scope.selected.indexOf(id);
        if(index != -1)
            $scope.selected.splice(index, 1);
        else
            $scope.selected.push(id);

        $log.info($scope.selected);
    };

    $scope.addStation = function(){
        Station.add($scope.formData.name)
          .success(function(data){
              $scope.formData = {};
              $scope.result = data;
              $scope.stations[data.id] = data;
              $log.info($scope.formData.name + " station is added successfully");
          })
          .error(function(data){
              $scope.result = data;
              $log.info("Station cannot be added");
          })
    };

    $scope.addToStationList = function(data){
        for(var each in data){
            $scope.stations[data[each].id] = data[each];
            $log.info(data[each]);
        }
    };

    $scope.removeStation = function(id) {
        Station.remove(id)
          .success(function(data){

          })
          .error(function(data){

          });
    };

    $scope.removeSelection = function(){
        for(var each in $scope.selected){
            var id = $scope.selected[each];
            Station.remove(id)
              .success(function(data){
                  delete $scope.stations[id];
              })
              .error(function(data){

              });
        }
        $scope.selected = [];
    };

    $scope.addUnit = function() {

    };

    $scope.removeUnit = function() {

    };

    $scope.matchAll = function() {

    };
});
