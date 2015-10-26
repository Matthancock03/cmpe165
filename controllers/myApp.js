
var app = angular.module('myApp',['ngRoute', 'ngResource', ]).config(function($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});
//Liberated from stackExchange. Annoying problem that isn't the focus of this course.
// http://stackoverflow.com/questions/23927695/angularjs-currency-formatting-in-input-box
app.directive('currencyFormatter', ['$filter', function ($filter) {


    formatter = function (num) {
        return $filter('currency')(num);
    };

    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ngModel) {
            ngModel.$parsers.push(function (str) {
                return str ? Number(str) : '';
            });
            ngModel.$formatters.push(formatter);

            element.bind('blur', function() {
                element.val(formatter(ngModel.$modelValue))
            });
            element.bind('focus', function () {
                element.val(ngModel.$modelValue);
            });
        }
    };
}]);
var generateResource = function(name)
{
    app.factory(name, function($resource) {
        return $resource('api/' + name +'/:_id', { _id: '@_id' }, {
            update: {
                method: 'PUT'
            }

        });
    });
}
//When you make a model, add it to the modelNameList and to the function call in the server run javascript
//(index.js for now, could change in the future)
var modelNameList = ["Job", "User", "Comment", "Contract", "Application"]
for(var i = 0; i < modelNameList.length; i++)
    generateResource(modelNameList[i]);
