/**
 * Created by johnfranklin on 10/26/15.
 */
Stripe.setPublishableKey('pk_test_8DDyr5McQXrTdEa4mviz3Fq6')
angular.module("myApp", ['angularPayments']).controller("stripeController",
function($scope, $http, $location) {
    // The id of the application
    $scope.handleStripe = function (status, response) {
        console.log('response', status, response);
        if (response.error) {
            console.log('error');// there was an error. Fix it.
        } else {
            console.log('no error');

            response.appId=$location.search()._id;
            console.log(response);
            return $http.post('/payments', response);
        }
    }
});
