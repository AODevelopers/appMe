/// <reference path="../app.js" />
/// <reference path="../services/ItemsServices.js" />
/// <reference path="../services/SpreeServices.js" />
/// <reference path="../vendor/angular/angular.js" />
'use srtict';
apartmentsApp.controller('apartmentsController',
    ['$scope', function mainController($scope) {
    	
    	function initialize() {
    		  var mapProp = {
    		    center:new google.maps.LatLng(51.508742,-0.120850),
    		    zoom:12,
    		    mapTypeId:google.maps.MapTypeId.ROADMAP
    		  };
    		  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
		}
    	
    	initialize();
    }]);
