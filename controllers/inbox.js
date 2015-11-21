var user;
var tab = 1;
var message;

angular.module('myApp').controller('Inbox', function($location, $http, $scope, Mail){

  $http.get('/currentUser').then(function successCallback(response) {
      $scope.user = response.data;
  });

  $scope.successTextAlert = "Message Sent";
  $scope.showSuccessAlert = false;

  $scope.switchBool = function(value) { //Displays sucessfuly sent email message.
   $scope[value] = !$scope[value];
  };

  $scope.sendMessage = function(){

      var mail = new Mail(); //Just used it to create a couple dummy messages.
      mail.ownerId = message.senderId;//The email to send to. NOT THE EMAIL OF THE SENDER!
      mail.senderId = message.ownerId;//email sent from. the id of the sender technically.
      mail.links = ["http://mongoosejs.com/docs/middleware.html"]//??
      mail.sent = false
      mail.body = $scope.messageBody;
      mail.title = $scope.messageTitle;

      mail.$save(function () {
        console.log("Message saved");
      });
      $scope.outMessages.push(mail);
      $scope.showSuccessAlert = true;
  };

  $scope.setTab = function(table){
    tab = table;
  };

  $scope.panelNumber = function(panel){
    return tab === panel;
  };

  $scope.setMessage = function(mess){
      message = mess;
  }

$scope.toggleRead = function(mess){
  console.log(mess);
  if(!mess.read){
    mess.read = true;
    //console.log(mess);
    mess.$update();
  }
};

$http.get('/currentUser').then(function successCallback(response) {
    //console.log("Current User call sucessful!");
    //console.log("Email: " + response.data.email);
    $scope.user = response.data;
    user = response.data;
    //console.log(user);
    $scope.inMessages = Mail.query({ownerId: $scope.user.email}, function(messages){
        //$scope.inMessages = messages;
        console.log($scope.inMessages);
    });

    $scope.outMessages = Mail.query({senderId: $scope.user.email}, function(messages){
        console.log($scope.outMessages);
    });
});

});
