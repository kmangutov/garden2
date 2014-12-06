/**
 * Created by R3alFr3e on 12/3/14.
 */
var stationServ = angular.module('StationService',[]);
stationServ.factory('Station', ['$http', function($http){
    var serv = {};

    serv.getall = function(){
        return $http.get('/api/station');
    };

    serv.add = function(stationName){
        return $http.post('/api/station', {name:stationName});
    };

    serv.remove = function(stationId) {
        return $http.delete('/api/station/' + stationId);
    };

    serv.addUnit = function(stationId){
        return $http.post('/api/workunit', {slot:"", needed:1, station: stationId});
    };

    serv.removeUnit = function(stationId, unitId){

    };

    return serv;
}]);
