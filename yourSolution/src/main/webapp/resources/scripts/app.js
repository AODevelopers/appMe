/// <reference path="vendor/angular/angular.js" />
'use strict';
var apartmentsApp = angular.module('apartmentsApp', ['ngRoute', 'ngAnimate', 'ngSanitize']);

//before minified make sure to inject controlleres modules with $inject
//EditItemController.$inject = ['$scope', 'SharedData'];

apartmentsApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider.

    when('/apartment', {
        templateUrl: '/yourSolution/resources/templates/apartments.html',
        controller:'apartmentsController'
    }).
    when('/jobs', {
        templateUrl: '/yourSolution/resources/templates/jobs.html'
    }).
    otherwise({
        redirectTo: '/apartment'
    });

        // $locationProvider.html5Mode(true);
});




