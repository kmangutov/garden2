var route = angular.module('appRoutes', []);

route.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController'
      })

      .when('/admin', {
        templateUrl: 'views/stations.html',
        controller: 'StationController'
      });
    $locationProvider.html5Mode(true);
  }]);
