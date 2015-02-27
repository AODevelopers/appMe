<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<%@page import="com.aod.yourSolution.beans.*"%>
 
<jsp:useBean id="user" type="com.aod.yourSolution.beans.User" scope="request" />
<html ng-app="apartmentsApp">
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<title>Home</title>
	<link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/main.css"/>">
	
	<script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
	<script src="http://maps.googleapis.com/maps/api/js"></script>
    <script src="<c:url value="/resources/scripts/libs/angular/angular.min.js"/>"></script>
	<script src="<c:url value="/resources/scripts/libs/angular/angular-animate.min.js"/>"></script>
	<script src="<c:url value="/resources/scripts/libs/angular/angular-route.min.js"/>"></script>
	<script src="<c:url value="/resources/scripts/libs/angular/angular-sanitize.min.js"/>"></script>
	<script src="<c:url value="/resources/scripts/app.js"/>"></script>
	<script src="<c:url value="/resources/scripts/controllers/mainController.js"/>"></script>
	<script src="<c:url value="/resources/scripts/controllers/apartmentsController.js"/>"></script>
</head>
<body ng-controller="mainController">
<header>
<h1><%= user.getUserID()%></h1>
<h2><%= user.getUserName() %></h2>
<div id="cssmenu"><div id="bg-one"></div><div id="bg-two"></div><div id="bg-three"></div><div id="bg-four"></div>
<ul>
   <li ng-class={active:activeTab=='apartments'} ng-click="activeTab='apartments'"><a href="<c:url value="/#/apartment"/>">Apartments</a></li>
   <li ng-class={active:activeTab=='jobs'} ng-click="activeTab='jobs'"><a href="<c:url value="/#/jobs"/>">Jobs</a></li>
</ul>
</div>
</header>
<div id="main-container">
	<ng-view></ng-view>
</div>
<footer>
</footer>
</body>
</html>
