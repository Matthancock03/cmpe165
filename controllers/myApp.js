var app = angular.module('myApp',['ngRoute', 'ngResource']).config(function($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});

var generateResource = function(name)
{
    app.factory(name, function($resource) {
        return $resource('api/' + name +'/:_id', {
            update: {
                method: 'PUT'
            }
        });
    });
}
//When you make a model, add it to the modelNameList and to the function call in the server run javascript
//(express_server.js for now, could change in the future)
var modelNameList = ["Job", "User", "Comment"]
for(var i = 0; i < modelNameList.length; i++)
    generateResource(modelNameList[i]);