var user;
var tab = 1;
var message;

angular.module('myApp').controller('Inbox', function($location, $http, $scope, Mail){

  $scope.successTextAlert = "Message Sent";
  $scope.showSuccessAlert = false;

  $scope.switchBool = function(value) { //Displays sucessfuly sent email message.
   $scope[value] = !$scope[value];
  };

  $scope.sendMessage = function(){
      //console.log(message);
      //console.log($scope.messageTitle);
      //console.log($scope.messageBody);

      var mail = new Mail(); //Just used it to create a couple dummy messages.
      mail.ownerId = message.senderId;//The email to send to. NOT THE EMAIL OF THE SENDER!
      mail.senderId = message.ownerId;//email sent from. the id of the sender technically.
      mail.links = ["http://mongoosejs.com/docs/middleware.html"]//??
      mail.sent = false
      mail.body = $scope.messageBody;//the body of the email.
      mail.title = $scope.messageTitle;//the title

      mail.$save(function () {
        console.log("Message saved");
      });
      $scope.outMessages.push(mail);
      $scope.showSuccessAlert = true;
  };

  $scope.setTab = function(table){
    //console.log("Set Tab "  + table);
    tab = table;
  };

  $scope.panelNumber = function(panel){
    //console.log("paneNumber " + panel);
    return tab === panel;
  };

  $scope.setMessage = function(mess){
      message = mess;
  }

$scope.toggleRead = function(message){
  //console.log(message);
  if(!message.read){
    message.read = true;
    message.$update(function (err) {
      if(err){
        console.log(err);
      }
      console.log("Message updated:");
    });
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
