var app = angular.module('myApp',['ngRoute', 'ngResource']).config(function($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});;

app.factory('Job', function($resource) {
    return $resource('api/Job/:id', {
        update: {
            method: 'PUT'
        }
    });
});