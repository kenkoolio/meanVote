var app = angular.module('app', ['ngRoute','ngCookies']);

app.config(function($routeProvider, $locationProvider){
  $locationProvider.hashPrefix('!');

  $routeProvider
  .when('/', {
    templateUrl: "/partials/loginRegistration.html"
  })
  .when('/dashboard', {
    templateUrl: "/partials/dashboard.html",
    controller: "pollsController"
  })
  .when('/create', {
    templateUrl: "/partials/create.html",
    controller: "pollsController"
  })
  .when('/show/:id', {
    templateUrl: "/partials/show.html",
    controller: "optionsController"
  })
  .otherwise({
    redirectTo: '/'
  });
});
