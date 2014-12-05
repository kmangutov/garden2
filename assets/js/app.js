/**
 * Created by R3alFr3e on 12/3/14.
 */
angular.module('gardenApp',
  ['ngRoute', 'appRoutes', 'ngCookies',
    'MainCtrl', 'StationCtrl', 'VolunteerCtrl',
  'StationService', 'VolunteerService', 'MainService',
  'AuthService']);
