/**
 * Created by johnfranklin on 10/26/15.
 */
Stripe.setPublishableKey('pk_test_8DDyr5McQXrTdEa4mviz3Fq6')
angular.module("myApp", ['angularPayments']).controller("stripeController",
function($scope, $http, $location) {

    console.log($location.search().newUrl);
    $scope.handleStripe = function (status, response) {
        console.log('response', status, response);
        if (response.error) {
            console.log('error');// there was an error. Fix it.
        } else {
            console.log('no error');

            $http.post('/paymentSetup', response);
            window.location.href = $location.search().newUrl;
        }
    }
}).config(function($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });;
