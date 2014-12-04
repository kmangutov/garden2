var route = angular.module('appRoutes', []);

route.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController'
      })

      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'StationController'
      })

      .when('/volunteer', {
        templateUrl: 'views/volunteer.html',
        controller: 'VolunteerController'
      })

      .when('/about', {
        templateUrl: 'views/about.html'
      })

      //only care define route, otherwise 404
      .otherwise({
        templateUrl: 'views/404.html'
      });


    $locationProvider.html5Mode(true);
  }]);