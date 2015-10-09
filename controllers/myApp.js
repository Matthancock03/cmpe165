var app = angular.module('myApp',['ngRoute', 'ngResource']);

app.factory('Job', function($resource) {
    return $resource('/api/Job/:id'); // Note the full endpoint address
    //
});