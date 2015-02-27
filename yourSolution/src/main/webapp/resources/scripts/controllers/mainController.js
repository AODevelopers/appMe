/// <reference path="../app.js" />
/// <reference path="../services/ItemsServices.js" />
/// <reference path="../services/SpreeServices.js" />
/// <reference path="../vendor/angular/angular.js" />
'use srtict';
apartmentsApp.controller('mainController',
    ['$scope', function mainController($scope) {
    	$scope.apartments = [{city:'Rishon'}, {city:'Tel Aviv'}, {city:'Bar Yam'}];
    	$scope.activeTab='apartments';
    	
    }]);
